'use client';

import { useState } from 'react';
import { Shield, AlertTriangle, Info, Eye, EyeOff } from 'lucide-react';

export default function SecurityInfo() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <Shield className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-yellow-800">
              Информация о безопасности
            </h3>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-yellow-600 hover:text-yellow-800 transition-colors"
            >
              {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          
          <p className="text-sm text-yellow-700 mb-3">
            Текущая реализация предназначена только для разработки и демонстрации.
          </p>

          {showDetails && (
            <div className="space-y-3 text-sm">
              <div className="bg-white rounded p-3 border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Меры безопасности для продакшена
                </h4>
                <ul className="space-y-1 text-yellow-700">
                  <li>• Использовать переменные окружения (.env)</li>
                  <li>• Хешировать пароли с bcrypt</li>
                  <li>• JWT токены с коротким временем жизни</li>
                  <li>• HTTPS обязателен</li>
                  <li>• Rate limiting для защиты от брутфорса</li>
                  <li>• Серверные сессии вместо localStorage</li>
                </ul>
              </div>
              
              <div className="bg-white rounded p-3 border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
                  <Info className="w-4 h-4 mr-2" />
                  Текущие меры
                </h4>
                <ul className="space-y-1 text-yellow-700">
                  <li>✅ Учетные данные скрыты в коде</li>
                  <li>✅ Placeholder&apos;ы вместо реальных данных</li>
                  <li>✅ Проверка на пустые значения</li>
                  <li>⚠️ localStorage для состояния аутентификации</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
