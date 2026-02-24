import { useState } from 'react';
import { Settings, RotateCcw } from 'lucide-react';
import { useWorkspace } from '@/hooks/useWorkspace';
import { storage } from '@/services/storage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function WorkspaceSettings() {
  const { config, updateName, reset } = useWorkspace();
  const [name, setName] = useState(config?.name ?? '');
  const [dirty, setDirty] = useState(false);

  const handleSave = () => {
    updateName(name.trim());
    setDirty(false);
  };

  const handleReset = () => {
    if (confirm('Reset everything? All data and settings will be deleted. This cannot be undone.')) {
      storage.clearAll();
      reset();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-4">
      <div className="glass-card rounded-xl p-4 space-y-4">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Settings className="w-4 h-4 text-slate-400" />
          Workspace
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Name</label>
          <Input
            value={name}
            onChange={(e) => { setName(e.target.value); setDirty(true); }}
            placeholder="My Workspace"
          />
        </div>

        {config && (
          <p className="text-[10px] text-muted-foreground/60">
            Created: {new Date(config.createdAt).toLocaleDateString()}
          </p>
        )}

        {dirty && (
          <Button onClick={handleSave} size="sm">
            Save Name
          </Button>
        )}
      </div>

      {/* Danger zone */}
      <div className="glass-card rounded-xl p-4 border border-rose-500/20">
        <h3 className="text-sm font-medium text-rose-400 mb-2">Danger Zone</h3>
        <p className="text-xs text-muted-foreground mb-3">
          This will delete all workspace settings and inventory data.
        </p>
        <Button variant="outline" size="sm" onClick={handleReset} className="text-rose-400 border-rose-500/30 hover:bg-rose-500/10">
          <RotateCcw className="w-3 h-3 mr-1.5" />
          Reset Everything
        </Button>
      </div>
    </div>
  );
}
