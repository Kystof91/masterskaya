'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';

const documents = [
  {
    id: 'vyписка1',
    title: 'Выписка 1',
    image: '/Выписка1.png',
    description: 'Первая страница выписки'
  },
  {
    id: 'vyписка2',
    title: 'Выписка 2',
    image: '/Выписка2.png',
    description: 'Вторая страница выписки'
  },
  {
    id: 'uvedomlenie',
    title: 'Уведомление',
    image: '/Уведомление.png',
    description: 'Уведомление о деятельности центра'
  }
];

export default function DocumentsSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-12 px-2 sm:px-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Документы центра
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Официальные документы и сертификаты медицинского центра
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-2 sm:px-0">
            {documents.map((doc) => (
              <div 
                key={doc.id}
                className="cursor-pointer group"
                onClick={() => setSelectedImage(doc.image)}
              >
                {/* Миниатюра документа */}
                <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 mb-3 sm:mb-4 group-hover:shadow-xl transition-shadow">
                  <div className="relative w-full h-32 sm:h-40 md:h-48 mb-3 sm:mb-4 overflow-hidden rounded">
                    <Image
                      src={doc.image}
                      alt={doc.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-center text-gray-900 mb-1.5 sm:mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 text-center">
                    {doc.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Модальное окно на весь экран */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-2 sm:p-4">
          <div className="w-full h-full flex flex-col">
            {/* Заголовок */}
            <div className="flex justify-between items-center p-3 sm:p-4 bg-white bg-opacity-10 text-white">
              <h3 className="text-lg sm:text-xl font-semibold">Просмотр документа</h3>
              <button 
                onClick={() => setSelectedImage(null)}
                className="text-white hover:text-gray-300 transition-colors p-1"
                aria-label="Закрыть просмотр документа"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
            
            {/* Изображение документа */}
            <div className="flex-1 p-2 sm:p-4 flex items-center justify-center">
              <div className="relative w-full h-full max-w-4xl">
                <Image
                  src={selectedImage}
                  alt="Документ"
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
