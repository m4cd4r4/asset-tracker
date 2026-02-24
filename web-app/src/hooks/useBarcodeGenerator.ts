import { useCallback } from 'react';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';

interface BarcodeImages {
  barcode128DataUrl: string;
  qrDataUrl: string;
}

export function useBarcodeGenerator() {
  const generate = useCallback(async (sanNumber: string): Promise<BarcodeImages> => {
    const barcodeCanvas = document.createElement('canvas');
    JsBarcode(barcodeCanvas, sanNumber, {
      format: 'CODE128',
      width: 2,
      height: 80,
      displayValue: true,
      fontSize: 16,
      font: 'monospace',
      margin: 10,
      background: '#ffffff',
      lineColor: '#000000',
    });
    const barcode128DataUrl = barcodeCanvas.toDataURL('image/png');

    const qrDataUrl = await QRCode.toDataURL(sanNumber, {
      width: 200,
      margin: 2,
      color: { dark: '#000000', light: '#ffffff' },
    });

    return { barcode128DataUrl, qrDataUrl };
  }, []);

  return { generate };
}
