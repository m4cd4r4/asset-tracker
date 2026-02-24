import { useState, useCallback, useRef, useEffect } from 'react';
import type { BoxDetection, BoundingBox } from '@/types';

// TensorFlow loaded from CDN - access via window globals
declare global {
  interface Window {
    tf: any;
    cocoSsd: any;
  }
}

interface UseBoxCounter {
  isReady: boolean;
  isProcessing: boolean;
  lastDetection: BoxDetection | null;
  error: string | null;
  countBoxes: (
    source: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement,
    targetClass?: string
  ) => Promise<BoxDetection | null>;
  countFromCamera: (
    videoElement: HTMLVideoElement,
    onDetection: (detection: BoxDetection) => void
  ) => void;
  stopCounting: () => void;
}

// Common box-like objects that COCO-SSD can detect
const BOX_CLASSES = ['box', 'suitcase', 'handbag', 'backpack', 'cell phone', 'laptop', 'book'];

export function useBoxCounter(): UseBoxCounter {
  const [isReady, setIsReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastDetection, setLastDetection] = useState<BoxDetection | null>(null);
  const [error, setError] = useState<string | null>(null);

  const modelRef = useRef<any>(null);
  const animationFrameRef = useRef<number | null>(null);
  const isCountingRef = useRef(false);

  // Load model on mount
  useEffect(() => {
    const loadModel = async () => {
      try {
        const tf = window.tf;
        const cocoSsd = window.cocoSsd;

        if (!tf || !cocoSsd) {
          setError('Detection model unavailable. Open the app online first to cache the model.');
          return;
        }

        await tf.ready();
        modelRef.current = await cocoSsd.load({
          base: 'lite_mobilenet_v2',
        });
        setIsReady(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load detection model');
      }
    };

    loadModel();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const processDetections = useCallback((
    predictions: any[],
    targetClass?: string
  ): BoxDetection => {
    const relevantPredictions = predictions.filter((p: any) => {
      if (targetClass) {
        return p.class.toLowerCase().includes(targetClass.toLowerCase());
      }
      return BOX_CLASSES.some(c => p.class.toLowerCase().includes(c)) || p.score > 0.7;
    });

    const boundingBoxes: BoundingBox[] = relevantPredictions.map((p: any) => ({
      x: p.bbox[0],
      y: p.bbox[1],
      width: p.bbox[2],
      height: p.bbox[3],
      confidence: p.score,
    }));

    const avgConfidence = boundingBoxes.length > 0
      ? boundingBoxes.reduce((sum, b) => sum + b.confidence, 0) / boundingBoxes.length
      : 0;

    return {
      count: boundingBoxes.length,
      confidence: avgConfidence,
      boundingBoxes,
    };
  }, []);

  const countBoxes = useCallback(async (
    source: HTMLVideoElement | HTMLImageElement | HTMLCanvasElement,
    targetClass?: string
  ): Promise<BoxDetection | null> => {
    if (!modelRef.current || !isReady) {
      setError('Model not ready');
      return null;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const predictions = await modelRef.current.detect(source);
      const detection = processDetections(predictions, targetClass);
      setLastDetection(detection);
      return detection;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Detection failed');
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [isReady, processDetections]);

  const countFromCamera = useCallback((
    videoElement: HTMLVideoElement,
    onDetection: (detection: BoxDetection) => void
  ) => {
    if (!modelRef.current || !isReady) {
      setError('Model not ready');
      return;
    }

    isCountingRef.current = true;
    setError(null);

    const detectFrame = async () => {
      if (!isCountingRef.current || !modelRef.current) return;

      try {
        const predictions = await modelRef.current.detect(videoElement);
        const detection = processDetections(predictions);
        setLastDetection(detection);
        onDetection(detection);
      } catch {
        // Skip frame on error
      }

      if (isCountingRef.current) {
        animationFrameRef.current = requestAnimationFrame(() => {
          setTimeout(detectFrame, 100);
        });
      }
    };

    detectFrame();
  }, [isReady, processDetections]);

  const stopCounting = useCallback(() => {
    isCountingRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  return {
    isReady,
    isProcessing,
    lastDetection,
    error,
    countBoxes,
    countFromCamera,
    stopCounting,
  };
}
