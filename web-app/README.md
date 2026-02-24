# Asset Tracker

A general-purpose, offline-first asset tracking PWA. Add your own locations, asset types, and define what an asset number looks like — then track inventory with full audit history, OCR scanning, barcode generation, and low-stock alerts.

![Dashboard](e2e/results/readme-light.png)

## Features

- **Customizable workspace** — define your own locations, asset types, and asset number format
- **Setup wizard** — "Load Demo" (Perth IT preset) or "Start Fresh" with your own config
- **Settings panel** — CRUD for locations, asset types, asset number config, workspace name
- **Add Item dialog** — create new inventory items from the dashboard
- **OCR scanning** — extract asset numbers from camera images in real time
- **Barcode/QR scanning** — via device camera or image upload
- **Quick-count** — box detection using TensorFlow.js
- **PWA** — installable on mobile/desktop, offline-first with localStorage
- **Transaction log** — full audit trail with timestamps
- **Low stock alerts** — configurable per-item thresholds
- **Dark mode** — system preference aware
- **Responsive** — full sidebar on desktop, bottom sheet on mobile

![Dark mode](e2e/results/readme-dark.png)

## Quick Start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build
```

## How It Works

### First Visit

On a fresh install you'll see the setup wizard:

- **Load Demo** — loads a Perth IT inventory preset (56 assets, 5 locations, G-series laptops + desktops) so you can explore the full feature set immediately
- **Start Fresh** — enter a workspace name, your first location, and optionally customise the asset number format

### Settings

Click **Settings** in the sidebar at any time to:

| Tab | What you can do |
|-----|----------------|
| Locations | Add / remove locations that appear in the sidebar and inventory |
| Asset Types | Add / remove device/item types, group by category, mark which require asset numbers |
| Asset Number | Change the display name ("SAN", "Asset Tag", "Serial"), regex pattern, OCR extraction pattern, prefix, and placeholder |
| Workspace | Rename the workspace or reset to factory defaults |

### Asset Number Config

The asset number system is fully configurable. The default Perth IT preset uses a 5–6 digit SAN:

| Field | Default |
|-------|---------|
| Display name | SAN |
| Pattern | `^\d{5,6}$` |
| OCR pattern | `\b\d{5,6}\b` |
| Placeholder | `e.g. 12345` |

You can change this to any format — barcodes, alphanumeric tags, serials, etc.

## Project Structure

```
web-app/
├── src/
│   ├── types/
│   │   ├── index.ts           # Core inventory types
│   │   └── workspace.ts       # WorkspaceConfig interfaces
│   ├── services/
│   │   ├── storage.ts         # localStorage CRUD + seed/export/import
│   │   └── workspace.ts       # Config CRUD, validation, migration helpers
│   ├── data/
│   │   ├── seed.ts            # Perth IT demo data (56 assets)
│   │   └── presets.ts         # PERTH_IT_PRESET + BLANK_PRESET
│   ├── hooks/
│   │   ├── useWorkspace.ts    # Zustand store for workspace config
│   │   ├── useOCRScanner.ts   # OCR extraction (dynamic pattern from config)
│   │   ├── useBarcodeScanner.ts
│   │   └── useBoxCounter.ts
│   ├── store/
│   │   └── useStore.ts        # Inventory state + actions
│   ├── components/
│   │   ├── SetupWizard.tsx    # First-run wizard
│   │   ├── AddAssetDialog.tsx # Add item dialog
│   │   ├── settings/
│   │   │   ├── SettingsPanel.tsx
│   │   │   ├── LocationSettings.tsx
│   │   │   ├── AssetTypeSettings.tsx
│   │   │   ├── AssetNumberSettings.tsx
│   │   │   └── WorkspaceSettings.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── InventoryTable.tsx
│   │   ├── SANInputModal.tsx
│   │   ├── SANReturnModal.tsx
│   │   ├── SANListDialog.tsx
│   │   ├── LowStockDialog.tsx
│   │   ├── InventoryChart.tsx
│   │   ├── KPICards.tsx
│   │   ├── BarcodeScanner.tsx
│   │   └── BoxCounter.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── landing/                   # Static landing page
├── e2e/                       # Playwright E2E tests
│   ├── helpers/demo-config.ts # Test fixture
│   ├── full-inspection.spec.ts
│   ├── setup-wizard.spec.ts
│   ├── settings.spec.ts
│   └── v2-features.spec.ts
└── public/                    # Icons, manifest
```

## Testing

```bash
npx playwright test             # full suite (84 tests, 81 pass)
npx playwright test --ui        # interactive test runner
npx playwright show-report      # view last report
```

## Data & Storage

All data lives in `localStorage` — no backend required.

| Key | Contents |
|-----|----------|
| `euc_workspace_config` | WorkspaceConfig (locations, asset types, asset number format) |
| `euc_assets` | Inventory items per location |
| `euc_transactions` | Full transaction log |

**Export / Import** — use the export button in the dashboard to download a JSON snapshot. Import it on another device to restore both config and data.

**Backward compatibility** — if `euc_assets` exists but `euc_workspace_config` does not (legacy install), the app silently creates the Perth IT config on first load. No data is lost.

## TensorFlow.js / Box Counter

TensorFlow.js is loaded from CDN to keep bundle size small.

To bundle it locally (requires Azure Static Web Apps Standard or self-hosting):
1. Remove `@tensorflow/tfjs` and `@tensorflow-models/coco-ssd` from the `external` array in `vite.config.ts`
2. Remove the CDN `<script>` tags from `index.html`
3. Change `window.tf` / `window.cocoSsd` back to imports in `src/hooks/useBoxCounter.ts`

## Browser Support

Chrome/Edge 80+, Firefox 78+, Safari 14+, mobile browsers with camera access.

## License

MIT
