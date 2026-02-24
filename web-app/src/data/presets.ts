import type { WorkspaceConfig, WorkspaceLocation, AssetTypeConfig, AssetNumberConfig } from '@/types/workspace';

const PERTH_LOCATIONS: WorkspaceLocation[] = [
  { id: 'basement-4.2', name: 'Basement 4.2', shortName: '4.2' },
  { id: 'build-room', name: 'Build Room', shortName: 'BR' },
  { id: 'darwin', name: 'Darwin', shortName: 'DRW' },
  { id: 'level-17', name: 'Level 17', shortName: 'L17' },
  { id: 'basement-4.3', name: 'Basement 4.3', shortName: '4.3' },
];

const PERTH_ASSET_TYPES: AssetTypeConfig[] = [
  { id: 'desktop-mini-g9', name: 'Desktop Mini G9', category: 'Desktops', requiresAssetNumber: true },
  { id: 'laptop-840-g10', name: 'Laptop 840 G10', category: 'Laptops', requiresAssetNumber: true },
  { id: 'laptop-840-g9', name: 'Laptop 840 G9', category: 'Laptops', requiresAssetNumber: true },
  { id: 'laptop-840-g6', name: 'Laptop 840 G6', category: 'Laptops', requiresAssetNumber: false },
  { id: 'laptop-x360-g8', name: 'Laptop x360 G8', category: 'Laptops', requiresAssetNumber: true },
  { id: 'dock-thunderbolt-slim', name: 'Dock Thunderbolt Slim', category: 'Docks', requiresAssetNumber: false },
  { id: 'dock-thunderbolt-g2', name: 'Dock Thunderbolt G2', category: 'Docks', requiresAssetNumber: false },
  { id: 'dock-thunderbolt-g4', name: 'Dock Thunderbolt G4', category: 'Docks', requiresAssetNumber: false },
  { id: 'monitor-24', name: 'Monitor 24"', category: 'Monitors', requiresAssetNumber: false },
  { id: 'monitor-34-ultrawide', name: 'Monitor 34" Ultrawide', category: 'Monitors', requiresAssetNumber: false },
  { id: 'laptop-bag', name: 'Laptop Bag', category: 'Accessories', requiresAssetNumber: false },
  { id: 'laptop-charger', name: 'Laptop Charger', category: 'Accessories', requiresAssetNumber: false },
  { id: 'usb-dvd-rw-drive', name: 'USB DVD-RW Drive', category: 'Accessories', requiresAssetNumber: false },
  { id: 'wired-headset-poly', name: 'Wired Headset Poly', category: 'Peripherals', requiresAssetNumber: false },
  { id: 'wired-keyboard', name: 'Wired Keyboard', category: 'Peripherals', requiresAssetNumber: false },
  { id: 'wired-mouse', name: 'Wired Mouse', category: 'Peripherals', requiresAssetNumber: false },
  { id: 'wireless-headset-poly', name: 'Wireless Headset Poly', category: 'Peripherals', requiresAssetNumber: false },
  { id: 'wireless-kb-mouse', name: 'Wireless KB & Mouse', category: 'Peripherals', requiresAssetNumber: false },
];

const PERTH_ASSET_NUMBER: AssetNumberConfig = {
  displayName: 'SAN',
  pattern: '^\\d{5,6}$',
  ocrPattern: '\\b(\\d{5,6})\\b',
  placeholder: 'e.g. 12345',
  description: '5-6 digit serial asset number',
};

export const PERTH_IT_PRESET: { config: WorkspaceConfig } = {
  config: {
    version: 1,
    name: 'Perth IT Inventory',
    createdAt: new Date().toISOString(),
    locations: PERTH_LOCATIONS,
    assetTypes: PERTH_ASSET_TYPES,
    assetNumberConfig: PERTH_ASSET_NUMBER,
  },
};

const BLANK_ASSET_NUMBER: AssetNumberConfig = {
  displayName: 'Asset Number',
  pattern: '^[A-Za-z0-9\\-]{3,20}$',
  ocrPattern: '\\b([A-Za-z0-9\\-]{3,20})\\b',
  placeholder: 'e.g. A-001',
  description: 'Alphanumeric, 3-20 characters',
};

export const BLANK_PRESET: { config: WorkspaceConfig } = {
  config: {
    version: 1,
    name: '',
    createdAt: new Date().toISOString(),
    locations: [],
    assetTypes: [],
    assetNumberConfig: BLANK_ASSET_NUMBER,
  },
};
