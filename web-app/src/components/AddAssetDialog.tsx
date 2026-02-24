import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { useWorkspace } from '@/hooks/useWorkspace';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface AddAssetDialogProps {
  open: boolean;
  onClose: () => void;
}

export function AddAssetDialog({ open, onClose }: AddAssetDialogProps) {
  const { currentLocation, addAsset } = useStore();
  const { assetTypes } = useWorkspace();
  const types = assetTypes();

  const [itemName, setItemName] = useState('');
  const [customName, setCustomName] = useState('');
  const [threshold, setThreshold] = useState('10');

  const handleSubmit = () => {
    const name = itemName === '__custom' ? customName.trim() : itemName;
    if (!name) return;

    addAsset(name, currentLocation, parseInt(threshold, 10) || 10);

    setItemName('');
    setCustomName('');
    setThreshold('10');
    onClose();
  };

  const isValid = (itemName === '__custom' ? customName.trim() : itemName) !== '';

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
          <DialogDescription>
            Add a new item to the current location's inventory.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Item</label>
            {types.length > 0 ? (
              <Select value={itemName} onValueChange={setItemName}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an item type..." />
                </SelectTrigger>
                <SelectContent>
                  {types.map(t => (
                    <SelectItem key={t.id} value={t.name}>{t.name}</SelectItem>
                  ))}
                  <SelectItem value="__custom">Custom item...</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <Input
                value={customName}
                onChange={(e) => { setCustomName(e.target.value); setItemName('__custom'); }}
                placeholder="Item name"
                autoFocus
              />
            )}
          </div>

          {itemName === '__custom' && (
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Custom Name</label>
              <Input
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="e.g. USB-C Hub"
                autoFocus
              />
            </div>
          )}

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Restock Threshold</label>
            <Input
              type="number"
              min="0"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="w-24"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!isValid}>Add Item</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
