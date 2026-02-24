import { create } from 'zustand';
import type { Asset, SANRecord, SANReturn, TransactionLog } from '@/types';
import { storage } from '@/services/storage';
import { workspace } from '@/services/workspace';

interface Store {
  // State
  currentLocation: string;
  assets: Asset[];
  sanRecords: SANRecord[];
  sanReturns: SANReturn[];
  transactions: TransactionLog[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setLocation: (location: string) => void;
  loadData: () => void;

  // Inventory actions
  updateAssetCount: (
    assetId: string,
    operation: 'add' | 'subtract',
    quantity: number,
    sanNumbers?: string[]
  ) => { success: boolean; error?: string };

  updateThreshold: (assetId: string, threshold: number) => void;

  addAsset: (item: string, location: string, threshold?: number) => Asset;

  // SAN actions
  addSANReturn: (data: Omit<SANReturn, 'id' | 'timestamp'>) => SANReturn;

  // Utility
  getLowStockItems: () => Asset[];
  clearError: () => void;
}

export const useStore = create<Store>((set, get) => ({
  currentLocation: '',
  assets: [],
  sanRecords: [],
  sanReturns: [],
  transactions: [],
  isLoading: false,
  error: null,

  setLocation: (location) => {
    set({ currentLocation: location });
    get().loadData();
  },

  loadData: () => {
    set({ isLoading: true, error: null });
    try {
      let { currentLocation } = get();

      // Default to first location from workspace config if unset
      if (!currentLocation) {
        const locations = workspace.getLocations();
        currentLocation = locations[0]?.id ?? '';
        set({ currentLocation });
      }

      const assets = storage.getAssets(currentLocation);
      const sanRecords = storage.getSANRecords();
      const sanReturns = storage.getSANReturns();
      const transactions = storage.getTransactions(currentLocation);

      set({
        assets,
        sanRecords,
        sanReturns,
        transactions,
        isLoading: false,
      });
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : 'Failed to load data',
        isLoading: false,
      });
    }
  },

  updateAssetCount: (assetId, operation, quantity, sanNumbers) => {
    const { assets, currentLocation } = get();
    const asset = assets.find(a => a.id === assetId);

    if (!asset) {
      return { success: false, error: 'Asset not found' };
    }

    const sanRequired = workspace.requiresAssetNumber(asset.item);

    if (sanRequired && operation === 'add') {
      if (!sanNumbers || sanNumbers.length !== quantity) {
        const displayName = workspace.getAssetNumberConfig().displayName;
        return { success: false, error: `Please provide ${quantity} ${displayName} number(s)` };
      }

      for (const san of sanNumbers) {
        if (!storage.isSANUnique(san)) {
          return { success: false, error: `${san} already exists in system` };
        }
        if (!workspace.validateAssetNumber(san)) {
          const { description } = workspace.getAssetNumberConfig();
          return { success: false, error: `${san} is invalid (${description})` };
        }
      }

      for (const san of sanNumbers) {
        storage.addSANRecord({
          sanNumber: san,
          item: asset.item,
          timestamp: new Date().toISOString(),
          location: currentLocation,
        });
      }
    }

    if (sanRequired && operation === 'subtract') {
      if (!sanNumbers || sanNumbers.length !== quantity) {
        const displayName = workspace.getAssetNumberConfig().displayName;
        return { success: false, error: `Please provide ${quantity} ${displayName} number(s) to remove` };
      }

      const existingSANs = storage.getSANRecords();
      for (const san of sanNumbers) {
        const record = existingSANs.find(r => r.sanNumber === san);
        if (!record) {
          return { success: false, error: `${san} not found in system` };
        }
        if (record.item !== asset.item) {
          return { success: false, error: `${san} belongs to ${record.item}, not ${asset.item}` };
        }
      }

      for (const san of sanNumbers) {
        storage.removeSANRecord(san);
      }
    }

    const newCount = operation === 'add'
      ? asset.newCount + quantity
      : Math.max(0, asset.newCount - quantity);

    const updatedAsset: Asset = {
      ...asset,
      lastCount: asset.newCount,
      newCount,
    };

    storage.updateAsset(updatedAsset);

    storage.addTransaction({
      item: asset.item,
      action: operation,
      volume: quantity,
      location: currentLocation,
      sanNumber: sanNumbers?.join(', '),
    });

    get().loadData();
    return { success: true };
  },

  updateThreshold: (assetId, threshold) => {
    const { assets } = get();
    const asset = assets.find(a => a.id === assetId);
    if (asset) {
      storage.updateAsset({ ...asset, threshold });
      get().loadData();
    }
  },

  addAsset: (item, location, threshold = 10) => {
    const asset: Asset = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      item,
      lastCount: 0,
      newCount: 0,
      threshold,
      location,
    };
    storage.updateAsset(asset);
    get().loadData();
    return asset;
  },

  addSANReturn: (data) => {
    const record = storage.addSANReturn(data);
    get().loadData();
    return record;
  },

  getLowStockItems: () => {
    return storage.getLowStockItems();
  },

  clearError: () => set({ error: null }),
}));
