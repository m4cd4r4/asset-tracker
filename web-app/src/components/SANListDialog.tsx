import { useState } from 'react';
import { storage } from '@/services/storage';
import { useWorkspace } from '@/hooks/useWorkspace';
import { Hash, Search, Barcode } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { BarcodeDisplay } from './BarcodeDisplay';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 25;

interface SANListDialogProps {
  open: boolean;
  onClose: () => void;
}

export function SANListDialog({ open, onClose }: SANListDialogProps) {
  const [search, setSearch] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [barcodeForSAN, setBarcodeForSAN] = useState<string | null>(null);
  const { locations, assetNumberConfig, findLocation } = useWorkspace();
  const wsLocations = locations();
  const anConfig = assetNumberConfig();
  const sanRecords = storage.getSANRecords();

  const filtered = sanRecords
    .filter(r => locationFilter === 'all' || r.location === locationFilter)
    .filter(r =>
      !search || r.sanNumber.includes(search) || r.item.toLowerCase().includes(search.toLowerCase())
    );

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  const locationCounts = sanRecords.reduce<Record<string, number>>((acc, r) => {
    acc[r.location] = (acc[r.location] || 0) + 1;
    return acc;
  }, {});

  const activeLocations = wsLocations.filter(l => locationCounts[l.id]);

  return (
    <Dialog open={open} onOpenChange={(v) => { if (!v) { onClose(); setVisibleCount(PAGE_SIZE); setLocationFilter('all'); setSearch(''); } }}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-violet-500" />
            {anConfig.displayName} Registry
          </DialogTitle>
          <DialogDescription>
            {filtered.length} of {sanRecords.length} {anConfig.displayName.toLowerCase()}{sanRecords.length !== 1 ? 's' : ''}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search SAN or item..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setVisibleCount(PAGE_SIZE); }}
              className="pl-9 h-9"
            />
          </div>

          {activeLocations.length > 1 && (
            <div className="flex gap-1 flex-wrap">
              <button
                onClick={() => { setLocationFilter('all'); setVisibleCount(PAGE_SIZE); }}
                className={cn(
                  'px-2 py-0.5 rounded text-[10px] font-medium transition-colors',
                  locationFilter === 'all'
                    ? 'bg-foreground/10 text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                All
              </button>
              {activeLocations.map(loc => (
                <button
                  key={loc.id}
                  onClick={() => { setLocationFilter(loc.id); setVisibleCount(PAGE_SIZE); }}
                  className={cn(
                    'px-2 py-0.5 rounded text-[10px] font-medium transition-colors',
                    locationFilter === loc.id
                      ? 'bg-foreground/10 text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  {loc.shortName}
                </button>
              ))}
            </div>
          )}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Hash className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">{search || locationFilter !== 'all' ? `No matching ${anConfig.displayName}s found` : `No ${anConfig.displayName}s recorded yet`}</p>
          </div>
        ) : (
          <div className="max-h-80 overflow-auto -mx-2">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">{anConfig.displayName}</TableHead>
                  <TableHead className="text-xs">Item</TableHead>
                  <TableHead className="text-xs">Location</TableHead>
                  <TableHead className="text-xs">Date</TableHead>
                  <TableHead className="text-xs w-8"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visible.map(record => {
                  const loc = findLocation(record.location);
                  const date = new Date(record.timestamp);
                  return (
                    <TableRow key={record.sanNumber}>
                      <TableCell className="font-mono text-sm font-medium">{record.sanNumber}</TableCell>
                      <TableCell className="text-sm">{record.item}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-[10px]">
                          {loc?.shortName ?? record.location}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {date.toLocaleDateString('en-AU')}
                      </TableCell>
                      <TableCell className="p-1">
                        <button
                          onClick={() => setBarcodeForSAN(record.sanNumber)}
                          className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                          title="Show barcode"
                        >
                          <Barcode className="w-3.5 h-3.5" />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            {hasMore && (
              <div className="py-2 text-center">
                <button
                  onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Show more ({filtered.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        )}
      </DialogContent>

      {barcodeForSAN && (
        <BarcodeDisplay
          sanNumber={barcodeForSAN}
          open={!!barcodeForSAN}
          onClose={() => setBarcodeForSAN(null)}
        />
      )}
    </Dialog>
  );
}
