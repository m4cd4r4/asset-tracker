import { useEffect, useState } from 'react';
import { useStore } from '@/store/useStore';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { KPICards } from '@/components/KPICards';
import { InventoryTable } from '@/components/InventoryTable';
import { InventoryChart } from '@/components/InventoryChart';
import { TransactionLog } from '@/components/TransactionLog';
import { BarcodeScanner } from '@/components/BarcodeScanner';
import { BoxCounter } from '@/components/BoxCounter';
import { OCRScanner } from '@/components/OCRScanner';
import { LowStockDialog } from '@/components/LowStockDialog';
import { SANListDialog } from '@/components/SANListDialog';
import { SANReturnModal } from '@/components/SANReturnModal';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';

function App() {
  const { loadData, isLoading } = useStore();

  const [activeView, setActiveView] = useState('inventory');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showBoxCounter, setShowBoxCounter] = useState(false);
  const [showLowStock, setShowLowStock] = useState(false);
  const [showSANList, setShowSANList] = useState(false);
  const [showSANReturn, setShowSANReturn] = useState(false);
  const [showOCR, setShowOCR] = useState(false);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [quickCount, setQuickCount] = useState<number | null>(null);

  useEffect(() => { loadData(); }, []);

  const handleScanResult = (code: string) => {
    setShowScanner(false);
    setScannedCode(code);
    setTimeout(() => setScannedCode(null), 5000);
  };

  const handleBoxCount = (count: number) => {
    setShowBoxCounter(false);
    setQuickCount(count);
    setTimeout(() => setQuickCount(null), 10000);
  };

  const handleOCRScan = (san: string) => {
    setShowOCR(false);
    setScannedCode(san);
    setTimeout(() => setScannedCode(null), 5000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-mesh flex items-center justify-center">
        <div className="text-center glass-card rounded-2xl p-8">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-mesh flex">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-56 shrink-0 glass-card-dark border-r border-white/5 flex-col">
          <Sidebar
            activeView={activeView}
            onViewChange={setActiveView}
            onScanClick={() => setShowScanner(true)}
            onCountClick={() => setShowBoxCounter(true)}
            onOCRClick={() => setShowOCR(true)}
            onLowStockClick={() => setShowLowStock(true)}
            onSANListClick={() => setShowSANList(true)}
          />
        </aside>

        {/* Mobile Sidebar Sheet */}
        <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
          <SheetContent side="left" className="w-64 p-0">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <SheetDescription className="sr-only">App navigation and controls</SheetDescription>
            <Sidebar
              activeView={activeView}
              onViewChange={(v) => { setActiveView(v); setSidebarOpen(false); }}
              onLocationChange={() => setSidebarOpen(false)}
              onScanClick={() => { setShowScanner(true); setSidebarOpen(false); }}
              onCountClick={() => { setShowBoxCounter(true); setSidebarOpen(false); }}
              onOCRClick={() => { setShowOCR(true); setSidebarOpen(false); }}
              onLowStockClick={() => { setShowLowStock(true); setSidebarOpen(false); }}
              onSANListClick={() => { setShowSANList(true); setSidebarOpen(false); }}
            />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          {/* Mobile Header */}
          <Header
            onMenuClick={() => setSidebarOpen(true)}
            onScanClick={() => setShowScanner(true)}
            onCountClick={() => setShowBoxCounter(true)}
            onOCRClick={() => setShowOCR(true)}
            onLowStockClick={() => setShowLowStock(true)}
          />

          {/* Toast Notifications */}
          <div className="fixed top-4 right-4 z-40 flex flex-col gap-2 md:top-6 md:right-6">
            {scannedCode && (
              <div className="glass-card rounded-lg px-4 py-3 flex items-center gap-3 animate-slide-in-right shadow-lg max-w-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Scanned</p>
                  <p className="text-sm font-mono font-medium truncate">{scannedCode}</p>
                </div>
                <button
                  onClick={() => { navigator.clipboard.writeText(scannedCode); }}
                  className="text-xs text-blue-500 hover:text-blue-600 font-medium shrink-0"
                >
                  Copy
                </button>
              </div>
            )}
            {quickCount !== null && (
              <div className="glass-card rounded-lg px-4 py-3 flex items-center gap-3 animate-slide-in-right shadow-lg">
                <div className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Quick Count</p>
                  <p className="text-lg font-bold tabular-nums">{quickCount} items</p>
                </div>
                <button
                  onClick={() => setQuickCount(null)}
                  className="text-xs text-muted-foreground hover:text-foreground shrink-0"
                >
                  Dismiss
                </button>
              </div>
            )}
          </div>

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-4 md:p-6 space-y-4">
            {activeView === 'inventory' && (
              <>
                <KPICards />
                <InventoryTable onReturnSAN={() => setShowSANReturn(true)} />
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                  <div className="lg:col-span-3">
                    <InventoryChart />
                  </div>
                  <div className="lg:col-span-2">
                    <TransactionLog />
                  </div>
                </div>
              </>
            )}

            {activeView === 'activity' && (
              <div className="max-w-3xl">
                <TransactionLog />
              </div>
            )}

            {activeView === 'reports' && (
              <div className="max-w-4xl space-y-4">
                <InventoryChart />
                <KPICards />
              </div>
            )}
          </main>
        </div>

        {/* Modals */}
        {showScanner && (
          <BarcodeScanner
            onScan={handleScanResult}
            onClose={() => setShowScanner(false)}
            title="Scan SAN Barcode"
          />
        )}

        {showBoxCounter && (
          <BoxCounter
            onCount={handleBoxCount}
            onClose={() => setShowBoxCounter(false)}
          />
        )}

        {showOCR && (
          <OCRScanner
            onScanSAN={handleOCRScan}
            onClose={() => setShowOCR(false)}
          />
        )}

        <LowStockDialog open={showLowStock} onClose={() => setShowLowStock(false)} />
        <SANListDialog open={showSANList} onClose={() => setShowSANList(false)} />
        <SANReturnModal open={showSANReturn} onClose={() => setShowSANReturn(false)} />
      </div>
    </TooltipProvider>
  );
}

export default App;
