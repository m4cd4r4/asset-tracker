import { useState } from 'react';
import { Check } from 'lucide-react';
import { storage } from '@/services/storage';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface SANInputModalProps {
  quantity: number;
  operation: 'add' | 'subtract';
  itemName: string;
  onSubmit: (sanNumbers: string[]) => void;
  onCancel: () => void;
}

export function SANInputModal({ quantity, operation, itemName, onSubmit, onCancel }: SANInputModalProps) {
  const [sanNumbers, setSanNumbers] = useState<string[]>(Array(quantity).fill(''));
  const [errors, setErrors] = useState<string[]>(Array(quantity).fill(''));

  const validateSAN = (san: string, index: number): boolean => {
    const newErrors = [...errors];

    if (!/^\d{5,6}$/.test(san)) {
      newErrors[index] = 'Must be 5-6 digits';
      setErrors(newErrors);
      return false;
    }

    if (operation === 'add' && !storage.isSANUnique(san)) {
      newErrors[index] = 'SAN already exists';
      setErrors(newErrors);
      return false;
    }

    if (operation === 'subtract') {
      const records = storage.getSANRecords();
      const record = records.find(r => r.sanNumber === san);
      if (!record) {
        newErrors[index] = 'SAN not found';
        setErrors(newErrors);
        return false;
      }
      if (record.item !== itemName) {
        newErrors[index] = `Belongs to ${record.item}`;
        setErrors(newErrors);
        return false;
      }
    }

    if (sanNumbers.filter((s, i) => s === san && i !== index).length > 0) {
      newErrors[index] = 'Duplicate SAN';
      setErrors(newErrors);
      return false;
    }

    newErrors[index] = '';
    setErrors(newErrors);
    return true;
  };

  const handleChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 6);
    const newSanNumbers = [...sanNumbers];
    newSanNumbers[index] = cleaned;
    setSanNumbers(newSanNumbers);

    if (cleaned.length >= 5) {
      validateSAN(cleaned, index);
    } else {
      const newErrors = [...errors];
      newErrors[index] = '';
      setErrors(newErrors);
    }
  };

  const handleSubmit = () => {
    let allValid = true;
    sanNumbers.forEach((san, index) => {
      if (!validateSAN(san, index)) allValid = false;
    });

    if (allValid && sanNumbers.every(san => san.length >= 5)) {
      onSubmit(sanNumbers);
    }
  };

  const allFilled = sanNumbers.every(san => san.length >= 5);
  const hasErrors = errors.some(e => e !== '');

  return (
    <Dialog open onOpenChange={(v) => !v && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {operation === 'add' ? 'Add' : 'Remove'} {itemName}
          </DialogTitle>
          <DialogDescription>
            Enter {quantity} SAN number{quantity > 1 ? 's' : ''} (5-6 digits each)
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2.5 max-h-60 overflow-auto">
          {sanNumbers.map((san, index) => (
            <div key={index}>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-6 text-right shrink-0">
                  #{index + 1}
                </span>
                <Input
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={san}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder="Enter SAN"
                  className={cn(
                    'h-9',
                    errors[index] && 'border-rose-300 bg-rose-50 focus-visible:ring-rose-400'
                  )}
                  autoFocus={index === 0}
                />
                {san.length >= 5 && !errors[index] && (
                  <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-emerald-600" />
                  </div>
                )}
              </div>
              {errors[index] && (
                <p className="text-xs text-rose-500 mt-1 ml-8">{errors[index]}</p>
              )}
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={!allFilled || hasErrors}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
