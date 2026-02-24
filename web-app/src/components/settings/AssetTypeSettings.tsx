import { useState } from 'react';
import { Plus, Trash2, Tag } from 'lucide-react';
import { useWorkspace } from '@/hooks/useWorkspace';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AssetTypeSettings() {
  const { assetTypes, addAssetType, removeAssetType, assetNumberConfig } = useWorkspace();
  const types = assetTypes();
  const anConfig = assetNumberConfig();

  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [requiresAN, setRequiresAN] = useState(false);

  const handleAdd = () => {
    if (!newName.trim()) return;
    addAssetType(newName.trim(), requiresAN, newCategory.trim() || undefined);
    setNewName('');
    setNewCategory('');
    setRequiresAN(false);
  };

  const categories = [...new Set(types.map(t => t.category).filter(Boolean))];

  return (
    <div className="glass-card rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Tag className="w-4 h-4 text-violet-400" />
        Asset Types ({types.length})
      </div>

      {/* Existing types grouped by category */}
      <div className="space-y-3">
        {categories.length > 0 ? (
          categories.map(cat => (
            <div key={cat}>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 mb-1">{cat}</p>
              <div className="space-y-1">
                {types.filter(t => t.category === cat).map(t => (
                  <div key={t.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                    <span className="flex-1 text-sm">{t.name}</span>
                    {t.requiresAssetNumber && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400">
                        {anConfig.displayName}
                      </span>
                    )}
                    <Button
                      variant="ghost"
                      size="icon-sm"
                      onClick={() => {
                        if (confirm(`Remove "${t.name}"?`)) removeAssetType(t.id);
                      }}
                      className="h-6 w-6 text-muted-foreground hover:text-rose-400"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="space-y-1">
            {types.map(t => (
              <div key={t.id} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5">
                <span className="flex-1 text-sm">{t.name}</span>
                {t.requiresAssetNumber && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400">
                    {anConfig.displayName}
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => {
                    if (confirm(`Remove "${t.name}"?`)) removeAssetType(t.id);
                  }}
                  className="h-6 w-6 text-muted-foreground hover:text-rose-400"
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {types.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">No asset types defined</p>
        )}
      </div>

      {/* Add new */}
      <div className="space-y-2">
        <div className="flex gap-2">
          <Input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Type name"
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          />
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category"
            className="w-32"
            list="categories"
          />
          <datalist id="categories">
            {categories.map(c => <option key={c} value={c!} />)}
          </datalist>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={requiresAN}
              onChange={(e) => setRequiresAN(e.target.checked)}
              className="rounded border-border"
            />
            Requires {anConfig.displayName}
          </label>
          <Button onClick={handleAdd} size="sm" disabled={!newName.trim()} className="gap-1">
            <Plus className="w-3.5 h-3.5" />
            Add Type
          </Button>
        </div>
      </div>
    </div>
  );
}
