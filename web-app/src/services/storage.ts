import type { Asset, SANRecord, SANReturn, TransactionLog } from '@/types';
import { seedData } from '@/data/seed';
import { workspace } from '@/services/workspace';

const STORAGE_KEYS = {
  ASSETS: 'euc_assets',
  SANS: 'euc_sans',
  RETURNS: 'euc_returns',
  TRANSACTIONS: 'euc_transactions',
  SEEDED: 'euc_seeded',
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function ensureSeeded(): void {
  if (localStorage.getItem(STORAGE_KEYS.SEEDED)) return;
  if (!workspace.hasConfig()) return;

  localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(seedData.assets));
  localStorage.setItem(STORAGE_KEYS.SANS, JSON.stringify(seedData.sans));
  localStorage.setItem(STORAGE_KEYS.RETURNS, JSON.stringify(seedData.returns));
  localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(seedData.transactions));
  localStorage.setItem(STORAGE_KEYS.SEEDED, '1');
}

export const storage = {
  seedDemoData(): void {
    localStorage.setItem(STORAGE_KEYS.ASSETS, JSON.stringify(seedData.assets));
    localStorage.setItem(STORAGE_KEYS.SANS, JSON.stringify(seedData.sans));
    localStorage.setItem(STORAGE_KEYS.RETURNS, JSON.stringify(seedData.returns));
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(seedData.transactions));
    localStorage.setItem(STORAGE_KEYS.SEEDED, '1');
  },

  getAssets(location: string): Asset[] {
    ensureSeeded();
    const data = localStorage.getItem(STORAGE_KEYS.ASSETS);
    if (!data) return [];
    const assets: Asset[] = JSON.parse(data);
    return assets.filter(a => a.location === location);
  },

  getAllAssets(): Asset[] {
    ensureSeeded();
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

  getSANRecords(): SANRecord[] {
    ensureSeeded();
    const data = localStorage.getItem(STORAGE_KEYS.SANS);
    return data ? JSON.parse(data) : [];
  },

  saveSANRecords(records: SANRecord[]): void {
    localStorage.setItem(STORAGE_KEYS.SANS, JSON.stringify(records));
  },

  addSANRecord(record: SANRecord): boolean {
    const records = this.getSANRecords();
    if (records.some(r => r.sanNumber === record.sanNumber)) {
      return false;
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

  getSANReturns(): SANReturn[] {
    ensureSeeded();
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

  getTransactions(location?: string): TransactionLog[] {
    ensureSeeded();
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

  getLowStockItems(): Asset[] {
    return this.getAllAssets().filter(a => a.newCount < a.threshold);
  },

  exportData(): string {
    const config = workspace.getConfig();
    return JSON.stringify({
      workspaceConfig: config,
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
      if (data.workspaceConfig) workspace.saveConfig(data.workspaceConfig);
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
    workspace.deleteConfig();
  },
};
