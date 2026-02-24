import { useStore } from '@/store/useStore';
import { LOCATIONS } from '@/types';
import { AlertTriangle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

interface LowStockDialogProps {
  open: boolean;
  onClose: () => void;
}

export function LowStockDialog({ open, onClose }: LowStockDialogProps) {
  const { getLowStockItems } = useStore();
  const lowStockItems = getLowStockItems();

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            Low Stock Items
          </DialogTitle>
          <DialogDescription>
            Items below their restock threshold across all locations.
          </DialogDescription>
        </DialogHeader>

        {lowStockItems.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <AlertTriangle className="w-10 h-10 mx-auto mb-2 text-emerald-400" />
            <p className="font-medium text-foreground">All stocked up!</p>
            <p className="text-sm">Every item is above its threshold.</p>
          </div>
        ) : (
          <div className="max-h-80 overflow-auto -mx-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Item</TableHead>
                  <TableHead className="text-xs">Location</TableHead>
                  <TableHead className="text-xs text-center">Current</TableHead>
                  <TableHead className="text-xs text-center">Threshold</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockItems.map(item => {
                  const loc = LOCATIONS.find(l => l.id === item.location);
                  return (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium text-sm">{item.item}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-[10px]">
                          {loc?.shortName ?? item.location}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="danger">{item.newCount}</Badge>
                      </TableCell>
                      <TableCell className="text-center text-sm text-muted-foreground">
                        {item.threshold}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
