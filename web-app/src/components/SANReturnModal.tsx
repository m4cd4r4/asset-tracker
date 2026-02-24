import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { GENERATIONS, type Generation } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SANReturnModalProps {
  open: boolean;
  onClose: () => void;
}

export function SANReturnModal({ open, onClose }: SANReturnModalProps) {
  const { addSANReturn } = useStore();

  const [sanNumber, setSanNumber] = useState('');
  const [generation, setGeneration] = useState<Generation>('G8');
  const [returnedBy, setReturnedBy] = useState('');
  const [returnedTo, setReturnedTo] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    if (!sanNumber || !returnedBy || !returnedTo) return;

    addSANReturn({
      sanNumber,
      generation,
      returnedBy,
      returnedTo,
      notes,
    });

    setSanNumber('');
    setReturnedBy('');
    setReturnedTo('');
    setNotes('');
    onClose();
  };

  const isValid = sanNumber.length >= 5 && returnedBy.trim() && returnedTo.trim();

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Return SAN Asset</DialogTitle>
          <DialogDescription>Record a device being returned to stock.</DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">SAN Number</label>
            <Input
              value={sanNumber}
              onChange={(e) => setSanNumber(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="e.g. 12345"
              inputMode="numeric"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Generation</label>
            <Select value={generation} onValueChange={(v) => setGeneration(v as Generation)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {GENERATIONS.map(gen => (
                  <SelectItem key={gen} value={gen}>{gen}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Returned By</label>
              <Input
                value={returnedBy}
                onChange={(e) => setReturnedBy(e.target.value)}
                placeholder="Name"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Returned To</label>
              <Input
                value={returnedTo}
                onChange={(e) => setReturnedTo(e.target.value)}
                placeholder="Name"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes..."
              className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!isValid}>Record Return</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
