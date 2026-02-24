// Asset and inventory types
export interface Asset {
  id: string;
  item: string;
  lastCount: number;
  newCount: number;
  threshold: number;
  location: string;
}

export interface SANRecord {
  sanNumber: string;
  item: string;
  timestamp: string;
  location: string;
}

export interface SANReturn {
  id: string;
  sanNumber: string;
  generation: string;
  returnedBy: string;
  returnedTo: string;
  notes: string;
  timestamp: string;
}

export interface TransactionLog {
  id: string;
  timestamp: string;
  item: string;
  action: 'add' | 'subtract';
  sanNumber?: string;
  volume: number;
  location: string;
}

export interface Location {
  id: string;
  name: string;
  shortName: string;
}

// Barcode scanning types
export interface ScanResult {
  text: string;
  format: string;
  timestamp: Date;
}

// Box counting types
export interface BoxDetection {
  count: number;
  confidence: number;
  boundingBoxes: BoundingBox[];
}

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
  confidence: number;
}

// App state
export interface AppState {
  currentLocation: string;
  assets: Asset[];
  sanRecords: SANRecord[];
  sanReturns: SANReturn[];
  transactions: TransactionLog[];
  isLoading: boolean;
  error: string | null;
}
