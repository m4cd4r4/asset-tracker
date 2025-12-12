import { useRef, useState, useEffect, useCallback } from 'react';
import { X, Camera, Image, Box, Loader2 } from 'lucide-react';
import { useBoxCounter } from '@/hooks/useBoxCounter';
import type { BoxDetection } from '@/types';

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

  // Start camera when mode is camera
  useEffect(() => {
    if (mode === 'camera' && isReady) {
      startCamera();
    }
    return () => {
      stopCamera();
      stopCounting();
    };
  }, [mode, isReady]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();

        // Start continuous detection
        countFromCamera(videoRef.current, handleDetection);
      }
    } catch (err) {
      console.error('Camera error:', err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  };

  const handleDetection = useCallback((detection: BoxDetection) => {
    // Draw bounding boxes on canvas
    if (canvasRef.current && videoRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      const video = videoRef.current;
      canvasRef.current.width = video.videoWidth;
      canvasRef.current.height = video.videoHeight;

      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

      detection.boundingBoxes.forEach((box, index) => {
        // Draw box
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 3;
        ctx.strokeRect(box.x, box.y, box.width, box.height);

        // Draw label
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

    if (result) {
      setConfirmedCount(result.count);
    }
  };

  const handleCapture = async () => {
    if (!videoRef.current) return;

    const result = await countBoxes(videoRef.current);
    if (result) {
      setConfirmedCount(result.count);
    }
  };

  const handleConfirm = () => {
    if (confirmedCount !== null) {
      onCount(confirmedCount);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/50">
        <h2 className="text-white font-semibold flex items-center gap-2">
          <Box className="w-5 h-5" />
          Quick Count
        </h2>
        <button onClick={onClose} className="p-2 text-white hover:bg-white/20 rounded-lg">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Loading State */}
      {!isReady && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-white">
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
            <p>Loading detection model...</p>
            <p className="text-sm text-white/60">This may take a moment</p>
          </div>
        </div>
      )}

      {isReady && (
        <>
          {/* Mode Toggle */}
          <div className="flex gap-2 p-4 justify-center">
            <button
              onClick={() => setMode('camera')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                mode === 'camera' ? 'bg-primary-600 text-white' : 'bg-white/20 text-white'
              }`}
            >
              <Camera className="w-4 h-4" />
              Camera
            </button>
            <button
              onClick={() => setMode('image')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                mode === 'image' ? 'bg-primary-600 text-white' : 'bg-white/20 text-white'
              }`}
            >
              <Image className="w-4 h-4" />
              Image
            </button>
          </div>

          {/* Counter View */}
          <div className="flex-1 flex items-center justify-center p-4">
            {mode === 'camera' ? (
              <div className="relative w-full max-w-lg">
                <video
                  ref={videoRef}
                  className="w-full rounded-lg"
                  playsInline
                  muted
                />
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full pointer-events-none"
                />

                {/* Live count display */}
                {lastDetection && (
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-4 py-2 rounded-lg">
                    <div className="text-3xl font-bold text-center">
                      {lastDetection.count}
                    </div>
                    <div className="text-xs text-white/70">
                      {Math.round(lastDetection.confidence * 100)}% confidence
                    </div>
                  </div>
                )}

                {/* Capture button */}
                <button
                  onClick={handleCapture}
                  disabled={isProcessing}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-primary-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-primary-700 disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : 'Capture Count'}
                </button>
              </div>
            ) : (
              <div className="text-center">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-4 p-8 border-2 border-dashed border-white/30 rounded-xl hover:border-white/50 transition-colors"
                >
                  <Image className="w-16 h-16 text-white/50" />
                  <span className="text-white">Tap to select image</span>
                </button>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-500/20 text-red-200 text-center">
              {error}
            </div>
          )}

          {/* Confirmed Count */}
          {confirmedCount !== null && (
            <div className="p-4 bg-black/50">
              <div className="max-w-md mx-auto">
                <div className="text-center text-white mb-4">
                  <p className="text-sm text-white/70">Detected count:</p>
                  <div className="flex items-center justify-center gap-4 mt-2">
                    <button
                      onClick={() => setConfirmedCount(Math.max(0, confirmedCount - 1))}
                      className="w-10 h-10 bg-white/20 rounded-full text-2xl"
                    >
                      -
                    </button>
                    <span className="text-4xl font-bold">{confirmedCount}</span>
                    <button
                      onClick={() => setConfirmedCount(confirmedCount + 1)}
                      className="w-10 h-10 bg-white/20 rounded-full text-2xl"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={handleConfirm}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                >
                  Use This Count
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
