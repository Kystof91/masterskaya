'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ImageOptimizerProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export default function ImageOptimizer({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL
}: ImageOptimizerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  // Автоматическая генерация alt-текста если не предоставлен
  const generateAltText = (imageSrc: string, fallbackAlt: string) => {
    if (fallbackAlt && fallbackAlt.trim() !== '') {
      return fallbackAlt;
    }
    
    // Извлекаем название файла и генерируем alt
    const fileName = imageSrc.split('/').pop()?.split('.')[0] || '';
    const words = fileName.split(/[-_]/).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    );
    
    return words.join(' ') || 'Изображение';
  };

  // Оптимизация alt-текста для SEO
  const optimizedAlt = generateAltText(src, alt);

  // Автоматическое определение приоритета для изображений выше сгиба
  const shouldPrioritize = priority || (width >= 1200 && height >= 630);

  // Автоматическая настройка качества в зависимости от размера
  const getOptimizedQuality = () => {
    if (width >= 1920 || height >= 1080) return 90;
    if (width >= 1200 || height >= 800) return 85;
    return 80;
  };

  // Автоматическая настройка sizes для responsive изображений
  const getOptimizedSizes = () => {
    if (width >= 1920) return '(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw';
    if (width >= 1200) return '(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 40vw';
    if (width >= 800) return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
    return '(max-width: 768px) 100vw, 50vw';
  };

  // Автоматическая настройка placeholder
  const getOptimizedPlaceholder = () => {
    if (shouldPrioritize) return 'empty';
    return placeholder;
  };

  // Обработка загрузки изображения
  const handleLoad = () => {
    setIsLoaded(true);
    
    // Отправка метрики в аналитику
    if (typeof gtag !== 'undefined') {
      gtag('event', 'image_load', {
        event_category: 'Performance',
        event_label: src,
        value: Date.now()
      });
    }
  };

  // Обработка ошибки загрузки
  const handleError = () => {
    setError(true);
    
    // Отправка метрики об ошибке
    if (typeof gtag !== 'undefined') {
      gtag('event', 'image_error', {
        event_category: 'Performance',
        event_label: src,
        value: 1
      });
    }
  };

  // Автоматическая оптимизация для Core Web Vitals
  useEffect(() => {
    if (shouldPrioritize) {
      // Предзагрузка критических изображений
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, shouldPrioritize]);

  if (error) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Ошибка загрузки изображения</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={optimizedAlt}
        width={width}
        height={height}
        priority={shouldPrioritize}
        sizes={getOptimizedSizes()}
        quality={getOptimizedQuality()}
        placeholder={getOptimizedPlaceholder()}
        blurDataURL={blurDataURL}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
        loading={shouldPrioritize ? 'eager' : 'lazy'}
        decoding="async"
      />
      
      {/* Показываем placeholder пока изображение загружается */}
      {!isLoaded && !shouldPrioritize && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{ width, height }}
        />
      )}
      
      {/* Индикатор загрузки для больших изображений */}
      {!isLoaded && width >= 800 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
