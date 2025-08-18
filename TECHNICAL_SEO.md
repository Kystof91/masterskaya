# Техническое SEO руководство

## 🚀 Оптимизация производительности

### 1. Core Web Vitals
Цели для достижения "Good" статуса:

#### LCP (Largest Contentful Paint)
- **Отлично**: < 2.5 секунды
- **Хорошо**: 2.5 - 4.0 секунды
- **Плохо**: > 4.0 секунды

#### FID (First Input Delay)
- **Отлично**: < 100 миллисекунд
- **Хорошо**: 100 - 300 миллисекунд
- **Плохо**: > 300 миллисекунд

#### CLS (Cumulative Layout Shift)
- **Отлично**: < 0.1
- **Хорошо**: 0.1 - 0.25
- **Плохо**: > 0.25

### 2. Оптимизация изображений
```typescript
// next.config.ts
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
}
```

### 3. Ленивая загрузка
```tsx
import Image from 'next/image'

<Image
  src="/image.jpg"
  alt="Описание изображения"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

## 🔧 Техническая оптимизация

### 1. HTTP заголовки
Создайте файл `next.config.ts`:

```typescript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          }
        ]
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  }
}
```

### 2. Оптимизация шрифтов
```typescript
// layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-inter',
})
```

### 3. Bundle анализатор
```bash
npm install --save-dev @next/bundle-analyzer
```

```typescript
// next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // ваша конфигурация
})
```

## 📱 Мобильная оптимизация

### 1. Viewport настройки
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

### 2. Touch-friendly элементы
```css
/* Минимальный размер для touch элементов */
.touch-target {
  min-height: 44px;
  min-width: 44px;
}

/* Увеличение области нажатия */
.button {
  padding: 12px 24px;
  margin: 8px;
}
```

### 3. Адаптивные изображения
```tsx
<picture>
  <source
    media="(min-width: 768px)"
    srcSet="/image-desktop.webp"
    type="image/webp"
  />
  <source
    media="(min-width: 768px)"
    srcSet="/image-desktop.jpg"
  />
  <source
    srcSet="/image-mobile.webp"
    type="image/webp"
  />
  <img
    src="/image-mobile.jpg"
    alt="Описание"
    loading="lazy"
  />
</picture>
```

## 🔍 Структурированные данные

### 1. Медицинская организация
```tsx
import StructuredData from '@/components/StructuredData'

<StructuredData
  type="organization"
  data={{
    name: "Мастерская - Лечение зависимостей",
    description: "Медицинский центр по лечению зависимостей",
    url: "https://mstrclinic.ru",
    telephone: "8-812-407-3-407",
    address: {
      streetAddress: "ул. Заставская, 33л",
      addressLocality: "Санкт-Петербург",
      addressCountry: "RU"
    }
  }}
/>
```

### 2. Медицинские услуги
```tsx
<StructuredData
  type="medical-procedure"
  data={{
    name: "Детоксикация",
    description: "Безопасное выведение токсинов из организма",
    bodyLocation: "Brain",
    preparation: "Консультация врача",
    procedureType: "Therapeutic"
  }}
/>
```

### 3. FAQ страница
```tsx
<StructuredData
  type="faq"
  data={{
    questions: [
      {
        question: "Как проходит детоксикация?",
        answer: "Детоксикация проводится под наблюдением врачей..."
      }
    ]
  }}
/>
```

## 📊 Мониторинг и аналитика

### 1. Google Analytics 4
```tsx
// components/Analytics.tsx
export default function Analytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
    </>
  )
}
```

### 2. Яндекс.Метрика
```tsx
<Script id="yandex-metrika" strategy="afterInteractive">
  {`
    (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
    (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    ym(${process.env.NEXT_PUBLIC_YANDEX_ID}, "init", {
      defer: true
    });
  `}
</Script>
```

## 🚫 Блокировка индексации

### 1. robots.txt
```txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://masterskaya.clinic/sitemap.xml

