
/**
 * Performance measurement utilities for monitoring and improving app performance
 */

// Store performance metrics
const metrics: Record<string, { 
  count: number, 
  totalTime: number, 
  min: number, 
  max: number 
}> = {};

/**
 * Measure the execution time of a function
 * @param name Identifier for the measurement
 * @param fn Function to measure
 * @returns Result of the measured function
 */
export function measure<T>(name: string, fn: () => T): T {
  const start = performance.now();
  try {
    return fn();
  } finally {
    const duration = performance.now() - start;
    
    if (!metrics[name]) {
      metrics[name] = { count: 0, totalTime: 0, min: duration, max: duration };
    }
    
    const metric = metrics[name];
    metric.count++;
    metric.totalTime += duration;
    metric.min = Math.min(metric.min, duration);
    metric.max = Math.max(metric.max, duration);
  }
}

/**
 * Get performance metrics collected so far
 */
export function getPerformanceMetrics() {
  const result: Record<string, { 
    count: number, 
    averageTime: number, 
    minTime: number,
    maxTime: number
  }> = {};
  
  for (const [name, metric] of Object.entries(metrics)) {
    result[name] = {
      count: metric.count,
      averageTime: metric.totalTime / metric.count,
      minTime: metric.min,
      maxTime: metric.max
    };
  }
  
  return result;
}

/**
 * Log current performance metrics to console
 */
export function logPerformanceMetrics() {
  console.table(getPerformanceMetrics());
}

/**
 * Create a performance marker
 * @param name Marker name
 */
export function markPerformance(name: string) {
  performance.mark(name);
}

/**
 * Measure time between two markers
 * @param startMark Starting marker name
 * @param endMark Ending marker name
 * @param name Measurement name
 */
export function measurePerformance(startMark: string, endMark: string, name: string) {
  performance.measure(name, startMark, endMark);
  const measures = performance.getEntriesByName(name, 'measure');
  if (measures.length > 0) {
    console.log(`${name}: ${measures[0].duration.toFixed(2)}ms`);
  }
}

/**
 * Report Core Web Vitals to console
 */
export function reportWebVitals() {
  if ('web-vitals' in window) {
    const webVitals = (window as any)['web-vitals'];
    
    webVitals.getFID((metric: any) => {
      console.log('FID:', metric.value);
    });
    
    webVitals.getLCP((metric: any) => {
      console.log('LCP:', metric.value);
    });
    
    webVitals.getCLS((metric: any) => {
      console.log('CLS:', metric.value);
    });
  } else {
    console.warn('web-vitals not available');
  }
}

// Initialize performance observer for long tasks
export function observeLongTasks() {
  if (typeof PerformanceObserver !== 'undefined') {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn('Long task detected:', {
            duration: entry.duration,
            startTime: entry.startTime,
            name: entry.name
          });
        }
      });
      
      observer.observe({ entryTypes: ['longtask'] });
      return observer;
    } catch (error) {
      console.error('Error setting up performance observer:', error);
    }
  }
  return null;
}
