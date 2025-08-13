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
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Документы центра
            </h2>
            <p className="text-xl text-gray-600">
              Официальные документы и сертификаты медицинского центра
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {documents.map((doc) => (
              <div 
                key={doc.id}
                className="cursor-pointer group"
                onClick={() => setSelectedImage(doc.image)}
              >
                {/* Миниатюра документа */}
                <div className="bg-white rounded-lg shadow-lg p-4 mb-4 group-hover:shadow-xl transition-shadow">
                  <div className="relative w-full h-48 mb-4 overflow-hidden rounded">
                    <Image
                      src={doc.image}
                      alt={doc.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-center text-gray-900 mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center">
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
        <div className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50 p-4">
          <div className="w-full h-full flex flex-col">
            {/* Заголовок */}
            <div className="flex justify-between items-center p-4 bg-white bg-opacity-10 text-white">
              <h3 className="text-xl font-semibold">Просмотр документа</h3>
              <button 
                onClick={() => setSelectedImage(null)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Изображение документа */}
            <div className="flex-1 p-4 flex items-center justify-center">
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