# Disallow admin and API
Disallow: /admin
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Allow important pages
Allow: /services/*
Allow: /blog/*
Allow: /reviews/*
```

### 2. Мета-теги
```tsx
// Для страниц, которые не должны индексироваться
<meta name="robots" content="noindex, nofollow" />

// Для страниц с ограниченной индексацией
<meta name="robots" content="noindex, follow" />
```

### 3. HTTP заголовки
```typescript
// next.config.ts
{
  source: '/admin/(.*)',
  headers: [
    {
      key: 'X-Robots-Tag',
      value: 'noindex, nofollow'
    }
  ]
}
```

## 🔗 Внутренняя перелинковка

### 1. Хлебные крошки
```tsx
import Breadcrumbs from '@/components/Breadcrumbs'

<Breadcrumbs
  items={[
    { name: 'Главная', url: '/' },
    { name: 'Услуги', url: '/services' },
    { name: 'Детоксикация', url: '/services/detox' }
  ]}
/>
```

### 2. Связанные статьи
```tsx
<section className="related-articles">
  <h3>Похожие статьи</h3>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {relatedArticles.map(article => (
      <Link
        key={article.id}
        href={`/blog/${article.slug}`}
        className="block hover:shadow-lg transition-shadow"
      >
        <h4>{article.title}</h4>
        <p>{article.excerpt}</p>
      </Link>
    ))}
  </div>
</section>
```

## 📈 Оптимизация для поиска

### 1. Мета-теги для каждой страницы
```tsx
export const metadata: Metadata = {
  title: "Детоксикация в СПб | Мастерская - Лечение зависимостей",
  description: "Профессиональная детоксикация в Санкт-Петербурге. Безопасное выведение токсинов под наблюдением врачей. Анонимно, круглосуточно.",
  keywords: "детоксикация спб, вывод из запоя, лечение алкоголизма",
  openGraph: {
    title: "Детоксикация в СПб - Безопасное лечение зависимостей",
    description: "Профессиональная детоксикация в Санкт-Петербурге",
    images: ['/detox-service.jpg'],
  },
  alternates: {
    canonical: '/services/detox',
  },
}
```

### 2. Заголовки страниц
```tsx
// Используйте правильную иерархию заголовков
<h1>Детоксикация в Санкт-Петербурге</h1>
<h2>Что такое детоксикация</h2>
<h3>Этапы процедуры</h3>
<h3>Показания к проведению</h3>
<h2>Стоимость лечения</h2>
```

### 3. Alt-теги для изображений
```tsx
<Image
  src="/detox-procedure.jpg"
  alt="Процедура детоксикации в медицинском центре Мастерская"
  width={800}
  height={600}
/>
```

## 🧪 Тестирование SEO

### 1. Lighthouse
```bash
# Установка
npm install -g lighthouse

# Запуск теста
lighthouse https://masterskaya.clinic --output html --output-path ./lighthouse-report.html
```

### 2. PageSpeed Insights
- URL: [pagespeed.web.dev](https://pagespeed.web.dev/)
- Проверяйте мобильную и десктопную версии
- Анализируйте рекомендации

### 3. Google Rich Results Test
- URL: [search.google.com/test/rich-results](https://search.google.com/test/rich-results)
- Проверяйте структурированные данные
- Убедитесь в корректности разметки

### 4. Schema Markup Validator
- URL: [validator.schema.org](https://validator.schema.org/)
- Проверяйте корректность Schema.org
- Исправляйте ошибки валидации

## 📋 Чек-лист технического SEO

### Производительность
- [ ] LCP < 2.5 секунды
- [ ] FID < 100 миллисекунд
- [ ] CLS < 0.1
- [ ] Оптимизированы изображения
- [ ] Включена ленивая загрузка

### Техническая оптимизация
- [ ] Настроены HTTP заголовки
- [ ] Оптимизированы шрифты
- [ ] Настроен кэш
- [ ] Сжатие файлов включено
- [ ] CDN настроен

### Мобильная оптимизация
- [ ] Адаптивный дизайн
- [ ] Touch-friendly элементы
- [ ] Оптимизированы изображения
- [ ] Быстрая загрузка на мобильных

### Структурированные данные
- [ ] Organization Schema
- [ ] MedicalProcedure Schema
- [ ] FAQ Schema
- [ ] Review Schema
- [ ] Breadcrumb Schema

### Мониторинг
- [ ] Google Analytics подключен
- [ ] Яндекс.Метрика подключена
- [ ] Search Console настроен
- [ ] Вебмастер настроен
- [ ] Мониторинг Core Web Vitals

---

**Важно**: Техническое SEO - это основа для успешного продвижения. Регулярно проводите аудит и исправляйте найденные проблемы!
