'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function TelegramTestPage() {
  const [testMenuOpen, setTestMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container-custom section-padding">
        <h1 className="text-3xl font-bold mb-8">Тест мобильного меню</h1>
        
        {/* Тестовая кнопка для мобильного меню */}
        <div className="bg-gray-100 p-6 rounded-lg mb-8">
          <h2 className="text-xl font-semibold mb-4">Тест состояния меню</h2>
          <button
            onClick={() => setTestMenuOpen(!testMenuOpen)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Переключить тестовое меню: {testMenuOpen ? 'Открыто' : 'Закрыто'}
          </button>
          
          <div className="mt-4 p-4 bg-white rounded border">
            <h3 className="font-semibold mb-2">Информация для отладки:</h3>
            <ul className="text-sm space-y-1">
              <li>• Тестовое меню: {testMenuOpen ? 'Открыто' : 'Закрыто'}</li>
              <li>• Размер экрана: <span id="screen-size">Загрузка...</span></li>
              <li>• User Agent: <span id="user-agent">Загрузка...</span></li>
              <li>• Touch support: <span id="touch-support">Загрузка...</span></li>
            </ul>
          </div>
        </div>

        {/* Инструкции по тестированию */}
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">Инструкции по тестированию мобильного меню:</h2>
          <ol className="list-decimal list-inside space-y-2 text-yellow-700">
            <li>Откройте страницу на мобильном устройстве или в DevTools с мобильным размером экрана</li>
            <li>Нажмите на кнопку меню (гамбургер) в правом верхнем углу</li>
            <li>Проверьте, открывается ли мобильное меню</li>
            <li>Проверьте консоль браузера на наличие отладочных сообщений</li>
            <li>Попробуйте нажать на пункты меню</li>
            <li>Попробуйте закрыть меню, нажав на фон</li>
          </ol>
        </div>

        {/* Отладочная информация */}
        <div className="bg-gray-100 p-6 rounded-lg mt-8">
          <h2 className="text-xl font-semibold mb-4">Отладочная информация</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold mb-2">CSS классы body:</h3>
              <code className="text-sm bg-gray-200 p-2 rounded block" id="body-classes">
                Загрузка...
              </code>
            </div>
            <div className="bg-white p-4 rounded border">
              <h3 className="font-semibold mb-2">Z-index элементов:</h3>
              <div className="text-sm space-y-1" id="z-index-info">
                Загрузка...
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <script dangerouslySetInnerHTML={{
        __html: `
          // Обновляем информацию при загрузке страницы
          document.addEventListener('DOMContentLoaded', function() {
            // Размер экрана
            document.getElementById('screen-size').textContent = window.innerWidth + 'x' + window.innerHeight;
            
            // User Agent
            document.getElementById('user-agent').textContent = navigator.userAgent;
            
            // Touch support
            document.getElementById('touch-support').textContent = 'ontouchstart' in window ? 'Да' : 'Нет';
            
            // CSS классы body
            function updateBodyClasses() {
              document.getElementById('body-classes').textContent = document.body.className || 'Нет классов';
            }
            updateBodyClasses();
            
            // Z-index информация
            function updateZIndexInfo() {
              const header = document.querySelector('header');
              const mobileMenu = document.getElementById('mobile-menu');
              const mobileMenuContent = mobileMenu ? mobileMenu.querySelector('div') : null;
              
              let info = '';
              if (header) {
                const headerZ = window.getComputedStyle(header).zIndex;
                info += 'Header: ' + headerZ + '\\n';
              }
              if (mobileMenu) {
                const menuZ = window.getComputedStyle(mobileMenu).zIndex;
                info += 'Mobile Menu: ' + menuZ + '\\n';
              }
              if (mobileMenuContent) {
                const contentZ = window.getComputedStyle(mobileMenuContent).zIndex;
                info += 'Menu Content: ' + contentZ;
              }
              
              document.getElementById('z-index-info').textContent = info || 'Не найдено';
            }
            updateZIndexInfo();
            
            // Обновляем информацию каждые 2 секунды
            setInterval(() => {
              updateBodyClasses();
              updateZIndexInfo();
            }, 2000);
          });
        `
      }} />
    </div>
  );
}
