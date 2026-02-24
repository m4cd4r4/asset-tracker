import React from 'react';
import ReactDOM from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import './index.css';

registerSW({
  onNeedRefresh() {
    if (confirm('A new version is available. Reload to update?')) {
      window.location.reload();
    }
  },
  onOfflineReady() {
    console.log('App ready for offline use');
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
