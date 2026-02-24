import { useState } from 'react';
import {
  Package, Activity, BarChart3, Hash, Scan, Box,
  FileDown, FileUp, RotateCcw, AlertTriangle, ChevronDown,
  MapPin, Moon, Sun,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useStore } from '@/store/useStore';
import { storage } from '@/services/storage';
import { LOCATIONS } from '@/types';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onScanClick: () => void;
  onCountClick: () => void;
  onLowStockClick: () => void;
  onSANListClick: () => void;
  onLocationChange?: (id: string) => void;
}

export function Sidebar({
  activeView,
  onViewChange,
  onScanClick,
  onCountClick,
  onLowStockClick,
  onSANListClick,
  onLocationChange,
}: SidebarProps) {
  const { currentLocation, setLocation, getLowStockItems, assets } = useStore();
  const [showDataMenu, setShowDataMenu] = useState(false);
  const { dark, toggle: toggleTheme } = useTheme();
  const lowStockCount = getLowStockItems().length;

  const handleExport = () => {
    const data = storage.exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `euc-assets-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
      }
    };
    input.click();
  };

  const navItems = [
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'activity', label: 'Activity', icon: Activity },
    { id: 'reports', label: 'Reports', icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col h-full text-slate-300">
      {/* Logo */}
      <div className="p-5 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Package className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h1 className="text-white font-semibold text-sm leading-tight">EUC Asset</h1>
            <p className="text-slate-500 text-xs">Tracker WA</p>
          </div>
        </div>
      </div>

      <Separator className="bg-white/5" />

      {/* Locations */}
      <div className="px-3 py-3">
        <p className="px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Locations</p>
        <div className="space-y-0.5">
          {LOCATIONS.map((loc) => {
            const isActive = currentLocation === loc.id;
            const locAssets = assets.filter(a => a.location === loc.id);
            const totalItems = locAssets.reduce((sum, a) => sum + a.newCount, 0);

            return (
              <button
                key={loc.id}
                onClick={() => { setLocation(loc.id); onLocationChange?.(loc.id); }}
                className={cn(
                  'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all',
                  isActive
                    ? 'bg-blue-500/15 text-blue-400 border-l-2 border-blue-400 pl-2'
                    : 'hover:bg-white/5 text-slate-400 hover:text-slate-300'
                )}
              >
                <MapPin className={cn('w-3.5 h-3.5 shrink-0', isActive ? 'text-blue-400' : 'text-slate-500')} />
                <span className="flex-1 text-left truncate">{loc.name}</span>
                {totalItems > 0 && (
                  <span className={cn(
                    'text-[10px] tabular-nums',
                    isActive ? 'text-blue-400/70' : 'text-slate-600'
                  )}>
                    {totalItems}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <Separator className="bg-white/5" />

      {/* Navigation */}
      <div className="px-3 py-3">
        <p className="px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Navigation</p>
        <div className="space-y-0.5">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              className={cn(
                'w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all',
                activeView === id
                  ? 'bg-white/10 text-white'
                  : 'hover:bg-white/5 text-slate-400 hover:text-slate-300'
              )}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
          <button
            onClick={onSANListClick}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all hover:bg-white/5 text-slate-400 hover:text-slate-300"
          >
            <Hash className="w-4 h-4" />
            <span>SAN Registry</span>
          </button>
        </div>
      </div>

      <Separator className="bg-white/5" />

      {/* Quick Actions */}
      <div className="px-3 py-3">
        <p className="px-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-2">Quick Actions</p>
        <div className="grid grid-cols-2 gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={onScanClick}
            className="h-9 text-slate-400 hover:text-white hover:bg-white/10 justify-start gap-2 text-xs"
          >
            <Scan className="w-3.5 h-3.5" />
            Scan
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onCountClick}
            className="h-9 text-slate-400 hover:text-white hover:bg-white/10 justify-start gap-2 text-xs"
          >
            <Box className="w-3.5 h-3.5" />
            Count
          </Button>
        </div>

        {/* Low Stock Alert */}
        {lowStockCount > 0 && (
          <button
            onClick={onLowStockClick}
            className="w-full mt-2 flex items-center gap-2 px-2.5 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm hover:bg-amber-500/15 transition-colors"
          >
            <AlertTriangle className="w-4 h-4" />
            <span className="flex-1 text-left">Low Stock</span>
            <Badge variant="warning" className="text-[10px] px-1.5 py-0">
              {lowStockCount}
            </Badge>
          </button>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Theme Toggle */}
      <div className="px-3 py-1">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all"
        >
          {dark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          <span>{dark ? 'Light mode' : 'Dark mode'}</span>
        </button>
      </div>

      {/* Data Management */}
      <div className="px-3 py-3 border-t border-white/5">
        <button
          onClick={() => setShowDataMenu(!showDataMenu)}
          className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-400 hover:bg-white/5 transition-all"
        >
          <span className="flex-1 text-left">Data Management</span>
          <ChevronDown className={cn('w-3.5 h-3.5 transition-transform', showDataMenu && 'rotate-180')} />
        </button>
        {showDataMenu && (
          <div className="mt-1 space-y-0.5">
            <button
              onClick={handleExport}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-xs text-slate-400 hover:bg-white/5"
            >
              <FileDown className="w-3.5 h-3.5" />
              Export Data
            </button>
            <button
              onClick={handleImport}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-xs text-slate-400 hover:bg-white/5"
            >
              <FileUp className="w-3.5 h-3.5" />
              Import Data
            </button>
            <button
              onClick={() => { if (confirm('Reset all data? This cannot be undone.')) { storage.clearAll(); window.location.reload(); } }}
              className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded text-xs text-rose-400 hover:bg-rose-500/10"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
