import { useRef, useState, useEffect, useCallback } from 'react';
import { X, Camera, Image, Box, Loader2 } from 'lucide-react';
import { useBoxCounter } from '@/hooks/useBoxCounter';
import type { BoxDetection } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface BoxCounterProps {
  onCount: (count: number) => void;
  onClose: () => void;
}

export function BoxCounter({ onCount, onClose }: BoxCounterProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const { isReady, isProcessing, lastDetection, error, countBoxes, countFromCamera, stopCounting } = useBoxCounter();

  const [mode, setMode] = useState<'camera' | 'image'>('camera');
  const [confirmedCount, setConfirmedCount] = useState<number | null>(null);

  useEffect(() => {
    if (mode === 'camera' && isReady) startCamera();
    return () => { stopCamera(); stopCounting(); };
  }, [mode, isReady]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        countFromCamera(videoRef.current, handleDetection);
      }
    } catch (err) {
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    streamRef.current = null;
  };

  const handleDetection = useCallback((detection: BoxDetection) => {
    if (canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;
      const video = videoRef.current;
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      detection.boundingBoxes.forEach((box, index) => {
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 3;
        ctx.strokeRect(box.x, box.y, box.width, box.height);
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(box.x, box.y - 25, 60, 25);
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 16px sans-serif';
        ctx.fillText(`#${index + 1}`, box.x + 5, box.y - 7);
      });
    }
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const img = document.createElement('img');
    img.src = URL.createObjectURL(file);
    await new Promise(resolve => img.onload = resolve);
    const result = await countBoxes(img);
    URL.revokeObjectURL(img.src);
    if (result) setConfirmedCount(result.count);
  };

  const handleCapture = async () => {
    if (!videoRef.current) return;
    const result = await countBoxes(videoRef.current);
    if (result) setConfirmedCount(result.count);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col z-50">
      {/* Glass Header */}
      <div className="flex items-center justify-between p-4 glass-card-dark border-b border-white/10">
        <h2 className="text-white font-semibold text-sm flex items-center gap-2">
          <Box className="w-4 h-4" />
          Quick Count
        </h2>
        <Button variant="ghost" size="icon-sm" onClick={onClose} className="text-white hover:bg-white/10">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {!isReady ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-white">
            <Loader2 className="w-10 h-10 animate-spin mx-auto mb-3 text-blue-400" />
            <p className="font-medium">Loading detection model...</p>
            <p className="text-xs text-white/50 mt-1">This may take a moment</p>
          </div>
        </div>
      ) : (
        <>
          {/* Mode Toggle */}
          <div className="flex gap-2 p-4 justify-center">
            {(['camera', 'image'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
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

          <div className="flex-1 flex items-center justify-center p-4">
            {mode === 'camera' ? (
              <div className="relative w-full max-w-lg">
                <video ref={videoRef} className="w-full rounded-xl" playsInline muted />
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

                {lastDetection && (
                  <div className="absolute top-3 right-3 glass-card-dark rounded-lg px-3 py-2 text-white">
                    <div className="text-2xl font-bold text-center tabular-nums">{lastDetection.count}</div>
                    <div className="text-[10px] text-white/60">
                      {Math.round(lastDetection.confidence * 100)}% conf
                    </div>
                  </div>
                )}

                <Button
                  onClick={handleCapture}
                  disabled={isProcessing}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full px-6 shadow-lg shadow-blue-500/25"
                >
                  {isProcessing ? 'Processing...' : 'Capture Count'}
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-4 p-8 border-2 border-dashed border-white/20 rounded-xl hover:border-white/40 transition-colors"
                >
                  <Image className="w-16 h-16 text-white/30" />
                  <span className="text-white/60 text-sm">Tap to select image</span>
                </button>
              </div>
            )}
          </div>

          {error && (
            <div className="p-3 mx-4 mb-2 rounded-lg bg-rose-500/20 text-rose-200 text-center text-sm">
              {error}
            </div>
          )}

          {confirmedCount !== null && (
            <div className="p-4 glass-card-dark border-t border-white/10">
              <div className="max-w-md mx-auto">
                <div className="text-center text-white mb-4">
                  <p className="text-xs text-white/50">Detected count:</p>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <button
                      onClick={() => setConfirmedCount(Math.max(0, confirmedCount - 1))}
                      className="w-10 h-10 rounded-full glass-card-dark text-white text-xl font-medium hover:bg-white/10"
                    >
                      -
                    </button>
                    <span className="text-4xl font-bold tabular-nums">{confirmedCount}</span>
                    <button
                      onClick={() => setConfirmedCount(confirmedCount + 1)}
                      className="w-10 h-10 rounded-full glass-card-dark text-white text-xl font-medium hover:bg-white/10"
                    >
                      +
                    </button>
                  </div>
                </div>
                <Button
                  onClick={() => { if (confirmedCount !== null) onCount(confirmedCount); }}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                >
                  Use This Count
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
