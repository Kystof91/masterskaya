'use client';

import { useEffect, useRef } from 'react';

interface YMapOptions {
  center: [number, number];
  zoom: number;
  controls: string[];
}

interface YPlacemarkOptions {
  preset: string;
  iconColor: string;
}

interface YPlacemark {
  geometry: {
    setCoordinates: (coords: [number, number]) => void;
  };
}

interface YMap {
  geoObjects: {
    add: (placemark: YPlacemark) => void;
  };
  setCenter: (coords: [number, number]) => void;
}

interface YMaps {
  ready: (callback: () => void) => void;
  Map: new (element: HTMLElement, options: YMapOptions) => YMap;
  Placemark: new (coords: [number, number], properties: Record<string, unknown>, options: YPlacemarkOptions) => YPlacemark;
  geocode: (query: string) => Promise<{
    geoObjects: {
      getLength: () => number;
      get: (index: number) => {
        geometry: {
          getCoordinates: () => [number, number];
        };
      };
    };
  }>;
}

declare global {
  interface Window {
    ymaps: YMaps;
  }
}

export default function YandexMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Копируем значение ref в переменную для использования в cleanup
    const currentMapRef = mapRef.current;
    
    // Проверяем, загружены ли уже Яндекс.Карты
    if (window.ymaps) {
      initMap();
    } else {
      // Загружаем API Яндекс.Карт без API ключа (ограниченная версия)
      const script = document.createElement('script');
      script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
      script.async = true;
      script.onload = initMap;
      document.head.appendChild(script);
    }

    function initMap() {
      if (!currentMapRef || !window.ymaps) return;

      window.ymaps.ready(() => {
        // Создаем карту
        const map = new window.ymaps.Map(currentMapRef!, {
          center: [59.891652, 30.315590], // Точные координаты ул. Ташкентская, 2
          zoom: 16,
          controls: ['zoomControl', 'fullscreenControl']
        });

        // Добавляем метку
        const placemark = new window.ymaps.Placemark([59.891652, 30.315590], {
          balloonContent: `
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 10px 0; color: #2563eb;">Медицинский центр</h3>
              <p style="margin: 0; color: #374151;">г. Санкт-Петербург, ул. Ташкентская, 2</p>
              <p style="margin: 5px 0 0 0; color: #6b7280;">Круглосуточно</p>
            </div>
          `
        }, {
          preset: 'islands#blueMedicalIcon',
          iconColor: '#2563eb'
        });

        map.geoObjects.add(placemark);

        // Пытаемся найти точные координаты по адресу
        try {
          window.ymaps.geocode('г. Санкт-Петербург, ул. Ташкентская, 2').then((res) => {
            if (res.geoObjects.getLength() > 0) {
              const firstGeoObject = res.geoObjects.get(0);
              const coords = firstGeoObject.geometry.getCoordinates();
              console.log('Найденные координаты для ул. Ташкентская, 2:', coords);
              map.setCenter(coords);
              placemark.geometry.setCoordinates(coords);
            } else {
              console.log('Адрес не найден');
            }
          }).catch((error) => {
            // Если геокодирование не удалось, оставляем карту с примерными координатами
            console.log('Ошибка геокодирования:', error);
            console.log('Геокодирование недоступно, используется примерное расположение');
          });
        } catch (error) {
          console.log('Ошибка геокодирования:', error);
          console.log('Геокодирование недоступно, используется примерное расположение');
        }
      });
    }

    return () => {
      // Очистка при размонтировании компонента
      if (currentMapRef) {
        currentMapRef.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[400px] rounded-lg overflow-hidden">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
