import { create } from 'zustand';
import type { Asset, SANRecord, SANReturn, TransactionLog, LocationId } from '@/types';
import { storage } from '@/services/storage';

interface Store {
  // State
  currentLocation: LocationId;
  assets: Asset[];
  sanRecords: SANRecord[];
  sanReturns: SANReturn[];
  transactions: TransactionLog[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setLocation: (location: LocationId) => void;
  loadData: () => void;

  // Inventory actions
  updateAssetCount: (
    assetId: string,
    operation: 'add' | 'subtract',
    quantity: number,
    sanNumbers?: string[]
  ) => { success: boolean; error?: string };

  updateThreshold: (assetId: string, threshold: number) => void;

  // SAN actions
  addSANReturn: (data: Omit<SANReturn, 'id' | 'timestamp'>) => SANReturn;

  // Utility
  getLowStockItems: () => Asset[];
  clearError: () => void;
}

export const useStore = create<Store>((set, get) => ({
  currentLocation: 'basement-4.2',
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
      const { currentLocation } = get();
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

    // Check if SAN is required for this item
    const sanRequired = ['G8', 'G9', 'G10'].includes(asset.item);

    if (sanRequired && operation === 'add') {
      if (!sanNumbers || sanNumbers.length !== quantity) {
        return { success: false, error: `Please provide ${quantity} SAN number(s)` };
      }

      // Validate all SANs are unique
      for (const san of sanNumbers) {
        if (!storage.isSANUnique(san)) {
          return { success: false, error: `SAN ${san} already exists in system` };
        }
        if (!/^\d{5,6}$/.test(san)) {
          return { success: false, error: `SAN ${san} must be 5-6 digits` };
        }
      }

      // Add SAN records
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
        return { success: false, error: `Please provide ${quantity} SAN number(s) to remove` };
      }

      // Validate SANs exist and match item type
      const existingSANs = storage.getSANRecords();
      for (const san of sanNumbers) {
        const record = existingSANs.find(r => r.sanNumber === san);
        if (!record) {
          return { success: false, error: `SAN ${san} not found in system` };
        }
        if (record.item !== asset.item) {
          return { success: false, error: `SAN ${san} belongs to ${record.item}, not ${asset.item}` };
        }
      }

      // Remove SAN records
      for (const san of sanNumbers) {
        storage.removeSANRecord(san);
      }
    }

    // Update asset count
    const newCount = operation === 'add'
      ? asset.newCount + quantity
      : Math.max(0, asset.newCount - quantity);

    const updatedAsset: Asset = {
      ...asset,
      lastCount: asset.newCount,
      newCount,
    };

    storage.updateAsset(updatedAsset);

    // Log transaction
    storage.addTransaction({
      item: asset.item,
      action: operation,
      volume: quantity,
      location: currentLocation,
      sanNumber: sanNumbers?.join(', '),
    });

    // Reload data
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
