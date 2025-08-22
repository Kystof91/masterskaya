// Технические SEO функции для оптимизации сайта

export interface PerformanceMetrics {
  loadTime: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
}

export interface SEOMetrics {
  titleLength: number;
  descriptionLength: number;
  headingStructure: string[];
  imageCount: number;
  internalLinks: number;
  externalLinks: number;
}

// Функция для проверки длины заголовка
export function checkTitleLength(title: string): { isValid: boolean; length: number; recommendation: string } {
  const length = title.length;
  
  if (length < 30) {
    return {
      isValid: false,
      length,
      recommendation: 'Заголовок слишком короткий. Рекомендуется 50-60 символов.'
    };
  } else if (length > 60) {
    return {
      isValid: false,
      length,
      recommendation: 'Заголовок слишком длинный. Рекомендуется 50-60 символов.'
    };
  } else {
    return {
      isValid: true,
      length,
      recommendation: 'Длина заголовка оптимальна.'
    };
  }
}

// Функция для проверки мета-описания
export function checkDescriptionLength(description: string): { isValid: boolean; length: number; recommendation: string } {
  const length = description.length;
  
  if (length < 120) {
    return {
      isValid: false,
      length,
      recommendation: 'Описание слишком короткое. Рекомендуется 150-160 символов.'
    };
  } else if (length > 160) {
    return {
      isValid: false,
      length,
      recommendation: 'Описание слишком длинное. Рекомендуется 150-160 символов.'
    };
  } else {
    return {
      isValid: true,
      length,
      recommendation: 'Длина описания оптимальна.'
    };
  }
}

// Функция для анализа структуры заголовков
export function analyzeHeadingStructure(headings: string[]): { isValid: boolean; structure: string[]; issues: string[] } {
  const issues: string[] = [];
  const structure: string[] = [];
  
  headings.forEach((heading, index) => {
    const level = parseInt(heading.charAt(1));
    structure.push(heading);
    
    // Проверка правильной иерархии
    if (index === 0 && level !== 1) {
      issues.push('Первый заголовок должен быть H1');
    }
    
    if (index > 0) {
      const prevLevel = parseInt(headings[index - 1].charAt(1));
      if (level - prevLevel > 1) {
        issues.push(`Пропущен уровень заголовка между ${headings[index - 1]} и ${heading}`);
      }
    }
  });
  
  return {
    isValid: issues.length === 0,
    structure,
    issues
  };
}

// Функция для оптимизации изображений
export function optimizeImageSEO(images: HTMLImageElement[]): { optimized: number; issues: string[] } {
  const issues: string[] = [];
  let optimized = 0;
  
  images.forEach((img, index) => {
    // Проверка alt-атрибута
    if (!img.alt || img.alt.trim() === '') {
      issues.push(`Изображение ${index + 1}: отсутствует alt-атрибут`);
    } else {
      optimized++;
    }
    
    // Проверка размеров
    if (img.naturalWidth === 0 || img.naturalHeight === 0) {
      issues.push(`Изображение ${index + 1}: некорректные размеры`);
    }
    
    // Проверка lazy loading
    if (!img.loading) {
      issues.push(`Изображение ${index + 1}: рекомендуется добавить lazy loading`);
    }
  });
  
  return { optimized, issues };
}

// Функция для анализа внутренних ссылок
export function analyzeInternalLinking(links: HTMLAnchorElement[]): { internal: number; external: number; issues: string[] } {
  const issues: string[] = [];
  let internal = 0;
  let external = 0;
  
  links.forEach((link, index) => {
    const href = link.href;
    const isInternal = href.includes('mstrclinic.ru') || href.startsWith('/');
    
    if (isInternal) {
      internal++;
      
      // Проверка анкоров
      if (!link.textContent || link.textContent.trim().length < 3) {
        issues.push(`Ссылка ${index + 1}: слишком короткий анкор`);
      }
      
      // Проверка title атрибута
      if (!link.title) {
        issues.push(`Ссылка ${index + 1}: рекомендуется добавить title атрибут`);
      }
    } else {
      external++;
      
      // Проверка rel="nofollow" для внешних ссылок
      if (!link.rel.includes('nofollow')) {
        issues.push(`Внешняя ссылка ${index + 1}: рекомендуется добавить rel="nofollow"`);
      }
    }
  });
  
  return { internal, external, issues };
}

