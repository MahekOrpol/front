import React from 'react';
import { createRoot } from 'react-dom/client';
import './critical.css';
import App from './App';
import { store } from './redux/store';
import { Provider } from 'react-redux';

// Defer non-critical CSS
const loadNonCriticalCSS = () => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/index.css';
  document.head.appendChild(link);
};

// Create root and render app
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Load non-critical resources after main content
window.addEventListener('load', () => {
  loadNonCriticalCSS();
  
  // Register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  }

  // Initialize performance monitoring
  const reportWebVitals = async () => {
    const { getCLS, getFID, getLCP } = await import('web-vitals');
    getCLS(console.log);
    getFID(console.log);
    getLCP(console.log);
  };
  reportWebVitals();
});
