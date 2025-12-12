import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Plus, Minus, AlertTriangle } from 'lucide-react';
import { SANInputModal } from './SANInputModal';
import { SAN_REQUIRED_ITEMS } from '@/types';

export function InventoryTable() {
  const { assets, updateAssetCount, error, clearError } = useStore();
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<Record<string, number>>({});
  const [sanModalOpen, setSanModalOpen] = useState(false);
  const [pendingOperation, setPendingOperation] = useState<{
    assetId: string;
    operation: 'add' | 'subtract';
    quantity: number;
  } | null>(null);

  const handleQuantityChange = (assetId: string, value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0) {
      setQuantity(prev => ({ ...prev, [assetId]: num }));
    }
  };

  const handleOperation = (assetId: string, operation: 'add' | 'subtract') => {
    const asset = assets.find(a => a.id === assetId);
    const qty = quantity[assetId] || 1;

    if (!asset) return;

    // Check if SAN is required
    if (SAN_REQUIRED_ITEMS.includes(asset.item)) {
      setPendingOperation({ assetId, operation, quantity: qty });
      setSanModalOpen(true);
    } else {
      const result = updateAssetCount(assetId, operation, qty);
      if (!result.success) {
        alert(result.error);
      }
    }
  };

  const handleSANSubmit = (sanNumbers: string[]) => {
    if (!pendingOperation) return;

    const result = updateAssetCount(
      pendingOperation.assetId,
      pendingOperation.operation,
      pendingOperation.quantity,
      sanNumbers
    );

    if (!result.success) {
      alert(result.error);
    }

    setSanModalOpen(false);
    setPendingOperation(null);
  };

  return (
    <div className="flex-1 overflow-auto">
      {error && (
        <div className="m-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center justify-between">
          <span className="text-red-700">{error}</span>
          <button onClick={clearError} className="text-red-500 hover:text-red-700">
            Dismiss
          </button>
        </div>
      )}

      <table className="w-full">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Item</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Last</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Current</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Threshold</th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => {
            const isLowStock = asset.newCount < asset.threshold;
            return (
              <tr
                key={asset.id}
                onClick={() => setSelectedAsset(asset.id)}
                className={`border-b cursor-pointer transition-colors ${
                  selectedAsset === asset.id
                    ? 'bg-primary-50'
                    : index % 2 === 0
                    ? 'bg-white'
                    : 'bg-gray-50'
                } ${isLowStock ? 'bg-yellow-50' : ''}`}
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{asset.item}</span>
                    {isLowStock && (
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-center text-gray-500">{asset.lastCount}</td>
                <td className="px-4 py-3 text-center">
                  <span className={`font-semibold ${isLowStock ? 'text-yellow-600' : 'text-gray-900'}`}>
                    {asset.newCount}
                  </span>
                </td>
                <td className="px-4 py-3 text-center text-gray-500">{asset.threshold}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); handleOperation(asset.id, 'subtract'); }}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity[asset.id] || 1}
                      onChange={(e) => handleQuantityChange(asset.id, e.target.value)}
                      onClick={(e) => e.stopPropagation()}
                      className="w-16 px-2 py-1 text-center border rounded-lg"
                    />
                    <button
                      onClick={(e) => { e.stopPropagation(); handleOperation(asset.id, 'add'); }}
                      className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {sanModalOpen && pendingOperation && (
        <SANInputModal
          quantity={pendingOperation.quantity}
          operation={pendingOperation.operation}
          itemName={assets.find(a => a.id === pendingOperation.assetId)?.item || ''}
          onSubmit={handleSANSubmit}
          onCancel={() => {
            setSanModalOpen(false);
            setPendingOperation(null);
          }}
        />
      )}
    </div>
  );
}
