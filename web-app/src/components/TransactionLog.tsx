import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { ArrowUp, ArrowDown, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

export function TransactionLog() {
  const { transactions } = useStore();
  const [filter, setFilter] = useState<'all' | 'add' | 'subtract'>('all');

  const filtered = filter === 'all'
    ? transactions
    : transactions.filter(t => t.action === filter);

  const formatRelativeTime = (iso: string) => {
    const diff = Date.now() - new Date(iso).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    if (days < 30) return `${Math.floor(days / 7)}w ago`;
    if (days < 365) return `${Math.floor(days / 30)}mo ago`;
    return new Date(iso).toLocaleDateString('en-AU');
  };

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">Activity</h3>
        </div>
        <div className="flex gap-1">
          {(['all', 'add', 'subtract'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                'px-2 py-0.5 rounded text-[10px] font-medium transition-colors capitalize',
                filter === f
                  ? 'bg-foreground/10 text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Activity Feed */}
      <div className="max-h-64 overflow-auto">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-muted-foreground text-sm">
            No transactions yet
          </div>
        ) : (
          <div className="divide-y divide-border/50">
            {filtered.slice(0, 50).map((tx) => (
              <div
                key={tx.id}
                className={cn(
                  'px-4 py-2.5 flex items-center gap-3 hover:bg-white/30 transition-colors',
                  tx.action === 'add' ? 'border-l-2 border-l-emerald-400' : 'border-l-2 border-l-rose-400'
                )}
              >
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center shrink-0',
                  tx.action === 'add' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                )}>
                  {tx.action === 'add' ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">{tx.item}</span>
                    <Badge variant={tx.action === 'add' ? 'success' : 'danger'} className="text-[10px] px-1.5 py-0">
                      {tx.action === 'add' ? '+' : '-'}{tx.volume}
                    </Badge>
                  </div>
                  {tx.sanNumber && (
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                      SAN: {tx.sanNumber}
                    </p>
                  )}
                </div>

                <span className="text-[10px] text-muted-foreground shrink-0">
                  {formatRelativeTime(tx.timestamp)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
