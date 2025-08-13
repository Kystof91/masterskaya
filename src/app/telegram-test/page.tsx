'use client';

import { useState } from 'react';

interface ChatInfo {
  id: number;
  type: string;
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
}

interface TelegramResult {
  success?: boolean;
  error?: string;
  message?: string;
  chatInfo?: ChatInfo;
  instructions?: string[];
  alternativeMethods?: string[];
}

interface BotInfo {
  success?: boolean;
  error?: string;
  botInfo?: ChatInfo;
  updates?: Array<{
    update_id: number;
    message?: {
      chat: ChatInfo;
      text?: string;
    };
  }>;
  webhookInfo?: {
    url: string;
    has_custom_certificate: boolean;
    pending_update_count: number;
    last_error_date?: number;
    last_error_message?: string;
  };
}

export default function TelegramTestPage() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TelegramResult | null>(null);
  const [botInfo, setBotInfo] = useState<BotInfo | null>(null);

  const getChatId = async () => {
    if (!phoneNumber) return;
    
    setLoading(true);
    try {
      const response = await fetch('/api/telegram/get-chat-id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
      
      const data = await response.json();
      setResult(data);
    } catch {
      setResult({ error: 'Произошла ошибка при отправке запроса' });
    } finally {
      setLoading(false);
    }
  };

  const getBotInfo = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/telegram/bot-info');
      const data = await response.json();
      setBotInfo(data);
    } catch {
      setBotInfo({ error: 'Произошла ошибка при получении информации о боте' });
    } finally {
      setLoading(false);
    }
  };

  const clearUpdates = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/telegram/bot-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'clear_updates' }),
      });
      
      const data = await response.json();
      if (data.success) {
        alert('Обновления очищены!');
        getBotInfo(); // Обновляем информацию
      }
    } catch {
      alert('Ошибка при очистке обновлений');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🔍 Тестирование Telegram Бота
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Левая колонка - получение Chat ID */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-blue-600">
              Получить Chat ID
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Номер телефона (без +)
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="79001234567"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <button
                onClick={getChatId}
                disabled={loading || !phoneNumber}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Отправка...' : 'Отправить тестовое сообщение'}
              </button>
            </div>
            
            {result && (
              <div className="mt-4 p-4 bg-gray-50 rounded-md">
                <h3 className="font-semibold mb-2">Результат:</h3>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </div>
          
          {/* Правая колонка - информация о боте */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-purple-600">
              Информация о боте
            </h2>
            
            <div className="space-y-4">
              <button
                onClick={getBotInfo}
                disabled={loading}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                {loading ? 'Загрузка...' : 'Получить информацию'}
              </button>
              
              <button
                onClick={clearUpdates}
                disabled={loading}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 disabled:opacity-50"
              >
                Очистить обновления
              </button>
            </div>
            
            {botInfo && (
              <div className="mt-4 space-y-4">
                {botInfo.botInfo && (
                  <div className="p-3 bg-green-50 rounded-md">
                    <h4 className="font-semibold text-green-800">Информация о боте:</h4>
                    <pre className="text-sm text-green-700 mt-2">
                      {JSON.stringify(botInfo.botInfo, null, 2)}
                    </pre>
                  </div>
                )}
                
                {botInfo.updates && botInfo.updates.length > 0 && (
                  <div className="p-3 bg-blue-50 rounded-md">
                    <h4 className="font-semibold text-blue-800">
                      Последние обновления ({botInfo.updates.length}):
                    </h4>
                    <pre className="text-sm text-blue-700 mt-2 max-h-40 overflow-y-auto">
                      {JSON.stringify(botInfo.updates, null, 2)}
                    </pre>
                  </div>
                )}
                
                {botInfo.webhookInfo && (
                  <div className="p-3 bg-yellow-50 rounded-md">
                    <h4 className="font-semibold text-yellow-800">Webhook информация:</h4>
                    <pre className="text-sm text-yellow-700 mt-2">
                      {JSON.stringify(botInfo.webhookInfo, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Инструкции */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            📋 Инструкция по получению Chat ID
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h3 className="font-semibold text-blue-600">Метод 1: @userinfobot</h3>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                <li>Найдите бота @userinfobot в Telegram</li>
                <li>Отправьте команду /start</li>
                <li>Бот покажет ваш Chat ID</li>
              </ol>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-purple-600">Метод 2: @RawDataBot</h3>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                <li>Добавьте @RawDataBot в группу</li>
                <li>Отправьте любое сообщение</li>
                <li>Бот покажет детальную информацию</li>
              </ol>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold text-green-600">Метод 3: Через API</h3>
              <ol className="list-decimal list-inside text-sm text-gray-600 space-y-1">
                <li>Напишите вашему боту</li>
                <li>Нажмите &quot;Получить информацию&quot;</li>
                <li>Найдите chat.id в обновлениях</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
