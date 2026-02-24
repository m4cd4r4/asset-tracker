import { useRef, useState, useEffect, useCallback } from 'react';
import { X, Camera, Image, Loader2, ScanText } from 'lucide-react';
import { useOCRScanner } from '@/hooks/useOCRScanner';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface OCRScannerProps {
  onScanSAN: (san: string) => void;
  onClose: () => void;
}

export function OCRScanner({ onScanSAN, onClose }: OCRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { isReady, isProcessing, lastResult, error, progress, recognize, reset } = useOCRScanner();
  const [mode, setMode] = useState<'camera' | 'image'>('camera');
  const [capturedFrame, setCapturedFrame] = useState<string | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch {
      // Camera access denied — user can still use image mode
    }
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => {
    if (mode === 'camera') startCamera();
    return () => stopCamera();
  }, [mode, startCamera, stopCamera]);

  const captureFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    setCapturedFrame(canvas.toDataURL('image/png'));
    await recognize(canvas);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    reset();
    setCapturedFrame(URL.createObjectURL(file));
    await recognize(file);
  };

  const handleRetry = () => {
    reset();
    setCapturedFrame(null);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col z-50">
      {/* Glass Header */}
      <div className="flex items-center justify-between p-4 glass-card-dark border-b border-white/10">
        <h2 className="text-white font-semibold text-sm flex items-center gap-2">
          <ScanText className="w-4 h-4 text-blue-400" />
          Read SAN Text
        </h2>
        <Button variant="ghost" size="icon-sm" onClick={onClose} className="text-white hover:bg-white/10">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-2 p-4 justify-center">
        {(['camera', 'image'] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); handleRetry(); }}
            className={cn(
              'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all',
              mode === m
                ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                : 'glass-card-dark text-white/70 hover:text-white'
            )}
          >
            {m === 'camera' ? <Camera className="w-4 h-4" /> : <Image className="w-4 h-4" />}
            <span className="capitalize">{m}</span>
          </button>
        ))}
      </div>

      {/* OCR Engine Status */}
      {!isReady && !error && (
        <div className="flex items-center justify-center gap-2 py-2 text-white/50 text-sm">
          <Loader2 className="w-4 h-4 animate-spin" />
          Loading OCR engine...
        </div>
      )}

      {/* Scanner View */}
      <div className="flex-1 flex items-center justify-center p-4 overflow-auto">
        {mode === 'camera' ? (
          <div className="relative w-full max-w-lg">
            {capturedFrame ? (
              <img src={capturedFrame} className="w-full rounded-xl" alt="Captured frame" />
            ) : (
              <>
                <video ref={videoRef} className="w-full rounded-xl" playsInline muted />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-64 h-32 border-2 border-white/20 rounded-lg relative">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-violet-400 rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-violet-400 rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-violet-400 rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-violet-400 rounded-br-lg" />
                    <p className="absolute -bottom-7 inset-x-0 text-center text-white/40 text-xs">
                      Position SAN label here
                    </p>
                  </div>
                </div>
              </>
            )}
            <canvas ref={canvasRef} className="hidden" />

            {/* Capture / Retry */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
              {capturedFrame ? (
                <button
                  onClick={handleRetry}
                  className="glass-card-dark px-4 py-2 rounded-full text-sm text-white"
                >
                  Retake
                </button>
              ) : (
                <button
                  onClick={captureFrame}
                  disabled={!isReady || isProcessing}
                  className={cn(
                    'px-6 py-3 rounded-full text-sm font-medium transition-all',
                    isReady
                      ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/25 hover:bg-violet-600'
                      : 'bg-white/10 text-white/40'
                  )}
                >
                  Capture
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            {capturedFrame ? (
              <div className="space-y-4">
                <img src={capturedFrame} className="max-w-lg w-full rounded-xl" alt="Uploaded" />
                <button onClick={() => { handleRetry(); fileInputRef.current?.click(); }} className="text-sm text-white/60 hover:text-white">
                  Choose different image
                </button>
              </div>
            ) : (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center gap-4 p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-white/40 transition-colors"
              >
                <Image className="w-16 h-16 text-white/30" />
                <span className="text-white/60 text-sm">Tap to select image</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      {isProcessing && (
        <div className="px-4 pb-2">
          <div className="flex items-center gap-3 glass-card-dark rounded-lg px-4 py-3">
            <Loader2 className="w-4 h-4 text-violet-400 animate-spin shrink-0" />
            <div className="flex-1">
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-violet-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <span className="text-white/50 text-xs tabular-nums">{progress}%</span>
          </div>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="p-3 mx-4 mb-2 rounded-lg bg-rose-500/20 text-rose-200 text-center text-sm">
          {error}
        </div>
      )}

      {/* Results */}
      {lastResult && !isProcessing && (
        <div className="p-4 mx-4 mb-4 rounded-xl glass-card-dark space-y-3">
          {lastResult.sanNumbers.length > 0 ? (
            <>
              <p className="text-xs text-white/50">
                Found {lastResult.sanNumbers.length} SAN number{lastResult.sanNumbers.length !== 1 ? 's' : ''} ({lastResult.processingTime}ms, {Math.round(lastResult.confidence)}% confidence)
              </p>
              <div className="flex flex-wrap gap-2">
                {lastResult.sanNumbers.map(san => (
                  <button
                    key={san}
                    onClick={() => onScanSAN(san)}
                    className="px-4 py-2 rounded-lg bg-violet-500/20 border border-violet-500/30 text-violet-200 font-mono font-bold text-lg hover:bg-violet-500/30 transition-colors"
                  >
                    {san}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <p className="text-white/50 text-sm text-center">
              No SAN numbers found. Try adjusting the angle or lighting.
            </p>
          )}

          {lastResult.text && (
            <details className="text-xs text-white/30">
              <summary className="cursor-pointer hover:text-white/50">Raw text</summary>
              <pre className="mt-2 p-2 bg-black/30 rounded text-white/40 whitespace-pre-wrap break-all max-h-32 overflow-auto">
                {lastResult.text}
              </pre>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