// Функция для генерации sitemap URL
export function generateSitemapUrl(path: string, priority: number = 0.5, changefreq: string = 'monthly'): string {
  const baseUrl = 'https://mstrclinic.ru';
  const currentDate = new Date().toISOString();
  
  return `
    <url>
      <loc>${baseUrl}${path}</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>${changefreq}</changefreq>
      <priority>${priority}</priority>
    </url>
  `;
}

// Функция для проверки Core Web Vitals
export function checkCoreWebVitals(metrics: PerformanceMetrics): { passed: boolean; score: number; issues: string[] } {
  const issues: string[] = [];
  let score = 100;
  
  // First Contentful Paint (FCP) - должен быть < 1.8s
  if (metrics.firstContentfulPaint > 1800) {
    issues.push('First Contentful Paint слишком медленный (> 1.8s)');
    score -= 20;
  }
  
  // Largest Contentful Paint (LCP) - должен быть < 2.5s
  if (metrics.largestContentfulPaint > 2500) {
    issues.push('Largest Contentful Paint слишком медленный (> 2.5s)');
    score -= 25;
  }
  
  // Cumulative Layout Shift (CLS) - должен быть < 0.1
  if (metrics.cumulativeLayoutShift > 0.1) {
    issues.push('Cumulative Layout Shift слишком высокий (> 0.1)');
    score -= 25;
  }
  
  // First Input Delay (FID) - должен быть < 100ms
  if (metrics.firstInputDelay > 100) {
    issues.push('First Input Delay слишком медленный (> 100ms)');
    score -= 30;
  }
  
  return {
    passed: score >= 90,
    score: Math.max(0, score),
    issues
  };
}

// Функция для оптимизации мета-тегов
export function optimizeMetaTags(metaTags: HTMLMetaElement[]): { optimized: number; issues: string[] } {
  const issues: string[] = [];
  let optimized = 0;
  
  const requiredTags = ['description', 'keywords', 'robots', 'viewport'];
  const foundTags = new Set<string>();
  
  metaTags.forEach((meta) => {
    const name = meta.name || (meta as HTMLMetaElement & { property?: string }).property;
    if (name) {
      foundTags.add(name);
      
      // Проверка конкретных тегов
      if (name === 'description') {
        const content = meta.content || '';
        if (content.length < 120 || content.length > 160) {
          issues.push('Мета-описание должно быть 120-160 символов');
        } else {
          optimized++;
        }
      }
      
      if (name === 'keywords') {
        const content = meta.content || '';
        if (content.split(',').length < 3) {
          issues.push('Добавьте больше ключевых слов (минимум 3)');
        } else {
          optimized++;
        }
      }
    }
  });
  
  // Проверка отсутствующих тегов
  requiredTags.forEach(tag => {
    if (!foundTags.has(tag)) {
      issues.push(`Отсутствует обязательный мета-тег: ${tag}`);
    }
  });
  
  return { optimized, issues };
}

// Функция для генерации robots.txt
export function generateRobotsTxt(allowPaths: string[] = [], disallowPaths: string[] = []): string {
  const baseRobots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/
Disallow: /_next/
Disallow: /static/

Sitemap: https://mstrclinic.ru/sitemap.xml

# Crawl delay for better server performance
Crawl-delay: 1

# Additional rules for specific bots
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Yandex
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1`;

  let customRules = '';
  
  if (allowPaths.length > 0) {
    customRules += '\n# Custom allow rules\n';
    allowPaths.forEach(path => {
      customRules += `Allow: ${path}\n`;
    });
  }
  
  if (disallowPaths.length > 0) {
    customRules += '\n# Custom disallow rules\n';
    disallowPaths.forEach(path => {
      customRules += `Disallow: ${path}\n`;
    });
  }
  
  return baseRobots + customRules;
}
