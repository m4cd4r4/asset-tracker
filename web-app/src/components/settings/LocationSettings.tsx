import { useState } from 'react';
import { Plus, Trash2, MapPin } from 'lucide-react';
import { useWorkspace } from '@/hooks/useWorkspace';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function LocationSettings() {
  const { locations, addLocation, removeLocation } = useWorkspace();
  const wsLocations = locations();

  const [newName, setNewName] = useState('');
  const [newShort, setNewShort] = useState('');

  const handleAdd = () => {
    if (!newName.trim()) return;
    addLocation(newName.trim(), newShort.trim() || newName.trim().slice(0, 4).toUpperCase());
    setNewName('');
    setNewShort('');
  };

  return (
    <div className="glass-card rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <MapPin className="w-4 h-4 text-blue-400" />
        Locations ({wsLocations.length})
      </div>

      {/* Existing locations */}
      <div className="space-y-1.5">
        {wsLocations.map(loc => (
          <div key={loc.id} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5">
            <span className="flex-1 text-sm">{loc.name}</span>
            <span className="text-xs text-muted-foreground font-mono">{loc.shortName}</span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => {
                if (confirm(`Remove "${loc.name}"? Assets at this location won't be deleted.`)) {
                  removeLocation(loc.id);
                }
              }}
              className="h-6 w-6 text-muted-foreground hover:text-rose-400"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        ))}

        {wsLocations.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No locations yet</p>
        )}
      </div>

      {/* Add new */}
      <div className="flex gap-2">
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Location name"
          className="flex-1"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Input
          value={newShort}
          onChange={(e) => setNewShort(e.target.value)}
          placeholder="Short"
          className="w-20"
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <Button onClick={handleAdd} size="sm" disabled={!newName.trim()} className="gap-1">
          <Plus className="w-3.5 h-3.5" />
          Add
        </Button>
      </div>
    </div>
  );
}
