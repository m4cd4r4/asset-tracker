# EUC Asset Tracker v2 — Western Australia

A glassmorphism web dashboard for managing End User Computing (EUC) inventory across five locations in Western Australia and Darwin. Built with React, TypeScript, and Tailwind CSS.

![Dashboard — Light Mode](screenshots/dashboard-light.png)

![Dashboard — Dark Mode](screenshots/dashboard-dark.png)

## What it does

Tracks IT hardware stock levels, serial asset numbers (SANs), threshold alerts, and transaction history across five storerooms. Designed for the EUC Perth team to replace Excel-based tracking with a responsive, real-time UI.

## Features

- **Multi-location inventory** — Basement 4.2, Build Room, Darwin, Level 17, Basement 4.3
- **SAN tracking** — Serial asset numbers for G8, G9, G10 laptop generations with duplicate validation
- **Threshold alerts** — Low stock warnings with smart defaults derived from stock levels
- **Transaction log** — Full audit trail with relative timestamps and add/subtract filtering
- **SAN returns** — Record device returns with generation, recipient, and notes
- **Barcode scanner** — ZXing-powered camera scanning for SAN barcodes
- **Box counter** — TensorFlow.js object detection for quick physical counts
- **Stock chart** — Recharts bar chart with per-item threshold in tooltips
- **Dark mode** — System preference detection with manual toggle, persisted to localStorage
- **SAN registry** — Searchable dialog with location filter pills and lazy pagination
- **Data portability** — JSON export/import and one-click reset with automatic re-seeding
- **PWA support** — Installable as a Progressive Web App with offline caching

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + TypeScript + Vite |
| Styling | Tailwind CSS + glassmorphism utilities |
| Components | shadcn/ui (Radix UI + class-variance-authority) |
| State | Zustand with localStorage persistence |
| Charts | Recharts |
| Scanner | @nickvdyck/zxing-wasm |
| ML | TensorFlow.js (COCO-SSD) |
| Testing | Playwright (52 E2E tests, desktop + mobile) |
| Font | Inter (Google Fonts) |

## Quick start

```bash
cd web-app
npm install
npm run dev        # http://localhost:5173
```

The app auto-seeds with real inventory data from `src/data/seed.ts` on first load. To regenerate from the source Excel file:

```bash
pip install openpyxl
python scripts/extract-excel-data.py
```

## Project structure

```
web-app/
├── src/
│   ├── components/       # UI components
│   │   ├── ui/           # shadcn/ui primitives (button, dialog, table, etc.)
│   │   ├── Sidebar.tsx   # Navigation + location switching + theme toggle
│   │   ├── InventoryTable.tsx
│   │   ├── InventoryChart.tsx
│   │   ├── TransactionLog.tsx
│   │   ├── KPICards.tsx
│   │   └── ...modals (SAN input, SAN return, low stock, SAN list)
│   ├── store/useStore.ts # Zustand state management
│   ├── services/storage.ts # localStorage persistence + seed loading
│   ├── hooks/            # useTheme, useBarcodeScanner, useBoxCounter
│   ├── data/seed.ts      # 55 assets, 167 SANs, 7 returns, 162 transactions
│   └── types/index.ts    # TypeScript interfaces
├── e2e/                  # Playwright tests (52 specs)
├── scripts/              # Excel data extraction
└── public/               # PWA manifest + icons
```

## Testing

```bash
npx playwright install chromium
npx playwright test              # 52 tests, desktop + mobile
npx playwright test --ui         # Interactive test runner
```

## Supported locations

| Location | ID | Typical stock |
|----------|----|--------------|
| Basement 4.2 | `basement-4.2` | 587 items |
| Build Room | `build-room` | 169 items |
| Darwin | `darwin` | 146 items |
| Level 17 | `level-17` | 71 items |
| Basement 4.3 | `basement-4.3` | 14 items |

## v1 → v2 changes

v1 was a Python/CustomTkinter desktop app backed by an Excel workbook. v2 is a full web rewrite:

- CustomTkinter → React + shadcn/ui with glassmorphism design
- Excel storage → localStorage with JSON export/import
- matplotlib plots → Recharts interactive bar charts
- No dark mode → System-aware dark mode with toggle
- No mobile support → Fully responsive (sidebar → Sheet on mobile)
- No tests → 52 Playwright E2E tests across desktop and mobile viewports
- No camera features → ZXing barcode scanner + TensorFlow.js box counter
