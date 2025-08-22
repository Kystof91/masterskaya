import StructuredData from './StructuredData';

interface LocalSEOProps {
  className?: string;
}

export default function LocalSEO({ className = '' }: LocalSEOProps) {
  // Структурированные данные для локального бизнеса
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Мастерская - Лечение зависимостей",
    "alternateName": "Клиника Мастерская",
    "description": "Медицинский центр по лечению алкогольной и наркотической зависимости в Санкт-Петербурге",
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
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Санкт-Петербург"
      },
      {
        "@type": "City",
        "name": "Ленинградская область"
      },
      {
        "@type": "City",
        "name": "Пушкин"
      },
      {
        "@type": "City",
        "name": "Петергоф"
      },
      {
        "@type": "City",
        "name": "Гатчина"
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
    ],
    "sameAs": [
      "https://vk.com/mstrclinic",
      "https://t.me/mstrclinic"
    ]
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Клиника Мастерская в Санкт-Петербурге
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Контактная информация */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Контактная информация
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">Адрес</p>
                  <p className="text-gray-600">ул. Заставская, 33л, Санкт-Петербург, 196084</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">Телефоны</p>
                  <p className="text-gray-600">8-812-407-3-407</p>
                  <p className="text-gray-600">+7-911-750-07-00</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">Режим работы</p>
                  <p className="text-gray-600">Круглосуточно, без выходных</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Зона обслуживания */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Зона обслуживания
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">Основные районы</p>
                  <p className="text-gray-600">Центральный, Московский, Фрунзенский, Невский</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">Выезд на дом</p>
                  <p className="text-gray-600">По всему Санкт-Петербургу и области</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-5 h-5 text-primary mt-1 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">Лицензия</p>
                  <p className="text-gray-600">№Л041-01148-78/02897906</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Дополнительная информация */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
            Почему выбирают клинику Мастерская?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Анонимность</h4>
              <p className="text-sm text-gray-600">Полная конфиденциальность и анонимность лечения</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Опытные врачи</h4>
              <p className="text-sm text-gray-600">Команда квалифицированных специалистов</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Быстрый результат</h4>
              <p className="text-sm text-gray-600">Эффективные методики лечения зависимостей</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Структурированные данные */}
      <StructuredData type="local-business" data={localBusinessData} />
    </div>
  );
}
