import { useState } from 'react';
import { Package, Sparkles, ArrowRight, Plus, MapPin } from 'lucide-react';
import { useWorkspace } from '@/hooks/useWorkspace';
import { PERTH_IT_PRESET, BLANK_PRESET } from '@/data/presets';
import { storage } from '@/services/storage';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface SetupWizardProps {
  onComplete: () => void;
}

export function SetupWizard({ onComplete }: SetupWizardProps) {
  const { loadPreset, addLocation } = useWorkspace();
  const [mode, setMode] = useState<'choose' | 'fresh'>('choose');
  const [name, setName] = useState('');
  const [firstLocation, setFirstLocation] = useState('');
  const [firstLocationShort, setFirstLocationShort] = useState('');

  const handleLoadDemo = () => {
    loadPreset({ ...PERTH_IT_PRESET.config, createdAt: new Date().toISOString() });
    storage.seedDemoData();
    onComplete();
  };

  const handleStartFresh = () => {
    if (!name.trim() || !firstLocation.trim()) return;

    const config = {
      ...BLANK_PRESET.config,
      name: name.trim(),
      createdAt: new Date().toISOString(),
    };
    loadPreset(config);

    addLocation(
      firstLocation.trim(),
      firstLocationShort.trim() || firstLocation.trim().slice(0, 4).toUpperCase()
    );

    onComplete();
  };

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Asset Tracker</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track inventory across your locations
          </p>
        </div>

        {mode === 'choose' && (
          <div className="space-y-3">
            {/* Load Demo */}
            <button
              onClick={handleLoadDemo}
              className="w-full glass-card rounded-xl p-5 text-left hover:bg-white/10 transition-all group border border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-500/15 flex items-center justify-center shrink-0 group-hover:bg-amber-500/25 transition-colors">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">Load Demo</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Perth IT inventory with 56 assets across 5 locations
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-foreground/70 transition-colors mt-1" />
              </div>
            </button>

            {/* Start Fresh */}
            <button
              onClick={() => setMode('fresh')}
              className="w-full glass-card rounded-xl p-5 text-left hover:bg-white/10 transition-all group border border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0 group-hover:bg-blue-500/25 transition-colors">
                  <Plus className="w-5 h-5 text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">Start Fresh</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Create your own workspace with custom locations and asset types
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground/50 group-hover:text-foreground/70 transition-colors mt-1" />
              </div>
            </button>
          </div>
        )}

        {mode === 'fresh' && (
          <div className="glass-card rounded-xl p-6 border border-white/10">
            <h2 className="font-semibold text-foreground mb-4">New Workspace</h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Workspace Name</label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. London Office IT, Lab Equipment"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                  <MapPin className="w-3 h-3 inline mr-1" />
                  First Location
                </label>
                <div className="flex gap-2">
                  <Input
                    value={firstLocation}
                    onChange={(e) => setFirstLocation(e.target.value)}
                    placeholder="e.g. Main Warehouse"
                    className="flex-1"
                  />
                  <Input
                    value={firstLocationShort}
                    onChange={(e) => setFirstLocationShort(e.target.value)}
                    placeholder="Short"
                    className="w-20"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground/70 mt-1">
                  You can add more locations later in Settings
                </p>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button variant="outline" onClick={() => setMode('choose')} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleStartFresh}
                disabled={!name.trim() || !firstLocation.trim()}
                className="flex-1"
              >
                Create Workspace
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
