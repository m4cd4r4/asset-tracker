import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Input } from './ui/input';
import { Button } from './ui/button';

interface ThresholdEditorProps {
  assetId: string;
  currentThreshold: number;
  children: React.ReactNode;
}

export function ThresholdEditor({ assetId, currentThreshold, children }: ThresholdEditorProps) {
  const { updateThreshold } = useStore();
  const [value, setValue] = useState(String(currentThreshold));
  const [open, setOpen] = useState(false);

  const handleSave = () => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num >= 0) {
      updateThreshold(assetId, num);
      setOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={(v) => { setOpen(v); if (v) setValue(String(currentThreshold)); }}>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-48 p-3" align="center">
        <p className="text-xs font-medium text-muted-foreground mb-2">Set threshold</p>
        <div className="flex gap-2">
          <Input
            type="number"
            min="0"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-8 text-sm"
            autoFocus
          />
          <Button size="sm" className="h-8 px-3" onClick={handleSave}>
            Save
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
