import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onClick?: () => void;
  caption?: string;
  credit?: string;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onClick,
  caption,
  credit
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Генерация srcSet для разных размеров
  const generateSrcSet = () => {
    const baseUrl = src.startsWith('http') ? src : `https://mstrclinic.ru${src}`;
    const baseName = baseUrl.split('.').slice(0, -1).join('.');
    const extension = baseUrl.split('.').pop();
    
    // Размеры для адаптивности
    const sizes = [width * 0.5, width, width * 1.5, width * 2];
    
    return sizes
      .map(size => `${baseName}?w=${Math.round(size)}&q=${quality} ${Math.round(size)}w`)
      .join(', ');
  };

  // Генерация WebP srcSet
  const generateWebPSrcSet = () => {
    const baseUrl = src.startsWith('http') ? src : `https://mstrclinic.ru${src}`;
    const baseName = baseUrl.split('.').slice(0, -1).join('.');
    
    const sizes = [width * 0.5, width, width * 1.5, width * 2];
    
    return sizes
      .map(size => `${baseName}?w=${Math.round(size)}&q=${quality}&f=webp ${Math.round(size)}w`)
      .join(', ');
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  // Fallback для ошибок загрузки
  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <div className="text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-sm">Ошибка загрузки изображения</p>
        </div>
      </div>
    );
  }

  return (
    <figure className={`inline-block ${className}`}>
      <div className="relative overflow-hidden">
        {/* WebP изображение с fallback */}
        <picture>
          <source
            type="image/webp"
            srcSet={generateWebPSrcSet()}
            sizes={sizes}
          />
          <source
            type="image/jpeg"
            srcSet={generateSrcSet()}
            sizes={sizes}
          />
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            className={`transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            } ${onClick ? 'cursor-pointer' : ''}`}
            priority={priority}
            sizes={sizes}
            quality={quality}
            placeholder={placeholder}
            blurDataURL={blurDataURL}
            onLoad={handleLoad}
            onError={handleError}
            onClick={onClick}
            loading={priority ? 'eager' : 'lazy'}
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </picture>
        
        {/* Плейсхолдер во время загрузки */}
        {!isLoaded && placeholder === 'blur' && blurDataURL && (
          <Image
            src={blurDataURL}
            alt=""
            width={width}
            height={height}
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        )}
        
        {/* Индикатор загрузки */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="text-gray-400">
              <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      {/* Подпись к изображению */}
      {(caption || credit) && (
        <figcaption className="mt-2 text-sm text-gray-600 text-center">
          {caption && <span className="block">{caption}</span>}
          {credit && (
            <span className="block text-xs text-gray-500 mt-1">
              Фото: {credit}
            </span>
          )}
        </figcaption>
      )}
    </figure>
  );
}
