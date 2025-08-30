'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // Core Web Vitals
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            // LCP
            if (entry.startTime < 2500) {
              console.log('✅ LCP: Excellent', entry.startTime);
            } else if (entry.startTime < 4000) {
              console.log('⚠️ LCP: Needs improvement', entry.startTime);
            } else {
              console.log('❌ LCP: Poor', entry.startTime);
            }
          }
          
          if (entry.entryType === 'first-input') {
            // FID
            if (entry.processingStart - entry.startTime < 100) {
              console.log('✅ FID: Excellent', entry.processingStart - entry.startTime);
            } else if (entry.processingStart - entry.startTime < 300) {
              console.log('⚠️ FID: Needs improvement', entry.processingStart - entry.startTime);
            } else {
              console.log('❌ FID: Poor', entry.processingStart - entry.startTime);
            }
          }
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });

      // CLS
      let clsValue = 0;
      let clsEntries: any[] = [];

      const observer2 = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += (entry as any).value;
            clsEntries.push(entry);
          }
        }
      });

      observer2.observe({ entryTypes: ['layout-shift'] });

      // Отправка метрик в Google Analytics или другие сервисы
      const sendMetrics = () => {
        if (clsValue < 0.1) {
          console.log('✅ CLS: Excellent', clsValue);
        } else if (clsValue < 0.25) {
          console.log('⚠️ CLS: Needs improvement', clsValue);
        } else {
          console.log('❌ CLS: Poor', clsValue);
        }

        // Здесь можно отправить данные в аналитику
        if (typeof gtag !== 'undefined') {
          gtag('event', 'core_web_vitals', {
            event_category: 'Web Vitals',
            value: Math.round(clsValue * 1000),
            custom_parameter: 'CLS'
          });
        }
      };

      // Отправляем метрики через 5 секунд после загрузки
      setTimeout(sendMetrics, 5000);

      return () => {
        observer.disconnect();
        observer2.disconnect();
      };
    }
  }, []);

  return null;
}
