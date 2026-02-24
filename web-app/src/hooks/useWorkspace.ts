import { create } from 'zustand';
import type { WorkspaceConfig, WorkspaceLocation, AssetTypeConfig, AssetNumberConfig } from '@/types/workspace';
import { workspace } from '@/services/workspace';

interface WorkspaceStore {
  config: WorkspaceConfig | null;
  isReady: boolean;

  // Initialize
  init: () => void;
  loadPreset: (config: WorkspaceConfig) => void;

  // Config accessors
  locations: () => WorkspaceLocation[];
  assetTypes: () => AssetTypeConfig[];
  assetNumberConfig: () => AssetNumberConfig;
  requiresAssetNumber: (itemName: string) => boolean;
  findLocation: (id: string) => WorkspaceLocation | undefined;

  // Mutations
  addLocation: (name: string, shortName: string) => WorkspaceLocation;
  updateLocation: (id: string, updates: Partial<Omit<WorkspaceLocation, 'id'>>) => void;
  removeLocation: (id: string) => void;

  addAssetType: (name: string, requiresAssetNumber: boolean, category?: string) => AssetTypeConfig;
  updateAssetType: (id: string, updates: Partial<Omit<AssetTypeConfig, 'id'>>) => void;
  removeAssetType: (id: string) => void;

  updateAssetNumberConfig: (updates: Partial<AssetNumberConfig>) => void;
  updateName: (name: string) => void;

  reset: () => void;
}

export const useWorkspace = create<WorkspaceStore>((set, get) => ({
  config: null,
  isReady: false,

  init: () => {
    const config = workspace.getConfig();
    set({ config, isReady: true });
  },

  loadPreset: (config) => {
    workspace.saveConfig(config);
    set({ config });
  },

  locations: () => get().config?.locations ?? [],
  assetTypes: () => get().config?.assetTypes ?? [],
  assetNumberConfig: () =>
    get().config?.assetNumberConfig ?? {
      displayName: 'Asset Number',
      pattern: '^\\d{5,6}$',
      ocrPattern: '\\b(\\d{5,6})\\b',
      placeholder: 'e.g. 12345',
      description: '5-6 digit number',
    },

  requiresAssetNumber: (itemName) => {
    const types = get().config?.assetTypes ?? [];
    const match = types.find(t => t.name === itemName);
    return match?.requiresAssetNumber ?? false;
  },

  findLocation: (id) => get().config?.locations.find(l => l.id === id),

  addLocation: (name, shortName) => {
    const loc = workspace.addLocation(name, shortName);
    set({ config: workspace.getConfig() });
    return loc;
  },

  updateLocation: (id, updates) => {
    workspace.updateLocation(id, updates);
    set({ config: workspace.getConfig() });
  },

  removeLocation: (id) => {
    workspace.removeLocation(id);
    set({ config: workspace.getConfig() });
  },

  addAssetType: (name, requiresAssetNumber, category) => {
    const type = workspace.addAssetType(name, requiresAssetNumber, category);
    set({ config: workspace.getConfig() });
    return type;
  },

  updateAssetType: (id, updates) => {
    workspace.updateAssetType(id, updates);
    set({ config: workspace.getConfig() });
  },

  removeAssetType: (id) => {
    workspace.removeAssetType(id);
    set({ config: workspace.getConfig() });
  },

  updateAssetNumberConfig: (updates) => {
    workspace.updateAssetNumberConfig(updates);
    set({ config: workspace.getConfig() });
  },

  updateName: (name) => {
    workspace.updateName(name);
    set({ config: workspace.getConfig() });
  },

  reset: () => {
    workspace.deleteConfig();
    set({ config: null });
  },
}));
