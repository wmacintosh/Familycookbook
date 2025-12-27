import { onCLS, onINP, onLCP, onFCP, onTTFB, Metric } from 'web-vitals';

/**
 * Initialize web vitals monitoring
 * Logs performance metrics to console (in production, send to analytics)
 */
export const initWebVitals = () => {
    const logMetric = (metric: Metric) => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[Web Vitals] ${metric.name}:`, metric.value, metric);
        }

        // In production, send to your analytics service
        // Example: analytics.track('web_vital', { name: metric.name, value: metric.value });
    };

    onCLS(logMetric);   // Cumulative Layout Shift
    onINP(logMetric);   // Interaction to Next Paint (replaced FID)
    onLCP(logMetric);   // Largest Contentful Paint  
    onFCP(logMetric);   // First Contentful Paint
    onTTFB(logMetric);  // Time to First Byte
};
