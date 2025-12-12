import { useState } from 'react';
import { Menu, X, Scan, Box, FileDown, FileUp, AlertTriangle, List, RotateCcw } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { storage } from '@/services/storage';
import { BarcodeScanner } from './BarcodeScanner';
import { BoxCounter } from './BoxCounter';

interface HeaderProps {
  onScanResult?: (code: string) => void;
  onBoxCount?: (count: number) => void;
}

export function Header({ onScanResult, onBoxCount }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showBoxCounter, setShowBoxCounter] = useState(false);
  const [showLowStock, setShowLowStock] = useState(false);
  const [showSANList, setShowSANList] = useState(false);

  const { getLowStockItems } = useStore();
  const lowStockItems = getLowStockItems();
  const sanRecords = storage.getSANRecords();

  const handleExport = () => {
    const data = storage.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `euc-assets-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setMenuOpen(false);
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const text = await file.text();
      if (storage.importData(text)) {
        window.location.reload();
      } else {
        alert('Failed to import data');
      }
    };
    input.click();
    setMenuOpen(false);
  };

  const handleScanResult = (code: string) => {
    setShowScanner(false);
    onScanResult?.(code);
  };

  const handleBoxCount = (count: number) => {
    setShowBoxCounter(false);
    onBoxCount?.(count);
  };

  return (
    <>
      <header className="bg-primary-700 text-white px-4 py-3 flex items-center justify-between shadow-lg">
        <h1 className="text-xl font-bold">EUC Asset Tracker</h1>

        <div className="flex items-center gap-2">
          {/* Quick Actions */}
          <button
            onClick={() => setShowScanner(true)}
            className="p-2 hover:bg-white/20 rounded-lg"
            title="Scan Barcode"
          >
            <Scan className="w-5 h-5" />
          </button>
          <button
            onClick={() => setShowBoxCounter(true)}
            className="p-2 hover:bg-white/20 rounded-lg"
            title="Quick Count"
          >
            <Box className="w-5 h-5" />
          </button>

          {/* Low Stock Indicator */}
          {lowStockItems.length > 0 && (
            <button
              onClick={() => setShowLowStock(true)}
              className="p-2 hover:bg-white/20 rounded-lg relative"
              title="Low Stock Alert"
            >
              <AlertTriangle className="w-5 h-5 text-yellow-300" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {lowStockItems.length}
              </span>
            </button>
          )}

          {/* Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:bg-white/20 rounded-lg"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Dropdown Menu */}
      {menuOpen && (
        <div className="absolute right-4 top-14 bg-white rounded-lg shadow-xl z-40 py-2 min-w-48">
          <button
            onClick={() => { setShowSANList(true); setMenuOpen(false); }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3"
          >
            <List className="w-4 h-4" />
            View All SANs
          </button>
          <button
            onClick={() => { setShowLowStock(true); setMenuOpen(false); }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3"
          >
            <AlertTriangle className="w-4 h-4" />
            Low Stock Items
          </button>
          <hr className="my-2" />
          <button
            onClick={handleExport}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3"
          >
            <FileDown className="w-4 h-4" />
            Export Data
          </button>
          <button
            onClick={handleImport}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3"
          >
            <FileUp className="w-4 h-4" />
            Import Data
          </button>
          <hr className="my-2" />
          <button
            onClick={() => { if (confirm('Reset all data?')) { storage.clearAll(); window.location.reload(); } }}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-3 text-red-600"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All Data
          </button>
        </div>
      )}

      {/* Scanner Modal */}
      {showScanner && (
        <BarcodeScanner
          onScan={handleScanResult}
          onClose={() => setShowScanner(false)}
          title="Scan SAN Barcode"
        />
      )}

      {/* Box Counter Modal */}
      {showBoxCounter && (
        <BoxCounter
          onCount={handleBoxCount}
          onClose={() => setShowBoxCounter(false)}
        />
      )}

      {/* Low Stock Modal */}
      {showLowStock && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[80vh] overflow-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Low Stock Items
              </h2>
              <button onClick={() => setShowLowStock(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              {lowStockItems.length === 0 ? (
                <p className="text-gray-500 text-center py-4">All items above threshold!</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-2">Item</th>
                      <th className="pb-2">Current</th>
                      <th className="pb-2">Threshold</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockItems.map(item => (
                      <tr key={item.id} className="border-t">
                        <td className="py-2 font-medium">{item.item}</td>
                        <td className="py-2 text-red-600 font-semibold">{item.newCount}</td>
                        <td className="py-2 text-gray-500">{item.threshold}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SAN List Modal */}
      {showSANList && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-auto">
            <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-lg font-semibold">All SANs in Stock ({sanRecords.length})</h2>
              <button onClick={() => setShowSANList(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              {sanRecords.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No SANs recorded</p>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-2">SAN</th>
                      <th className="pb-2">Item</th>
                      <th className="pb-2">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sanRecords.map(record => (
                      <tr key={record.sanNumber} className="border-t">
                        <td className="py-2 font-mono">{record.sanNumber}</td>
                        <td className="py-2">{record.item}</td>
                        <td className="py-2 text-gray-500">{record.location}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
