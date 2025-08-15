'use client';

import { useState } from 'react';

const SecurityInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-700 flex items-center">
          🔒 Безопасность формы
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={isExpanded ? 'Скрыть детали' : 'Показать детали'}
          >
            {isExpanded ? '▼' : '▶'}
          </button>
        </h4>
      </div>
      
      {isExpanded && (
        <div className="mt-3 space-y-2 text-xs text-gray-600">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Защита от спама
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Rate limiting
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              CSRF защита
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Валидация данных
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Фильтрация контента
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Логирование активности
            </div>
          </div>
          
          <div className="pt-2 border-t border-gray-200">
            <p className="text-gray-500">
              Все данные проходят многоуровневую проверку безопасности перед отправкой.
              Подозрительная активность автоматически блокируется и логируется.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecurityInfo;
