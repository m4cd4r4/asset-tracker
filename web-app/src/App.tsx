import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { Header } from '@/components/Header';
import { LocationSelector } from '@/components/LocationSelector';
import { InventoryTable } from '@/components/InventoryTable';
import { TransactionLog } from '@/components/TransactionLog';
import { ChevronDown, ChevronUp } from 'lucide-react';

function App() {
  const { loadData, isLoading } = useStore();
  const [showLog, setShowLog] = useState(true);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [quickCount, setQuickCount] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const handleScanResult = (code: string) => {
    setScannedCode(code);
    // Auto-dismiss after 5 seconds
    setTimeout(() => setScannedCode(null), 5000);
  };

  const handleBoxCount = (count: number) => {
    setQuickCount(count);
    // Auto-dismiss after 10 seconds
    setTimeout(() => setQuickCount(null), 10000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header onScanResult={handleScanResult} onBoxCount={handleBoxCount} />

      {/* Scanned Code Banner */}
      {scannedCode && (
        <div className="bg-green-500 text-white px-4 py-2 flex items-center justify-between">
          <span>
            Scanned: <strong className="font-mono">{scannedCode}</strong>
          </span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(scannedCode);
            }}
            className="text-sm bg-white/20 px-2 py-1 rounded"
          >
            Copy
          </button>
        </div>
      )}

      {/* Quick Count Banner */}
      {quickCount !== null && (
        <div className="bg-blue-500 text-white px-4 py-2 flex items-center justify-between">
          <span>
            Quick Count: <strong className="text-xl">{quickCount}</strong> items detected
          </span>
          <button
            onClick={() => setQuickCount(null)}
            className="text-sm bg-white/20 px-2 py-1 rounded"
          >
            Dismiss
          </button>
        </div>
      )}

      <LocationSelector />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Inventory Section */}
        <div className="flex-1 overflow-auto">
          <InventoryTable />
        </div>

        {/* Transaction Log Section */}
        <div className="border-t bg-white">
          <button
            onClick={() => setShowLog(!showLog)}
            className="w-full px-4 py-2 flex items-center justify-between text-sm font-medium text-gray-600 hover:bg-gray-50"
          >
            <span>Transaction Log</span>
            {showLog ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
          {showLog && <TransactionLog />}
        </div>
      </main>

      {/* PWA Install Prompt would go here */}
    </div>
  );
}

export default App;
