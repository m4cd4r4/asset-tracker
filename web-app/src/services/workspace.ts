import type { WorkspaceConfig, WorkspaceLocation, AssetTypeConfig, AssetNumberConfig } from '@/types/workspace';

const STORAGE_KEY = 'euc_workspace_config';

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export const workspace = {
  getConfig(): WorkspaceConfig | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  },

  saveConfig(config: WorkspaceConfig): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  },

  hasConfig(): boolean {
    return localStorage.getItem(STORAGE_KEY) !== null;
  },

  hasLegacyData(): boolean {
    return localStorage.getItem('euc_assets') !== null;
  },

  deleteConfig(): void {
    localStorage.removeItem(STORAGE_KEY);
  },

  // Location helpers
  getLocations(): WorkspaceLocation[] {
    return this.getConfig()?.locations ?? [];
  },

  findLocation(id: string): WorkspaceLocation | undefined {
    return this.getLocations().find(l => l.id === id);
  },

  addLocation(name: string, shortName: string): WorkspaceLocation {
    const config = this.getConfig()!;
    const loc: WorkspaceLocation = { id: slugify(name), name, shortName };
    config.locations.push(loc);
    this.saveConfig(config);
    return loc;
  },

  updateLocation(id: string, updates: Partial<Omit<WorkspaceLocation, 'id'>>): void {
    const config = this.getConfig()!;
    const idx = config.locations.findIndex(l => l.id === id);
    if (idx >= 0) {
      config.locations[idx] = { ...config.locations[idx], ...updates };
      this.saveConfig(config);
    }
  },

  removeLocation(id: string): void {
    const config = this.getConfig()!;
    config.locations = config.locations.filter(l => l.id !== id);
    this.saveConfig(config);
  },

  // Asset type helpers
  getAssetTypes(): AssetTypeConfig[] {
    return this.getConfig()?.assetTypes ?? [];
  },

  findAssetType(id: string): AssetTypeConfig | undefined {
    return this.getAssetTypes().find(t => t.id === id);
  },

  requiresAssetNumber(itemName: string): boolean {
    const types = this.getAssetTypes();
    const match = types.find(t => t.name === itemName);
    return match?.requiresAssetNumber ?? false;
  },

  addAssetType(name: string, requiresAssetNumber: boolean, category?: string): AssetTypeConfig {
    const config = this.getConfig()!;
    const type: AssetTypeConfig = { id: slugify(name), name, requiresAssetNumber, category };
    config.assetTypes.push(type);
    this.saveConfig(config);
    return type;
  },

  updateAssetType(id: string, updates: Partial<Omit<AssetTypeConfig, 'id'>>): void {
    const config = this.getConfig()!;
    const idx = config.assetTypes.findIndex(t => t.id === id);
    if (idx >= 0) {
      config.assetTypes[idx] = { ...config.assetTypes[idx], ...updates };
      this.saveConfig(config);
    }
  },

  removeAssetType(id: string): void {
    const config = this.getConfig()!;
    config.assetTypes = config.assetTypes.filter(t => t.id !== id);
    this.saveConfig(config);
  },

  // Asset number config
  getAssetNumberConfig(): AssetNumberConfig {
    return this.getConfig()?.assetNumberConfig ?? {
      displayName: 'Asset Number',
      pattern: '^\\d{5,6}$',
      ocrPattern: '\\b(\\d{5,6})\\b',
      placeholder: 'e.g. 12345',
      description: '5-6 digit number',
    };
  },

  updateAssetNumberConfig(updates: Partial<AssetNumberConfig>): void {
    const config = this.getConfig()!;
    config.assetNumberConfig = { ...config.assetNumberConfig, ...updates };
    this.saveConfig(config);
  },

  validateAssetNumber(value: string): boolean {
    const { pattern } = this.getAssetNumberConfig();
    return new RegExp(pattern).test(value);
  },

  // Workspace name
  updateName(name: string): void {
    const config = this.getConfig()!;
    config.name = name;
    this.saveConfig(config);
  },

  // Migration: create Perth config from legacy data
  migrateFromLegacy(presetConfig: WorkspaceConfig): void {
    this.saveConfig(presetConfig);
  },
};
