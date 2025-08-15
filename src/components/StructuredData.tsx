interface StructuredDataProps {
  type: 'organization' | 'medical-clinic' | 'service' | 'article' | 'breadcrumb';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const generateStructuredData = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalOrganization",
          "name": "Мастерская - Лечение зависимостей",
          "alternateName": "Мастерская",
          "description": "Медицинский центр специализирующийся на лечении алкогольной и наркотической зависимости",
          "url": "https://masterskaya.clinic",
          "logo": "https://masterskaya.clinic/logotip.png",
          "image": "https://masterskaya.clinic/logotip.png",
          "telephone": ["8-812-407-3-407", "+7-911-750-07-00"],
          "email": "masterskaya.clinic@yandex.ru",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "ул. Заставская, 33л",
            "addressLocality": "Санкт-Петербург",
            "addressCountry": "RU"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 59.9311,
            "longitude": 30.3609
          },
          "openingHours": "Mo-Su 00:00-23:59",
          "priceRange": "$$",
          "medicalSpecialty": ["Addiction Medicine", "Psychiatry", "Psychology"],
          "availableService": [
            {
              "@type": "MedicalService",
              "name": "Детоксикация",
              "description": "Безопасное выведение токинов из организма"
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

      case 'medical-clinic':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          "name": "Мастерская - Лечение зависимостей",
          "description": data.description || "Профессиональная помощь в лечении зависимостей",
          "url": data.url || "https://masterskaya.clinic",
          "telephone": data.telephone || "8-812-407-3-407",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "ул. Заставская, 33л",
            "addressLocality": "Санкт-Петербург",
            "addressCountry": "RU"
          },
          "medicalSpecialty": ["Addiction Medicine", "Psychiatry", "Psychology"],
          "availableService": data.services || []
        };

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalService",
          "name": data.name,
          "description": data.description,
          "provider": {
            "@type": "MedicalOrganization",
            "name": "Мастерская - Лечение зависимостей"
          },
          "areaServed": {
            "@type": "City",
            "name": "Санкт-Петербург"
          }
        };

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": data.title,
          "description": data.description,
          "image": data.image,
          "author": {
            "@type": "Organization",
            "name": "Мастерская - Лечение зависимостей"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Мастерская - Лечение зависимостей",
            "logo": {
              "@type": "ImageObject",
              "url": "https://masterskaya.clinic/logotip.png"
            }
          },
          "datePublished": data.publishedAt,
          "dateModified": data.updatedAt,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data.url
          }
        };

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.items.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        };

      default:
        return {};
    }
  };

  const structuredData = generateStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
}
