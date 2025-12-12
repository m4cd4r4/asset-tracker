// Asset and inventory types
export interface Asset {
  id: string;
  item: string;
  lastCount: number;
  newCount: number;
  threshold: number;
  location: LocationId;
}

export interface SANRecord {
  sanNumber: string;
  item: string;
  timestamp: string;
  location: LocationId;
}

export interface SANReturn {
  id: string;
  sanNumber: string;
  generation: Generation;
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
  location: LocationId;
}

export type LocationId = 'basement-4.2' | 'build-room' | 'darwin' | 'level-17' | 'basement-4.3';

export type Generation = 'G5' | 'G6' | 'G7' | 'G8' | 'G9' | 'G10' | 'G11';

export interface Location {
  id: LocationId;
  name: string;
  shortName: string;
}

export const LOCATIONS: Location[] = [
  { id: 'basement-4.2', name: 'Basement 4.2', shortName: '4.2' },
  { id: 'build-room', name: 'Build Room', shortName: 'BR' },
  { id: 'darwin', name: 'Darwin', shortName: 'DRW' },
  { id: 'level-17', name: 'Level 17', shortName: 'L17' },
  { id: 'basement-4.3', name: 'Basement 4.3', shortName: '4.3' },
];

export const SAN_REQUIRED_ITEMS = ['G8', 'G9', 'G10'];

export const GENERATIONS: Generation[] = ['G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11'];

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
  currentLocation: LocationId;
  assets: Asset[];
  sanRecords: SANRecord[];
  sanReturns: SANReturn[];
  transactions: TransactionLog[];
  isLoading: boolean;
  error: string | null;
}
