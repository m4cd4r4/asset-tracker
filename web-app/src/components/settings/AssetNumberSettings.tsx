import { useState, useEffect } from 'react';
import { Hash, Check, X } from 'lucide-react';
import { useWorkspace } from '@/hooks/useWorkspace';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function AssetNumberSettings() {
  const { assetNumberConfig, updateAssetNumberConfig } = useWorkspace();
  const config = assetNumberConfig();

  const [displayName, setDisplayName] = useState(config.displayName);
  const [pattern, setPattern] = useState(config.pattern);
  const [ocrPattern, setOcrPattern] = useState(config.ocrPattern);
  const [placeholder, setPlaceholder] = useState(config.placeholder);
  const [description, setDescription] = useState(config.description);
  const [prefix, setPrefix] = useState(config.prefix ?? '');
  const [testValue, setTestValue] = useState('');
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const c = assetNumberConfig();
    setDisplayName(c.displayName);
    setPattern(c.pattern);
    setOcrPattern(c.ocrPattern);
    setPlaceholder(c.placeholder);
    setDescription(c.description);
    setPrefix(c.prefix ?? '');
  }, []);

  const testResult = (() => {
    if (!testValue) return null;
    try {
      return new RegExp(pattern).test(testValue);
    } catch {
      return null;
    }
  })();

  const handleSave = () => {
    updateAssetNumberConfig({
      displayName: displayName.trim() || 'Asset Number',
      pattern,
      ocrPattern,
      placeholder,
      description,
      prefix: prefix.trim() || undefined,
    });
    setDirty(false);
  };

  const markDirty = <T,>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setDirty(true);
  };

  return (
    <div className="glass-card rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium text-foreground">
        <Hash className="w-4 h-4 text-emerald-400" />
        Asset Number Format
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Display Name</label>
          <Input
            value={displayName}
            onChange={(e) => markDirty(setDisplayName)(e.target.value)}
            placeholder="SAN"
          />
          <p className="text-[10px] text-muted-foreground/60 mt-0.5">
            Shown in labels, e.g. "SAN", "Asset Tag"
          </p>
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Prefix (optional)</label>
          <Input
            value={prefix}
            onChange={(e) => markDirty(setPrefix)(e.target.value)}
            placeholder="e.g. SAN-"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">Validation Pattern (regex)</label>
        <Input
          value={pattern}
          onChange={(e) => markDirty(setPattern)(e.target.value)}
          placeholder="^\d{5,6}$"
          className="font-mono text-xs"
        />
        <p className="text-[10px] text-muted-foreground/60 mt-0.5">
          Regex to validate input, e.g. <code className="bg-white/5 px-1 rounded">^\d{'{5,6}'}$</code>
        </p>
      </div>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1 block">OCR Pattern (regex)</label>
        <Input
          value={ocrPattern}
          onChange={(e) => markDirty(setOcrPattern)(e.target.value)}
          placeholder="\b(\d{5,6})\b"
          className="font-mono text-xs"
        />
        <p className="text-[10px] text-muted-foreground/60 mt-0.5">
          Pattern to extract asset numbers from OCR text
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Placeholder</label>
          <Input
            value={placeholder}
            onChange={(e) => markDirty(setPlaceholder)(e.target.value)}
            placeholder="e.g. 12345"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1 block">Description</label>
          <Input
            value={description}
            onChange={(e) => markDirty(setDescription)(e.target.value)}
            placeholder="5-6 digit number"
          />
        </div>
      </div>

      {/* Live test */}
      <div className="rounded-lg bg-white/5 p-3">
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Test Validation</label>
        <div className="flex items-center gap-2">
          <Input
            value={testValue}
            onChange={(e) => setTestValue(e.target.value)}
            placeholder={placeholder}
            className="flex-1"
          />
          {testResult !== null && (
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
              testResult ? 'bg-emerald-500/20' : 'bg-rose-500/20'
            }`}>
              {testResult
                ? <Check className="w-3.5 h-3.5 text-emerald-400" />
                : <X className="w-3.5 h-3.5 text-rose-400" />
              }
            </div>
          )}
        </div>
      </div>

      {dirty && (
        <Button onClick={handleSave} className="w-full">
          Save Changes
        </Button>
      )}
    </div>
  );
}
