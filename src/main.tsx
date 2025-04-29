
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { observeLongTasks } from './utils/performanceUtils';

// Observe long tasks for performance monitoring
const performanceObserver = observeLongTasks();

// Mark initial render for performance measurement
performance.mark('app-start');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Mark post-render for performance measurement
window.addEventListener('load', () => {
  performance.mark('app-loaded');
  performance.measure('app-render-time', 'app-start', 'app-loaded');
  
  const measures = performance.getEntriesByName('app-render-time', 'measure');
  if (measures.length > 0) {
    console.log(`Initial render time: ${measures[0].duration.toFixed(2)}ms`);
  }
});
