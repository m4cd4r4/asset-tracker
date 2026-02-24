import { Package, AlertTriangle, Hash, Activity } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { useWorkspace } from '@/hooks/useWorkspace';
import { cn } from '@/lib/utils';

export function KPICards() {
  const { assets, sanRecords, transactions, currentLocation, getLowStockItems } = useStore();
  const { assetNumberConfig } = useWorkspace();

  const totalItems = assets.reduce((sum, a) => sum + a.newCount, 0);
  const lowStockItems = getLowStockItems().filter(a => a.location === currentLocation);
  const locationSANs = sanRecords.filter(s => s.location === currentLocation);

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const recentTxns = transactions.filter(t => t.timestamp >= thirtyDaysAgo);

  const cards = [
    {
      label: 'Total Items',
      value: totalItems,
      icon: Package,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: 'Low Stock',
      value: lowStockItems.length,
      icon: AlertTriangle,
      color: lowStockItems.length > 0 ? 'text-amber-500' : 'text-emerald-500',
      bgColor: lowStockItems.length > 0 ? 'bg-amber-500/10' : 'bg-emerald-500/10',
    },
    {
      label: `${assetNumberConfig().displayName}s Tracked`,
      value: locationSANs.length,
      icon: Hash,
      color: 'text-violet-500',
      bgColor: 'bg-violet-500/10',
    },
    {
      label: 'Recent Activity',
      value: recentTxns.length,
      icon: Activity,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map(({ label, value, icon: Icon, color, bgColor }) => (
        <div
          key={label}
          className="glass-card rounded-xl p-4 flex items-center gap-3"
        >
          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0', bgColor)}>
            <Icon className={cn('w-5 h-5', color)} />
          </div>
          <div className="min-w-0">
            <p className="text-2xl font-bold text-foreground tabular-nums">{value}</p>
            <p className="text-xs text-muted-foreground truncate">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
