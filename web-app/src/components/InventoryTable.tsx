import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Plus, Minus, AlertTriangle, ArrowUpDown, Pencil, RotateCcw, Package } from 'lucide-react';
import { SANInputModal } from './SANInputModal';
import { ThresholdEditor } from './ThresholdEditor';
import { SAN_REQUIRED_ITEMS } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface InventoryTableProps {
  onReturnSAN?: () => void;
}

export function InventoryTable({ onReturnSAN }: InventoryTableProps) {
  const { assets, updateAssetCount, error, clearError } = useStore();
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<Record<string, number>>({});
  const [sanModalOpen, setSanModalOpen] = useState(false);
  const [sortField, setSortField] = useState<'item' | 'newCount' | 'threshold'>('item');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
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
    if (!result.success) alert(result.error);
    setSanModalOpen(false);
    setPendingOperation(null);
  };

  const handleSort = (field: 'item' | 'newCount' | 'threshold') => {
    if (sortField === field) {
      setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const sorted = [...assets].sort((a, b) => {
    const mul = sortDir === 'asc' ? 1 : -1;
    if (sortField === 'item') return a.item.localeCompare(b.item) * mul;
    return ((a[sortField] as number) - (b[sortField] as number)) * mul;
  });

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Inventory</h3>
        {onReturnSAN && (
          <Button variant="ghost" size="sm" onClick={onReturnSAN} className="h-7 text-xs gap-1.5">
            <RotateCcw className="w-3 h-3" />
            Return SAN
          </Button>
        )}
      </div>

      {error && (
        <div className="mx-4 mt-3 p-2 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/30 rounded-lg flex items-center justify-between text-sm">
          <span className="text-rose-700">{error}</span>
          <button onClick={clearError} className="text-rose-500 hover:text-rose-700 text-xs font-medium">
            Dismiss
          </button>
        </div>
      )}

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>
              <button onClick={() => handleSort('item')} className="flex items-center gap-1 text-xs">
                Item
                <ArrowUpDown className="w-3 h-3 opacity-40" />
              </button>
            </TableHead>
            <TableHead className="text-center text-xs">Last</TableHead>
            <TableHead className="text-center">
              <button onClick={() => handleSort('newCount')} className="flex items-center gap-1 mx-auto text-xs">
                Current
                <ArrowUpDown className="w-3 h-3 opacity-40" />
              </button>
            </TableHead>
            <TableHead className="text-center">
              <button onClick={() => handleSort('threshold')} className="flex items-center gap-1 mx-auto text-xs">
                Thresh
                <ArrowUpDown className="w-3 h-3 opacity-40" />
              </button>
            </TableHead>
            <TableHead className="text-center text-xs">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sorted.map((asset) => {
            const isLowStock = asset.newCount < asset.threshold;
            const isSAN = SAN_REQUIRED_ITEMS.includes(asset.item);
            const isSelected = selectedAsset === asset.id;

            return (
              <TableRow
                key={asset.id}
                onClick={() => setSelectedAsset(asset.id)}
                className={cn(
                  'cursor-pointer transition-all',
                  isSelected && 'bg-blue-50/50 dark:bg-blue-500/10',
                  isLowStock && !isSelected && 'bg-amber-50/40 dark:bg-amber-500/10',
                )}
              >
                <TableCell className="py-2">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      'w-1.5 h-1.5 rounded-full shrink-0',
                      isLowStock ? 'bg-amber-400' : 'bg-emerald-400'
                    )} />
                    <span className="font-medium text-sm">{asset.item}</span>
                    {isSAN && (
                      <Badge variant="outline" className="text-[9px] px-1 py-0 h-4 font-normal text-violet-500 border-violet-200">
                        SAN
                      </Badge>
                    )}
                    {isLowStock && (
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center text-sm text-muted-foreground tabular-nums py-2">
                  {asset.lastCount}
                </TableCell>
                <TableCell className="text-center py-2">
                  <span className={cn(
                    'font-semibold text-sm tabular-nums',
                    isLowStock ? 'text-amber-600' : 'text-foreground'
                  )}>
                    {asset.newCount}
                  </span>
                </TableCell>
                <TableCell className="text-center py-2" onClick={(e) => e.stopPropagation()}>
                  <ThresholdEditor assetId={asset.id} currentThreshold={asset.threshold}>
                    <button
                      title="Click to edit threshold"
                      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <span className="tabular-nums">{asset.threshold}</span>
                      <Pencil className="w-2.5 h-2.5 opacity-0 group-hover:opacity-50 transition-opacity" />
                    </button>
                  </ThresholdEditor>
                </TableCell>
                <TableCell className="py-2" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-center gap-1.5">
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleOperation(asset.id, 'subtract')}
                      className="h-8 w-8 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-700 border border-rose-200/50 dark:bg-rose-950/50 dark:text-rose-400 dark:hover:bg-rose-900/50 dark:border-rose-800/30"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <input
                      type="number"
                      min="1"
                      value={quantity[asset.id] || 1}
                      onChange={(e) => handleQuantityChange(asset.id, e.target.value)}
                      className="w-12 h-7 px-1 text-center text-sm border rounded-md bg-background tabular-nums"
                    />
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => handleOperation(asset.id, 'add')}
                      className="h-8 w-8 rounded-full bg-emerald-50 text-emerald-600 hover:bg-emerald-100 hover:text-emerald-700 border border-emerald-200/50 dark:bg-emerald-950/50 dark:text-emerald-400 dark:hover:bg-emerald-900/50 dark:border-emerald-800/30"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {sorted.length === 0 && (
        <div className="px-4 py-8 text-center">
          <Package className="w-8 h-8 mx-auto mb-2 text-muted-foreground/30" />
          <p className="text-sm text-muted-foreground">No items at this location</p>
        </div>
      )}

      {sorted.length > 0 && sorted.length <= 3 && (
        <div className="px-4 py-2 text-center border-t border-border/30">
          <p className="text-[10px] text-muted-foreground/60">
            {sorted.length} item{sorted.length !== 1 ? 's' : ''} tracked here
          </p>
        </div>
      )}

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
