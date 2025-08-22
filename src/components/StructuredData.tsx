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
        const services = Array.isArray(data.services) ? data.services : [];
        return {
          "@context": "https://schema.org",
          "@type": "MedicalClinic",
          "name": "Мастерская - Лечение зависимостей",
          "description": typeof data.description === 'string' ? data.description : "Профессиональная помощь в лечении зависимостей",
          "url": typeof data.url === 'string' ? data.url : "https://mstrclinic.ru",
          "telephone": data.telephone || "8-812-407-3-407",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "ул. Заставская, 33л",
            "addressLocality": "Санкт-Петербург",
            "addressCountry": "RU"
          },
          "medicalSpecialty": ["Addiction Medicine", "Psychiatry", "Psychology"],
          "availableService": services
        };

      case 'service':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalService",
          "name": typeof data.name === 'string' ? data.name : "",
          "description": typeof data.description === 'string' ? data.description : "",
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
          "name": typeof data.name === 'string' ? data.name : "",
          "description": typeof data.description === 'string' ? data.description : "",
          "bodyLocation": typeof data.bodyLocation === 'string' ? data.bodyLocation : "Brain",
          "preparation": typeof data.preparation === 'string' ? data.preparation : "Консультация врача",
          "procedureType": typeof data.procedureType === 'string' ? data.procedureType : "Therapeutic",
          "howPerformed": typeof data.howPerformed === 'string' ? data.howPerformed : "Под наблюдением врача",
          "followup": typeof data.followup === 'string' ? data.followup : "Регулярные консультации"
        };

      case 'article':
        return {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": typeof data.title === 'string' ? data.title : "",
          "description": typeof data.description === 'string' ? data.description : "",
          "image": typeof data.image === 'string' ? data.image : "",
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
          "datePublished": typeof data.publishedAt === 'string' ? data.publishedAt : "",
          "dateModified": typeof data.updatedAt === 'string' ? data.updatedAt : "",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": typeof data.url === 'string' ? data.url : ""
          }
        };

      case 'faq':
        const questions = Array.isArray(data.questions) ? data.questions : [];
        return {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": questions.map((q: { question?: string; answer?: string }) => ({
            "@type": "Question",
            "name": q.question || "",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": q.answer || ""
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
            "ratingValue": typeof data.rating === 'number' ? data.rating : 5,
            "bestRating": 5
          },
          "author": {
            "@type": "Person",
            "name": typeof data.authorName === 'string' ? data.authorName : "Пациент"
          },
          "reviewBody": typeof data.reviewText === 'string' ? data.reviewText : "",
          "datePublished": typeof data.datePublished === 'string' ? data.datePublished : new Date().toISOString()
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
        const items = Array.isArray(data.items) ? data.items : [];
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": items.map((item: { name?: string; url?: string }, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name || "",
            "item": item.url || ""
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
