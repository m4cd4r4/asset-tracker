import { Menu, Scan, Box, AlertTriangle } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { LOCATIONS } from '@/types';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface HeaderProps {
  onMenuClick: () => void;
  onScanClick: () => void;
  onCountClick: () => void;
  onLowStockClick: () => void;
}

export function Header({ onMenuClick, onScanClick, onCountClick, onLowStockClick }: HeaderProps) {
  const { currentLocation, getLowStockItems } = useStore();
  const lowStockCount = getLowStockItems().length;
  const locationName = LOCATIONS.find(l => l.id === currentLocation)?.name ?? 'Inventory';

  return (
    <header className="md:hidden glass-card border-b border-white/10 px-4 py-3 flex items-center justify-between safe-area-inset-top">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon-sm" onClick={onMenuClick} className="text-foreground">
          <Menu className="w-5 h-5" />
        </Button>
        <h2 className="font-semibold text-foreground">{locationName}</h2>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon-sm" onClick={onScanClick}>
          <Scan className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="icon-sm" onClick={onCountClick}>
          <Box className="w-4 h-4" />
        </Button>
        {lowStockCount > 0 && (
          <Button variant="ghost" size="icon-sm" onClick={onLowStockClick} className="relative">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <Badge className="absolute -top-1 -right-1 h-4 min-w-4 p-0 flex items-center justify-center text-[9px] bg-rose-500">
              {lowStockCount}
            </Badge>
          </Button>
        )}
      </div>
    </header>
  );
}
