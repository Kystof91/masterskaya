import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Тест аналитики - Мастерская",
  description: "Тестовая страница для проверки работы счетчика Яндекс.Метрики",
};

export default function TestAnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Тест аналитики Яндекс.Метрики
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Проверка счетчика
          </h2>
          <p className="text-gray-600 mb-4">
            Эта страница предназначена для тестирования работы счетчика Яндекс.Метрики.
          </p>
          <p className="text-gray-600 mb-4">
            Откройте консоль разработчика (F12) и проверьте:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Загрузку скрипта Яндекс.Метрики</li>
            <li>Отсутствие ошибок в консоли</li>
            <li>Работу счетчика (проверьте в Яндекс.Метрике)</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Информация о счетчике
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">ID счетчика:</p>
              <p className="font-mono text-lg">103855878</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Статус:</p>
              <p className="text-green-600 font-semibold">Активен</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">
            Как проверить работу счетчика:
          </h3>
          <ol className="list-decimal list-inside text-blue-700 space-y-1">
            <li>Откройте консоль разработчика (F12)</li>
            <li>Перейдите на вкладку Network</li>
            <li>Обновите страницу</li>
            <li>Найдите запросы к mc.yandex.ru</li>
            <li>Проверьте отсутствие ошибок JavaScript</li>
            <li>Убедитесь, что счетчик отображается в Яндекс.Метрике</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

