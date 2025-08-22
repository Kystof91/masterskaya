'use client';

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  cls: number | null;
  fid: number | null;
  ttfb: number | null;
}

interface PerformanceOptimizerProps {
  className?: string;
  showMetrics?: boolean;
}

export default function PerformanceOptimizer({ 
  className = '', 
  showMetrics = false 
}: PerformanceOptimizerProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null,
    lcp: null,
    cls: null,
    fid: null,
    ttfb: null
  });

  const [isOptimized, setIsOptimized] = useState(false);

  useEffect(() => {
    // Проверка поддержки Performance API
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // First Contentful Paint
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        if (fcpEntry) {
          setMetrics(prev => ({ ...prev, fcp: fcpEntry.startTime }));
        }
      });
      
      try {
        fcpObserver.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('FCP observer failed:', e);
      }

      // Largest Contentful Paint
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          setMetrics(prev => ({ ...prev, lcp: lastEntry.startTime }));
        }
      });
      
      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observer failed:', e);
      }

      // Cumulative Layout Shift
      const clsObserver = new PerformanceObserver((list) => {
        let clsValue = 0;
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += (entry as any).value;
          }
        }
        setMetrics(prev => ({ ...prev, cls: clsValue }));
      });
      
      try {
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observer failed:', e);
      }

      // First Input Delay
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fidEntry = entries[0];
        if (fidEntry) {
          setMetrics(prev => ({ ...prev, fid: fidEntry.processingStart - fidEntry.startTime }));
        }
      });
      
      try {
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observer failed:', e);
      }

      // Time to First Byte
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        setMetrics(prev => ({ ...prev, ttfb: navigationEntry.responseStart - navigationEntry.requestStart }));
      }

      // Очистка observers
      return () => {
        fcpObserver.disconnect();
        lcpObserver.disconnect();
        clsObserver.disconnect();
        fidObserver.disconnect();
      };
    }
  }, []);

  // Проверка оптимизации
  useEffect(() => {
    const checkOptimization = () => {
      const fcpGood = metrics.fcp !== null && metrics.fcp < 1800;
      const lcpGood = metrics.lcp !== null && metrics.lcp < 2500;
      const clsGood = metrics.cls !== null && metrics.cls < 0.1;
      const fidGood = metrics.fid !== null && metrics.fid < 100;
      const ttfbGood = metrics.ttfb !== null && metrics.ttfb < 600;

      setIsOptimized(fcpGood && lcpGood && clsGood && fidGood && ttfbGood);
    };

    if (Object.values(metrics).some(m => m !== null)) {
      checkOptimization();
    }
  }, [metrics]);

  // Получение оценки производительности
  const getPerformanceScore = () => {
    let score = 0;
    let total = 0;

    if (metrics.fcp !== null) {
      score += metrics.fcp < 1800 ? 100 : Math.max(0, 100 - (metrics.fcp - 1800) / 10);
      total += 100;
    }
    if (metrics.lcp !== null) {
      score += metrics.lcp < 2500 ? 100 : Math.max(0, 100 - (metrics.lcp - 2500) / 25);
      total += 100;
    }
    if (metrics.cls !== null) {
      score += metrics.cls < 0.1 ? 100 : Math.max(0, 100 - metrics.cls * 1000);
      total += 100;
    }
    if (metrics.fid !== null) {
      score += metrics.fid < 100 ? 100 : Math.max(0, 100 - (metrics.fid - 100) / 2);
      total += 100;
    }
    if (metrics.ttfb !== null) {
      score += metrics.ttfb < 600 ? 100 : Math.max(0, 100 - (metrics.ttfb - 600) / 10);
      total += 100;
    }

    return total > 0 ? Math.round(score / total) : 0;
  };

  // Получение цвета для метрики
  const getMetricColor = (value: number | null, threshold: number, isLowerBetter = true) => {
    if (value === null) return 'text-gray-400';
    const isGood = isLowerBetter ? value <= threshold : value >= threshold;
    return isGood ? 'text-green-600' : 'text-red-600';
  };

  // Получение иконки для метрики
  const getMetricIcon = (value: number | null, threshold: number, isLowerBetter = true) => {
    if (value === null) return '⏳';
    const isGood = isLowerBetter ? value <= threshold : value >= threshold;
    return isGood ? '✅' : '❌';
  };

  if (!showMetrics) {
    return null;
  }

  const performanceScore = getPerformanceScore();

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Производительность сайта
        </h2>
        
        {/* Общая оценка */}
        <div className="text-center mb-8">
          <div className={`text-6xl font-bold mb-2 ${
            performanceScore >= 90 ? 'text-green-600' : 
            performanceScore >= 70 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {performanceScore}
          </div>
          <p className="text-lg text-gray-600">
            {performanceScore >= 90 ? 'Отлично!' : 
             performanceScore >= 70 ? 'Хорошо' : 'Требует улучшения'}
          </p>
        </div>

        {/* Метрики Core Web Vitals */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Core Web Vitals</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="mr-2">{getMetricIcon(metrics.fcp, 1800)}</span>
                  <span className="font-medium">FCP</span>
                </div>
                <span className={`font-mono ${getMetricColor(metrics.fcp, 1800)}`}>
                  {metrics.fcp ? `${Math.round(metrics.fcp)}ms` : '—'}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="mr-2">{getMetricIcon(metrics.lcp, 2500)}</span>
                  <span className="font-medium">LCP</span>
                </div>
                <span className={`font-mono ${getMetricColor(metrics.lcp, 2500)}`}>
                  {metrics.lcp ? `${Math.round(metrics.lcp)}ms` : '—'}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="mr-2">{getMetricIcon(metrics.cls, 0.1)}</span>
                  <span className="font-medium">CLS</span>
                </div>
                <span className={`font-mono ${getMetricColor(metrics.cls, 0.1)}`}>
                  {metrics.cls ? metrics.cls.toFixed(3) : '—'}
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Дополнительные метрики</h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="mr-2">{getMetricIcon(metrics.fid, 100)}</span>
                  <span className="font-medium">FID</span>
                </div>
                <span className={`font-mono ${getMetricColor(metrics.fid, 100)}`}>
                  {metrics.fid ? `${Math.round(metrics.fid)}ms` : '—'}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <span className="mr-2">{getMetricIcon(metrics.ttfb, 600)}</span>
                  <span className="font-medium">TTFB</span>
                </div>
                <span className={`font-mono ${getMetricColor(metrics.ttfb, 600)}`}>
                  {metrics.ttfb ? `${Math.round(metrics.ttfb)}ms` : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Рекомендации по оптимизации */}
        {!isOptimized && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-2">Рекомендации по оптимизации:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              {metrics.fcp !== null && metrics.fcp > 1800 && (
                <li>• Оптимизируйте First Contentful Paint (FCP) - используйте preload для критических ресурсов</li>
              )}
              {metrics.lcp !== null && metrics.lcp > 2500 && (
                <li>• Улучшите Largest Contentful Paint (LCP) - оптимизируйте изображения и шрифты</li>
              )}
              {metrics.cls !== null && metrics.cls > 0.1 && (
                <li>• Уменьшите Cumulative Layout Shift (CLS) - задайте фиксированные размеры для изображений</li>
              )}
              {metrics.fid !== null && metrics.fid > 100 && (
                <li>• Оптимизируйте First Input Delay (FID) - уменьшите время выполнения JavaScript</li>
              )}
              {metrics.ttfb !== null && metrics.ttfb > 600 && (
                <li>• Улучшите Time to First Byte (TTFB) - оптимизируйте сервер и базу данных</li>
              )}
            </ul>
          </div>
        )}

        {/* Статус оптимизации */}
        <div className="mt-6 text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
            isOptimized 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            <span className="mr-2">
              {isOptimized ? '✅' : '⚠️'}
            </span>
            {isOptimized 
              ? 'Сайт оптимизирован для Core Web Vitals' 
              : 'Требуется дополнительная оптимизация'
            }
          </div>
        </div>
      </div>
    </div>
  );
}
