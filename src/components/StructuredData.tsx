interface StructuredDataProps {
  type: 'organization' | 'medical-clinic' | 'service' | 'article' | 'breadcrumb' | 'faq' | 'review' | 'local-business' | 'medical-procedure';
  data: Record<string, unknown>;
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
          "url": "https://mstrclinic.ru",
          "logo": "https://mstrclinic.ru/logotip.png",
          "image": "https://mstrclinic.ru/logotip.png",
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

      case 'medical-clinic':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          "name": "Мастерская - Лечение зависимостей",
          "description": data.description || "Профессиональная помощь в лечении зависимостей",
          "url": data.url || "https://mstrclinic.ru",
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

      case 'medical-procedure':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          "name": data.name,
          "description": data.description,
          "bodyLocation": data.bodyLocation || "Brain",
          "preparation": data.preparation || "Консультация врача",
          "procedureType": data.procedureType || "Therapeutic",
          "howPerformed": data.howPerformed || "Под наблюдением врача",
          "followup": data.followup || "Регулярные консультации"
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
              "url": "https://mstrclinic.ru/logotip.png"
            }
          },
          "datePublished": data.publishedAt,
          "dateModified": data.updatedAt,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": data.url
          }
        };

      case 'faq':
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": (data.questions as Array<{question: string; answer: string}>).map(q => ({
            "@type": "Question",
            "name": q.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": q.answer
            }
          }))
        };

      case 'review':
        return {
          "@context": "https://schema.org",
          "@type": "Review",
          "itemReviewed": {
            "@type": "MedicalOrganization",
            "name": "Мастерская - Лечение зависимостей"
          },
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": data.rating || 5,
            "bestRating": 5
          },
          "author": {
            "@type": "Person",
            "name": data.authorName || "Пациент"
          },
          "reviewBody": data.reviewText || "",
          "datePublished": data.datePublished || new Date().toISOString()
        };

      case 'local-business':
        return {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "Мастерская - Лечение зависимостей",
          "description": "Медицинский центр по лечению зависимостей",
          "url": "https://mstrclinic.ru",
          "telephone": "8-812-407-3-407",
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
          "currenciesAccepted": "RUB"
        };

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": (data.items as Array<{name: string; url: string}>).map((item, index) => ({
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
