interface MedicalStructuredDataProps {
  type: 'medical-organization' | 'medical-procedure' | 'healthcare-service' | 'medical-specialist' | 'medical-condition';
  data: Record<string, unknown>;
}

export default function MedicalStructuredData({ type, data }: MedicalStructuredDataProps) {
  const generateMedicalSchema = () => {
    switch (type) {
      case 'medical-organization':
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
          "medicalSpecialty": [
            "Addiction Medicine", 
            "Psychiatry", 
            "Psychology", 
            "Narcology",
            "Detoxification",
            "Rehabilitation"
          ],
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
              }
            ]
          },
          "sameAs": [
            "https://vk.com/masterskaya_clinic",
            "https://t.me/masterskaya_clinic"
          ],
          "foundingDate": "2020",
          "numberOfEmployees": "10-50",
          "award": [
            "Лицензия №Л041-01148-78/02897906",
            "Сертификат качества медицинских услуг"
          ]
        };

      case 'medical-procedure':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalProcedure",
          "name": data.name || "Лечение зависимости",
          "description": data.description || "Профессиональное лечение алкогольной и наркотической зависимости",
          "bodyLocation": "Brain",
          "preparation": "Консультация с врачом, анализы",
          "procedureType": "Therapeutic",
          "howPerformed": "Комплексный подход: детоксикация + психотерапия + реабилитация",
          "followup": "Постоянная поддержка и консультации",
          "possibleComplication": "Минимальные при правильном подходе",
          "expectedPrognosis": "Высокая эффективность при соблюдении рекомендаций"
        };

      case 'healthcare-service':
        return {
          "@context": "https://schema.org",
          "@type": "HealthcareService",
          "name": data.name || "Лечение зависимостей",
          "description": data.description || "Комплексные услуги по лечению зависимостей",
          "url": "https://mstrclinic.ru",
          "telephone": "8-812-407-3-407",
          "availableChannel": {
            "@type": "ServiceChannel",
            "serviceUrl": "https://mstrclinic.ru",
            "availableLanguage": "Russian"
          },
          "areaServed": {
            "@type": "City",
            "name": "Санкт-Петербург"
          },
          "serviceType": "Addiction Treatment",
          "category": "Medical Service"
        };

      case 'medical-specialist':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalSpecialist",
          "name": data.name || "Врач-нарколог",
          "medicalSpecialty": "Addiction Medicine",
          "qualifications": "Высшее медицинское образование, специализация по наркологии",
          "availableService": [
            {
              "@type": "MedicalService",
              "name": "Консультация",
              "description": "Первичная консультация по вопросам зависимости"
            }
          ]
        };

      case 'medical-condition':
        return {
          "@context": "https://schema.org",
          "@type": "MedicalCondition",
          "name": data.name || "Зависимость",
          "description": data.description || "Алкогольная или наркотическая зависимость",
          "signOrSymptom": [
            "Потеря контроля над употреблением",
            "Продолжение употребления несмотря на проблемы",
            "Толерантность к веществу"
          ],
          "possibleTreatment": [
            {
              "@type": "MedicalTherapy",
              "name": "Детоксикация",
              "description": "Выведение токсинов из организма"
            },
            {
              "@type": "MedicalTherapy", 
              "name": "Психотерапия",
              "description": "Психологическая помощь и поддержка"
            }
          ]
        };

      default:
        return {};
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateMedicalSchema())
      }}
    />
  );
}
