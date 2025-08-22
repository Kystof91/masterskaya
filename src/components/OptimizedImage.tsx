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
  fill?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onClick?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  fill = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  onClick
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Автоматическое улучшение alt-текста для SEO
  const enhancedAlt = alt.includes('Мастерская') || alt.includes('лечение') 
    ? alt 
    : `${alt} - Мастерская лечение зависимостей`;

  // Обработка ошибок загрузки
  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  // Обработка успешной загрузки
  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <div 
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
      >
        <span className="text-gray-500 text-sm">Ошибка загрузки изображения</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      
      <Image
        src={src}
        alt={enhancedAlt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        className={`transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        priority={priority}
        sizes={sizes}
        fill={fill}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        style={{
          objectFit: fill ? 'cover' : 'contain'
        }}
      />
      
      {/* Скрытый текст для SEO */}
      <span className="sr-only">{enhancedAlt}</span>
    </div>
  );
}
