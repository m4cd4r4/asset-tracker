import { useRef, useState, useEffect } from 'react';
import { X, Camera, Image, RefreshCw } from 'lucide-react';
import { useBarcodeScanner } from '@/hooks/useBarcodeScanner';

interface BarcodeScannerProps {
  onScan: (code: string) => void;
  onClose: () => void;
  title?: string;
}

export function BarcodeScanner({ onScan, onClose, title = 'Scan Barcode' }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isScanning, lastResult, error, startScanning, stopScanning, scanImage } = useBarcodeScanner();
  const [mode, setMode] = useState<'camera' | 'image'>('camera');

  useEffect(() => {
    if (mode === 'camera' && videoRef.current) {
      startScanning(videoRef.current);
    }
    return () => stopScanning();
  }, [mode]);

  useEffect(() => {
    if (lastResult) {
      onScan(lastResult.text);
    }
  }, [lastResult, onScan]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const result = await scanImage(url);
    URL.revokeObjectURL(url);

    if (result) {
      onScan(result.text);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/50">
        <h2 className="text-white font-semibold">{title}</h2>
        <button onClick={onClose} className="p-2 text-white hover:bg-white/20 rounded-lg">
          <X className="w-6 h-6" />
        </button>
      </div>

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

      {/* Scanner View */}
      <div className="flex-1 flex items-center justify-center p-4">
        {mode === 'camera' ? (
          <div className="relative w-full max-w-lg">
            <video
              ref={videoRef}
              className="w-full rounded-lg"
              playsInline
              muted
            />
            {/* Scanning overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border-2 border-white/50 rounded-lg">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-500 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-500 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-500 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-500 rounded-br-lg" />
              </div>
            </div>
            {isScanning && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white bg-black/50 px-4 py-2 rounded-full">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Scanning...
              </div>
            )}
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

      {/* Last Result */}
      {lastResult && (
        <div className="p-4 bg-green-500/20 text-green-200 text-center">
          <p className="text-sm">Detected: {lastResult.format}</p>
          <p className="font-mono font-bold">{lastResult.text}</p>
        </div>
      )}
    </div>
  );
}
