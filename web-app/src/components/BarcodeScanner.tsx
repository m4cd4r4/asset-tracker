import { useRef, useState, useEffect } from 'react';
import { X, Camera, Image, RefreshCw } from 'lucide-react';
import { useBarcodeScanner } from '@/hooks/useBarcodeScanner';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

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
    if (lastResult) onScan(lastResult.text);
  }, [lastResult, onScan]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const result = await scanImage(url);
    URL.revokeObjectURL(url);
    if (result) onScan(result.text);
  };

  return (
    <div className="fixed inset-0 bg-black/90 flex flex-col z-50">
      {/* Glass Header */}
      <div className="flex items-center justify-between p-4 glass-card-dark border-b border-white/10">
        <h2 className="text-white font-semibold text-sm">{title}</h2>
        <Button variant="ghost" size="icon-sm" onClick={onClose} className="text-white hover:bg-white/10">
          <X className="w-5 h-5" />
        </Button>
      </div>

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

      {/* Scanner View */}
      <div className="flex-1 flex items-center justify-center p-4">
        {mode === 'camera' ? (
          <div className="relative w-full max-w-lg">
            <video ref={videoRef} className="w-full rounded-xl" playsInline muted />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border-2 border-white/20 rounded-lg relative">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-400 rounded-tl-lg" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-400 rounded-tr-lg" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400 rounded-bl-lg" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-400 rounded-br-lg" />
              </div>
            </div>
            {isScanning && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white glass-card-dark px-4 py-2 rounded-full text-sm">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Scanning...
              </div>
            )}
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

      {lastResult && (
        <div className="p-3 mx-4 mb-4 rounded-lg bg-emerald-500/20 text-emerald-200 text-center">
          <p className="text-xs opacity-70">Detected: {lastResult.format}</p>
          <p className="font-mono font-bold">{lastResult.text}</p>
        </div>
      )}
    </div>
  );
}
