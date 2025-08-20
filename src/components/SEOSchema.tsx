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
      "medicalSpecialty": ["Addiction Medicine", "Psychiatry", "Psychology"],
      "availableService": [
        {
          "@type": "MedicalService",
          "name": "Детоксикация",
          "description": "Безопасное выведение токсинов из организма"
        },
        {
          "@type": "MedicalService",
          "name": "Реабилитация",
          "description": "Комплексная программа восстановления"
        },
        {
          "@type": "MedicalService",
          "name": "Психотерапия",
          "description": "Индивидуальные и групповые сеансы"
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
            }
          }
        ]
      }
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
