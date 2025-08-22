interface SEOSchemaProps {
  type: 'medical-organization' | 'local-business' | 'service' | 'article';
  data?: Record<string, unknown>;
}

export default function SEOSchema({ type, data }: SEOSchemaProps) {
  const generateSchema = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": type === 'medical-organization' ? "MedicalOrganization" : 
               type === 'local-business' ? "LocalBusiness" : 
               type === 'service' ? "MedicalService" : "Article",
      "name": "Мастерская - Лечение зависимостей",
      "alternateName": "Клиника Мастерская",
      "url": "https://mstrclinic.ru",
      "logo": "https://mstrclinic.ru/logotip.png",
      "image": "https://mstrclinic.ru/logotip.png",
      "telephone": ["8-812-407-3-407", "+7-911-750-07-00"],
      "email": "masterskaya.clinic@yandex.ru",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "ул. Заставская, 33л",
        "addressLocality": "Санкт-Петербург",
        "addressRegion": "Санкт-Петербург",
        "addressCountry": "RU",
        "postalCode": "196084"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 59.9311,
        "longitude": 30.3609
      },
      "openingHours": "Mo-Su 00:00-23:59",
      "priceRange": "$$",
      "paymentAccepted": ["Cash", "Credit Card", "Insurance"],
      "currenciesAccepted": "RUB",
      "medicalSpecialty": ["Addiction Medicine", "Psychiatry", "Psychology", "Narcology"],
      "availableService": [
        {
          "@type": "MedicalService",
          "name": "Детоксикация",
          "description": "Безопасное выведение токсинов из организма при алкогольной и наркотической зависимости",
          "category": "Addiction Treatment",
          "serviceType": "Detoxification"
        },
        {
          "@type": "MedicalService",
          "name": "Реабилитация",
          "description": "Комплексная программа восстановления физического и психического здоровья",
          "category": "Addiction Treatment",
          "serviceType": "Rehabilitation"
        },
        {
          "@type": "MedicalService",
          "name": "Психотерапия",
          "description": "Индивидуальные и групповые сеансы с опытными психологами",
          "category": "Mental Health",
          "serviceType": "Psychotherapy"
        },
        {
          "@type": "MedicalService",
          "name": "Семейная терапия",
          "description": "Помощь родственникам в преодолении кризисной ситуации",
          "category": "Mental Health",
          "serviceType": "Family Therapy"
        }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Услуги центра",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalService",
              "name": "Консультация психиатра-нарколога",
              "description": "Бесплатная первичная консультация"
            },
            "price": "0",
            "priceCurrency": "RUB"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalService",
              "name": "Детоксикация организма",
              "description": "Выведение токсинов капельницами"
            },
            "price": "от 3000",
            "priceCurrency": "RUB"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "MedicalService",
              "name": "Психотерапия",
              "description": "Индивидуальные сеансы"
            },
            "price": "от 2000",
            "priceCurrency": "RUB"
          }
        ]
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Александр М."
          },
          "reviewBody": "Благодаря центру я смог избавиться от зависимости и вернуться к нормальной жизни. Спасибо всему персоналу!"
        },
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Елена В."
          },
          "reviewBody": "Профессиональный подход и внимательное отношение к каждому пациенту. Рекомендую всем, кто столкнулся с проблемой."
        }
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "127",
        "bestRating": "5",
        "worstRating": "1"
      },
      "sameAs": [
        "https://vk.com/mstrclinic",
        "https://t.me/mstrclinic"
      ],
      "areaServed": [
        {
          "@type": "City",
          "name": "Санкт-Петербург"
        },
        {
          "@type": "City", 
          "name": "Ленинградская область"
        }
      ],
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 59.9311,
          "longitude": 30.3609
        },
        "geoRadius": "50000"
      },
      "foundingDate": "2020",
      "numberOfEmployees": "15-25",
      "award": [
        "Лицензия №Л041-01148-78/02897906",
        "Сертификат качества медицинских услуг"
      ]
    };

    return baseSchema;
  };

  const schema = generateSchema();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema)
      }}
    />
  );
}
