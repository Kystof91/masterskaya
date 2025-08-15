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
      if (!mapRef.current || !window.ymaps) return;

      window.ymaps.ready(() => {
        // Создаем карту
        const map = new window.ymaps.Map(mapRef.current!, {
          center: [59.8918, 30.3173], // Примерные координаты ул. Заставская, 33л
          zoom: 16,
          controls: ['zoomControl', 'fullscreenControl']
        });

        // Добавляем метку
        const placemark = new window.ymaps.Placemark([59.8918, 30.3173], {
          balloonContent: `
            <div style="padding: 10px;">
              <h3 style="margin: 0 0 10px 0; color: #2563eb;">Медицинский центр</h3>
              <p style="margin: 0; color: #374151;">г. Санкт-Петербург, ул. Заставская, 33л</p>
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
          window.ymaps.geocode('г. Санкт-Петербург, ул. Заставская, 33л').then((res) => {
            if (res.geoObjects.getLength() > 0) {
              const firstGeoObject = res.geoObjects.get(0);
              const coords = firstGeoObject.geometry.getCoordinates();
              map.setCenter(coords);
              placemark.geometry.setCoordinates(coords);
            }
          }).catch(() => {
            // Если геокодирование не удалось, оставляем карту с примерными координатами
            console.log('Геокодирование недоступно, используется примерное расположение');
          });
        } catch {
          console.log('Геокодирование недоступно, используется примерное расположение');
        }
      });
    }

    return () => {
      // Очистка при размонтировании компонента
      const currentMapRef = mapRef.current;
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
