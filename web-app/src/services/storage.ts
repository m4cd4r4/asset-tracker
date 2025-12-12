import type { Asset, SANRecord, SANReturn, TransactionLog, LocationId } from '@/types';

const STORAGE_KEYS = {
  ASSETS: 'euc_assets',
  SANS: 'euc_sans',
  RETURNS: 'euc_returns',
  TRANSACTIONS: 'euc_transactions',
};

// Default inventory items
const DEFAULT_ITEMS = [
  'G8', 'G9', 'G10', 'Monitor', 'Keyboard', 'Mouse',
  'Headset', 'Webcam', 'Docking Station', 'Power Adapter',
  'USB-C Cable', 'HDMI Cable', 'Laptop Bag'
];

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function getDefaultAssets(location: LocationId): Asset[] {
  return DEFAULT_ITEMS.map(item => ({
    id: generateId(),
    item,
    lastCount: 0,
    newCount: 0,
    threshold: 10,
    location,
  }));
}

// Local Storage Operations
export const storage = {
  // Assets
  getAssets(location: LocationId): Asset[] {
    const data = localStorage.getItem(STORAGE_KEYS.ASSETS);
    if (!data) {
      const defaults = getDefaultAssets(location);
      this.saveAssets(defaults);
      return defaults.filter(a => a.location === location);
    }
    const assets: Asset[] = JSON.parse(data);
    const locationAssets = assets.filter(a => a.location === location);
    if (locationAssets.length === 0) {
      const defaults = getDefaultAssets(location);
      this.saveAssets([...assets, ...defaults]);
      return defaults;
    }
    return locationAssets;
  },

  getAllAssets(): Asset[] {
    const data = localStorage.getItem(STORAGE_KEYS.ASSETS);
    return data ? JSON.parse(data) : [];
  },

  saveAssets(assets: Asset[]): void {
    localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(assets));
  },

  updateAsset(asset: Asset): void {
    const all = this.getAllAssets();
    const idx = all.findIndex(a => a.id === asset.id);
    if (idx >= 0) {
      all[idx] = asset;
    } else {
      all.push(asset);
    }
    this.saveAssets(all);
  },

  // SAN Records
  getSANRecords(): SANRecord[] {
    const data = localStorage.getItem(STORAGE_KEYS.SANS);
    return data ? JSON.parse(data) : [];
  },

  saveSANRecords(records: SANRecord[]): void {
    localStorage.setItem(STORAGE_KEYS.SANS, JSON.stringify(records));
  },

  addSANRecord(record: SANRecord): boolean {
    const records = this.getSANRecords();
    if (records.some(r => r.sanNumber === record.sanNumber)) {
      return false; // Duplicate
    }
    records.push(record);
    this.saveSANRecords(records);
    return true;
  },

  removeSANRecord(sanNumber: string): boolean {
    const records = this.getSANRecords();
    const idx = records.findIndex(r => r.sanNumber === sanNumber);
    if (idx < 0) return false;
    records.splice(idx, 1);
    this.saveSANRecords(records);
    return true;
  },

  isSANUnique(sanNumber: string): boolean {
    return !this.getSANRecords().some(r => r.sanNumber === sanNumber);
  },

  // SAN Returns
  getSANReturns(): SANReturn[] {
    const data = localStorage.getItem(STORAGE_KEYS.RETURNS);
    return data ? JSON.parse(data) : [];
  },

  saveSANReturns(returns: SANReturn[]): void {
    localStorage.setItem(STORAGE_KEYS.RETURNS, JSON.stringify(returns));
  },

  addSANReturn(returnRecord: Omit<SANReturn, 'id' | 'timestamp'>): SANReturn {
    const record: SANReturn = {
      ...returnRecord,
      id: generateId(),
      timestamp: new Date().toISOString(),
    };
    const returns = this.getSANReturns();
    returns.unshift(record);
    this.saveSANReturns(returns);
    return record;
  },

  // Transactions
  getTransactions(location?: LocationId): TransactionLog[] {
    const data = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    const transactions: TransactionLog[] = data ? JSON.parse(data) : [];
    if (location) {
      return transactions.filter(t => t.location === location);
    }
    return transactions;
  },

  addTransaction(transaction: Omit<TransactionLog, 'id' | 'timestamp'>): TransactionLog {
    const record: TransactionLog = {
      ...transaction,
      id: generateId(),
      timestamp: new Date().toISOString(),
    };
    const transactions = this.getTransactions();
    transactions.unshift(record);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
    return record;
  },

  // Threshold checks
  getLowStockItems(): Asset[] {
    return this.getAllAssets().filter(a => a.newCount < a.threshold);
  },

  // Export/Import
  exportData(): string {
    return JSON.stringify({
      assets: this.getAllAssets(),
      sans: this.getSANRecords(),
      returns: this.getSANReturns(),
      transactions: this.getTransactions(),
      exportedAt: new Date().toISOString(),
    }, null, 2);
  },

  importData(jsonString: string): boolean {
    try {
      const data = JSON.parse(jsonString);
      if (data.assets) this.saveAssets(data.assets);
      if (data.sans) this.saveSANRecords(data.sans);
      if (data.returns) this.saveSANReturns(data.returns);
      if (data.transactions) {
        localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(data.transactions));
      }
      return true;
    } catch {
      return false;
    }
  },

  clearAll(): void {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  },
};
