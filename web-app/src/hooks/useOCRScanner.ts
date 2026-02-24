import { useState, useCallback, useRef, useEffect } from 'react';
import { createWorker, Worker } from 'tesseract.js';
import { workspace } from '@/services/workspace';

interface OCRResult {
  text: string;
  sanNumbers: string[];
  confidence: number;
  processingTime: number;
}

export function useOCRScanner() {
  const [isReady, setIsReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResult, setLastResult] = useState<OCRResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const worker = await createWorker('eng', 1, {
          logger: (m) => {
            if (!cancelled && m.status === 'recognizing text') {
              setProgress(Math.round(m.progress * 100));
            }
          },
        });
        await worker.setParameters({
          tessedit_char_whitelist: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz -:#.',
        });
        if (!cancelled) {
          workerRef.current = worker;
          setIsReady(true);
        } else {
          await worker.terminate();
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to initialize OCR');
        }
      }
    };

    init();
    return () => {
      cancelled = true;
      workerRef.current?.terminate();
    };
  }, []);

  const recognize = useCallback(async (
    source: HTMLCanvasElement | HTMLImageElement | File
  ): Promise<OCRResult | null> => {
    if (!workerRef.current || !isReady) {
      setError('OCR engine not ready');
      return null;
    }

    setIsProcessing(true);
    setError(null);
    setProgress(0);

    const startTime = Date.now();
    try {
      const { data } = await workerRef.current.recognize(source);
      const result: OCRResult = {
        text: data.text,
        sanNumbers: [...new Set(data.text.match(new RegExp(workspace.getAssetNumberConfig().ocrPattern, 'g')) || [])],
        confidence: data.confidence,
        processingTime: Date.now() - startTime,
      };
      setLastResult(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OCR recognition failed');
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [isReady]);

  const reset = useCallback(() => {
    setLastResult(null);
    setError(null);
    setProgress(0);
  }, []);

  return { isReady, isProcessing, lastResult, error, progress, recognize, reset };
}
