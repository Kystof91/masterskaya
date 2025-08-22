import Head from 'next/head';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  articleData?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  structuredData?: object;
}

export default function SEOHead({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/logotip.png',
  ogType = 'website',
  articleData,
  structuredData
}: SEOHeadProps) {
  const fullTitle = title.includes('Мастерская') ? title : `${title} | Мастерская - Лечение зависимостей`;
  const fullDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;
  const fullCanonical = canonical ? `https://mstrclinic.ru${canonical}` : 'https://mstrclinic.ru';
  
  return (
    <Head>
      {/* Основные мета-теги */}
      <title>{fullTitle}</title>
      <meta name="description" content={fullDescription} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={fullDescription} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={`https://mstrclinic.ru${ogImage}`} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Мастерская - Лечение зависимостей" />
      <meta property="og:locale" content="ru_RU" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={fullDescription} />
      <meta name="twitter:image" content={`https://mstrclinic.ru${ogImage}`} />
      
      {/* Дополнительные мета-теги для статей */}
      {articleData && (
        <>
          {articleData.publishedTime && (
            <meta property="article:published_time" content={articleData.publishedTime} />
          )}
          {articleData.modifiedTime && (
            <meta property="article:modified_time" content={articleData.modifiedTime} />
          )}
          {articleData.author && (
            <meta property="article:author" content={articleData.author} />
          )}
          {articleData.section && (
            <meta property="article:section" content={articleData.section} />
          )}
          {articleData.tags && articleData.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Структурированные данные */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
      
      {/* Дополнительные SEO мета-теги */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="author" content="Мастерская - Лечение зависимостей" />
      <meta name="copyright" content="Мастерская - Лечение зависимостей" />
      
      {/* Географические мета-теги */}
      <meta name="geo.region" content="RU-SPB" />
      <meta name="geo.placename" content="Санкт-Петербург" />
      <meta name="geo.position" content="59.9311;30.3609" />
      <meta name="ICBM" content="59.9311, 30.3609" />
      
      {/* Медицинские мета-теги */}
      <meta name="medical:specialty" content="Addiction Medicine, Psychiatry, Psychology, Narcology" />
      <meta name="medical:service" content="Detoxification, Rehabilitation, Psychotherapy, Family Therapy" />
      <meta name="medical:location" content="Saint Petersburg, Russia" />
    </Head>
  );
}
