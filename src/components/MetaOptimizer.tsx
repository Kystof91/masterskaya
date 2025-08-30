'use client';

import { useEffect } from 'react';
import Head from 'next/head';

interface MetaOptimizerProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  noindex?: boolean;
  nofollow?: boolean;
  language?: string;
  author?: string;
  robots?: string;
}

export default function MetaOptimizer({
  title = 'Мастерская - Лечение зависимостей',
  description = 'Профессиональная помощь в лечении алкогольной и наркотической зависимости в Санкт-Петербурге. Анонимно, конфиденциально, эффективно.',
  keywords = ['лечение зависимостей', 'наркология', 'алкоголизм', 'наркомания', 'детоксикация', 'реабилитация', 'психотерапия', 'Санкт-Петербург'],
  canonical = '',
  ogImage = '/logotip.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  noindex = false,
  nofollow = false,
  language = 'ru',
  author = 'Мастерская - Лечение зависимостей',
  robots = 'index, follow'
}: MetaOptimizerProps) {
  
  // Автоматическая оптимизация заголовка
  const optimizeTitle = (baseTitle: string): string => {
    const maxLength = 60;
    if (baseTitle.length <= maxLength) return baseTitle;
    
    // Пытаемся сократить, сохранив ключевые слова
    const importantWords = ['лечение', 'зависимостей', 'наркология', 'алкоголизм', 'наркомания'];
    let optimizedTitle = baseTitle;
    
    for (const word of importantWords) {
      if (baseTitle.includes(word)) {
        const wordIndex = baseTitle.indexOf(word);
        const beforeWord = baseTitle.substring(0, wordIndex).trim();
        const afterWord = baseTitle.substring(wordIndex + word.length).trim();
        
        if (beforeWord.length + word.length + afterWord.length <= maxLength) {
          optimizedTitle = `${beforeWord} ${word} ${afterWord}`.trim();
          break;
        }
      }
    }
    
    // Если все еще длинный, обрезаем по словам
    if (optimizedTitle.length > maxLength) {
      const words = optimizedTitle.split(' ');
      let result = '';
      for (const word of words) {
        if ((result + ' ' + word).length <= maxLength) {
          result += (result ? ' ' : '') + word;
        } else {
          break;
        }
      }
      optimizedTitle = result;
    }
    
    return optimizedTitle;
  };

  // Автоматическая оптимизация описания
  const optimizeDescription = (baseDescription: string): string => {
    const maxLength = 160;
    if (baseDescription.length <= maxLength) return baseDescription;
    
    // Пытаемся найти естественную точку для обрезки
    const sentences = baseDescription.split(/[.!?]/);
    let result = '';
    
    for (const sentence of sentences) {
      const trimmedSentence = sentence.trim();
      if ((result + '. ' + trimmedSentence).length <= maxLength) {
        result += (result ? '. ' : '') + trimmedSentence;
      } else {
        break;
      }
    }
    
    // Если не удалось разбить по предложениям, обрезаем по словам
    if (!result) {
      const words = baseDescription.split(' ');
      for (const word of words) {
        if ((result + ' ' + word).length <= maxLength) {
          result += (result ? ' ' : '') + word;
        } else {
          break;
        }
      }
    }
    
    return result + (result.endsWith('.') ? '' : '.');
  };

  // Автоматическая генерация ключевых слов
  const generateKeywords = (baseKeywords: string[]): string[] => {
    const baseSet = new Set(baseKeywords);
    
    // Добавляем связанные ключевые слова
    const relatedKeywords = [
      'детоксикация организма',
      'выведение токсинов',
      'капельницы',
      'вывод из запоя',
      'реабилитация зависимостей',
      'психолог',
      'психиатр',
      'нарколог',
      'семейная терапия',
      'кодирование от алкоголизма',
      'анонимно',
      'конфиденциально',
      'круглосуточно',
      'СПб',
      'цены',
      'стоимость',
      'отзывы',
      'методы лечения',
      'здоровье'
    ];
    
    relatedKeywords.forEach(keyword => {
      if (baseSet.size < 20) { // Ограничиваем количество ключевых слов
        baseSet.add(keyword);
      }
    });
    
    return Array.from(baseSet);
  };

  // Автоматическая оптимизация canonical URL
  const optimizeCanonical = (baseCanonical: string): string => {
    if (baseCanonical) return baseCanonical;
    
    // Генерируем canonical на основе текущего пути
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname;
      const baseUrl = 'https://mstrclinic.ru';
      return baseUrl + currentPath;
    }
    
    return 'https://mstrclinic.ru';
  };

  // Автоматическая настройка robots
  const optimizeRobots = (baseRobots: string, noIndex: boolean, noFollow: boolean): string => {
    if (noIndex) return 'noindex';
    if (noFollow) return 'nofollow';
    if (noIndex && noFollow) return 'noindex, nofollow';
    return baseRobots;
  };

  // Оптимизированные значения
  const optimizedTitle = optimizeTitle(title);
  const optimizedDescription = optimizeDescription(description);
  const optimizedKeywords = generateKeywords(keywords);
  const optimizedCanonical = optimizeCanonical(canonical);
  const optimizedRobots = optimizeRobots(robots, noindex, nofollow);

  // Автоматическая отправка метрик в аналитику
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'page_view', {
        page_title: optimizedTitle,
        page_description: optimizedDescription,
        page_keywords: optimizedKeywords.join(', '),
        canonical_url: optimizedCanonical
      });
    }
  }, [optimizedTitle, optimizedDescription, optimizedKeywords, optimizedCanonical]);

  return (
    <Head>
      {/* Основные мета-теги */}
      <title>{optimizedTitle}</title>
      <meta name="description" content={optimizedDescription} />
      <meta name="keywords" content={optimizedKeywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content={optimizedRobots} />
      <meta name="language" content={language} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={optimizedCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={optimizedTitle} />
      <meta property="og:description" content={optimizedDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={optimizedCanonical} />
      <meta property="og:image" content={`https://mstrclinic.ru${ogImage}`} />
      <meta property="og:site_name" content="Мастерская - Лечение зависимостей" />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={optimizedTitle} />
      <meta name="twitter:description" content={optimizedDescription} />
      <meta name="twitter:image" content={`https://mstrclinic.ru${ogImage}`} />
      
      {/* Дополнительные SEO мета-теги */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#B39A7C" />
      
      {/* Предзагрузка критических ресурсов */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS prefetch для внешних доменов */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//mc.yandex.ru" />
      
      {/* Структурированные данные для поисковых систем */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": optimizedTitle,
            "description": optimizedDescription,
            "url": optimizedCanonical,
            "mainEntity": {
              "@type": "MedicalOrganization",
              "name": "Мастерская - Лечение зависимостей",
              "url": "https://mstrclinic.ru"
            }
          })
        }}
      />
    </Head>
  );
}
