export interface WorkspaceConfig {
  version: 1;
  name: string;
  createdAt: string;
  locations: WorkspaceLocation[];
  assetTypes: AssetTypeConfig[];
  assetNumberConfig: AssetNumberConfig;
}

export interface WorkspaceLocation {
  id: string;
  name: string;
  shortName: string;
}

export interface AssetTypeConfig {
  id: string;
  name: string;
  category?: string;
  requiresAssetNumber: boolean;
}

export interface AssetNumberConfig {
  displayName: string;
  pattern: string;
  ocrPattern: string;
  prefix?: string;
  placeholder: string;
  description: string;
}
