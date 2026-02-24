import { useState, useEffect } from 'react';
import { Barcode, QrCode, Download, Copy, Check } from 'lucide-react';
import { useBarcodeGenerator } from '@/hooks/useBarcodeGenerator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';

interface BarcodeDisplayProps {
  sanNumber: string;
  open: boolean;
  onClose: () => void;
}

export function BarcodeDisplay({ sanNumber, open, onClose }: BarcodeDisplayProps) {
  const { generate } = useBarcodeGenerator();
  const [images, setImages] = useState<{ barcode128DataUrl: string; qrDataUrl: string } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open && sanNumber) {
      generate(sanNumber).then(setImages);
    }
  }, [open, sanNumber, generate]);

  const handleDownload = () => {
    if (!images) return;
    const a = document.createElement('a');
    a.href = images.barcode128DataUrl;
    a.download = `SAN-${sanNumber}-barcode.png`;
    a.click();
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(sanNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Barcode className="w-5 h-5 text-blue-500" />
            SAN {sanNumber}
          </DialogTitle>
          <DialogDescription>
            Code 128 barcode and QR code for this serial asset number.
          </DialogDescription>
        </DialogHeader>

        {images && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Code 128 */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Barcode className="w-3 h-3" />
                  Code 128
                </div>
                <div className="bg-white rounded-lg p-3 border">
                  <img
                    src={images.barcode128DataUrl}
                    alt={`Barcode for ${sanNumber}`}
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* QR Code */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <QrCode className="w-3 h-3" />
                  QR Code
                </div>
                <div className="bg-white rounded-lg p-3 border flex items-center justify-center">
                  <img
                    src={images.qrDataUrl}
                    alt={`QR code for ${sanNumber}`}
                    className="w-32 h-32"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={handleDownload}>
                <Download className="w-3.5 h-3.5" />
                Download
              </Button>
              <Button variant="outline" size="sm" className="flex-1 gap-1.5" onClick={handleCopy}>
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy SAN'}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
