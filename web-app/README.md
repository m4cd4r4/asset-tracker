# EUC Asset Tracker - Web App

Azure Static Web App version of the EUC Asset Tracker with barcode scanning and quick-count features.

## Features

- **Multi-location inventory management** (Basement 4.2, Build Room, Darwin, Level 17, Basement 4.3)
- **SAN tracking** for G8, G9, G10 devices with validation
- **Barcode/QR scanning** via device camera or image upload
- **Quick-count** box detection using TensorFlow.js
- **PWA support** for mobile installation
- **Offline-first** with localStorage (optional Azure Table Storage backend)
- **Transaction logging** with full audit trail
- **Low stock alerts** with configurable thresholds

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to Azure Static Web Apps

### Option 1: GitHub Actions (Recommended)

1. Create an Azure Static Web App in the Azure Portal
2. Connect to your GitHub repository
3. Add `AZURE_STATIC_WEB_APPS_API_TOKEN` to repository secrets
4. Push to `main` branch - deployment is automatic

### Option 2: Azure CLI

```bash
# Login to Azure
az login

# Create resource group
az group create --name euc-asset-tracker-rg --location australiaeast

# Create Static Web App
az staticwebapp create \
  --name euc-asset-tracker \
  --resource-group euc-asset-tracker-rg \
  --source https://github.com/YOUR_USERNAME/asset-tracker \
  --location australiaeast \
  --branch main \
  --app-location "web-app" \
  --api-location "web-app/api" \
  --output-location "dist"
```

### Option 3: SWA CLI

```bash
# Install SWA CLI
npm install -g @azure/static-web-apps-cli

# Build the app
npm run build

# Deploy
swa deploy ./dist --api-location ./api
```

## Project Structure

```
web-app/
├── src/
│   ├── components/       # React components
│   │   ├── BarcodeScanner.tsx
│   │   ├── BoxCounter.tsx
│   │   ├── Header.tsx
│   │   ├── InventoryTable.tsx
│   │   ├── LocationSelector.tsx
│   │   ├── SANInputModal.tsx
│   │   └── TransactionLog.tsx
│   ├── hooks/           # Custom React hooks
│   │   ├── useBarcodeScanner.ts
│   │   └── useBoxCounter.ts
│   ├── services/        # Data services
│   │   └── storage.ts
│   ├── store/           # State management
│   │   └── useStore.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── api/                 # Azure Functions API
│   └── src/functions/
├── public/              # Static assets
└── staticwebapp.config.json
```

## Environment Variables

For the API backend (optional):

| Variable | Description |
|----------|-------------|
| `STORAGE_CONNECTION_STRING` | Azure Table Storage connection string |

## Data Storage

**Default: localStorage** - Works offline, no backend required

**Optional: Azure Table Storage** - For multi-user/multi-device sync:
1. Create an Azure Storage Account
2. Add connection string to Static Web App settings
3. Update `storage.ts` to call API endpoints

## Browser Support

- Chrome/Edge 80+
- Firefox 78+
- Safari 14+
- Mobile browsers with camera access

## License

MIT


## TensorFlow.js Configuration

**Current: CDN Loading** - TensorFlow.js is loaded from a CDN to stay within Azure Static Web Apps Free tier limits (250MB).

**Trade-off:** Box counting requires an internet connection and won't work offline.

**To enable offline box counting:**
1. In `vite.config.ts`, remove `@tensorflow/tfjs` and `@tensorflow-models/coco-ssd` from the `external` array
2. In `index.html`, remove the TensorFlow CDN `<script>` tags
3. In `src/hooks/useBoxCounter.ts`, change `window.tf`/`window.cocoSsd` back to imports
4. Upgrade to Azure Static Web Apps Standard tier ($9/mo) or self-host

