import { useState, useCallback, useRef, useEffect } from 'react';
import { BrowserMultiFormatReader, BarcodeFormat, DecodeHintType } from '@zxing/library';
import type { ScanResult } from '@/types';

interface UseBarcodeScanner {
  isScanning: boolean;
  lastResult: ScanResult | null;
  error: string | null;
  startScanning: (videoElement: HTMLVideoElement) => Promise<void>;
  stopScanning: () => void;
  scanImage: (imageSource: string | HTMLImageElement) => Promise<ScanResult | null>;
}

export function useBarcodeScanner(): UseBarcodeScanner {
  const [isScanning, setIsScanning] = useState(false);
  const [lastResult, setLastResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Initialize reader with hints for better detection
  useEffect(() => {
    const hints = new Map();
    hints.set(DecodeHintType.POSSIBLE_FORMATS, [
      BarcodeFormat.QR_CODE,
      BarcodeFormat.CODE_128,
      BarcodeFormat.CODE_39,
      BarcodeFormat.EAN_13,
      BarcodeFormat.EAN_8,
      BarcodeFormat.UPC_A,
      BarcodeFormat.UPC_E,
      BarcodeFormat.DATA_MATRIX,
      BarcodeFormat.PDF_417,
    ]);
    hints.set(DecodeHintType.TRY_HARDER, true);

    readerRef.current = new BrowserMultiFormatReader(hints);

    return () => {
      if (readerRef.current) {
        readerRef.current.reset();
      }
    };
  }, []);

  const startScanning = useCallback(async (videoElement: HTMLVideoElement) => {
    if (!readerRef.current) return;

    setError(null);
    setIsScanning(true);

    try {
      // Request camera access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Prefer back camera
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;
      videoElement.srcObject = stream;
      await videoElement.play();

      // Continuous decoding
      const decodeOnce = async () => {
        if (!readerRef.current || !isScanning) return;

        try {
          const result = await readerRef.current.decodeFromVideoElement(videoElement);
          if (result) {
            const scanResult: ScanResult = {
              text: result.getText(),
              format: BarcodeFormat[result.getBarcodeFormat()],
              timestamp: new Date(),
            };
            setLastResult(scanResult);
          }
        } catch {
          // No barcode found in frame, continue scanning
        }

        if (isScanning) {
          requestAnimationFrame(decodeOnce);
        }
      };

      decodeOnce();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start camera');
      setIsScanning(false);
    }
  }, [isScanning]);

  const stopScanning = useCallback(() => {
    setIsScanning(false);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    if (readerRef.current) {
      readerRef.current.reset();
    }
  }, []);

  const scanImage = useCallback(async (imageSource: string | HTMLImageElement): Promise<ScanResult | null> => {
    if (!readerRef.current) return null;

    setError(null);

    try {
      const result = typeof imageSource === 'string'
        ? await readerRef.current.decodeFromImageUrl(imageSource)
        : await readerRef.current.decodeFromImageElement(imageSource);

      if (result) {
        const scanResult: ScanResult = {
          text: result.getText(),
          format: BarcodeFormat[result.getBarcodeFormat()],
          timestamp: new Date(),
        };
        setLastResult(scanResult);
        return scanResult;
      }
      return null;
    } catch {
      setError('No barcode found in image');
      return null;
    }
  }, []);

  return {
    isScanning,
    lastResult,
    error,
    startScanning,
    stopScanning,
    scanImage,
  };
}
