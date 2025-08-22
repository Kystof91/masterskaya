#!/usr/bin/env node

/**
 * Скрипт для проверки настроек аналитики
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Проверка настроек аналитики...\n');

// Проверяем переменные окружения
const envFiles = [
  '.env.local',
  '.env.production',
  'env.production'
];

let analyticsConfig = {};

envFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`📁 Файл ${file}:`);
    const content = fs.readFileSync(file, 'utf8');
    
    const gaMatch = content.match(/NEXT_PUBLIC_GA_ID=(.+)/);
    const yandexMatch = content.match(/NEXT_PUBLIC_YANDEX_ID=(.+)/);
    
    if (gaMatch) {
      const gaId = gaMatch[1].trim();
      console.log(`  ✅ Google Analytics: ${gaId}`);
      analyticsConfig.ga = gaId;
    } else {
      console.log(`  ❌ Google Analytics: не настроен`);
    }
    
    if (yandexMatch) {
      const yandexId = yandexMatch[1].trim();
      console.log(`  ✅ Яндекс.Метрика: ${yandexId}`);
      analyticsConfig.yandex = yandexId;
    } else {
      console.log(`  ❌ Яндекс.Метрика: не настроен`);
    }
    
    console.log('');
  }
});

// Проверяем компонент Analytics
const analyticsComponentPath = path.join(__dirname, '../src/components/Analytics.tsx');
if (fs.existsSync(analyticsComponentPath)) {
  console.log('📁 Компонент Analytics.tsx:');
  const content = fs.readFileSync(analyticsComponentPath, 'utf8');
  
  if (content.includes('yandexId')) {
    console.log('  ✅ Поддержка Яндекс.Метрики');
  } else {
    console.log('  ❌ Поддержка Яндекс.Метрики отсутствует');
  }
  
  if (content.includes('gaId')) {
    console.log('  ✅ Поддержка Google Analytics');
  } else {
    console.log('  ❌ Поддержка Google Analytics отсутствует');
  }
  
  console.log('');
}

// Проверяем layout.tsx
const layoutPath = path.join(__dirname, '../src/app/layout.tsx');
if (fs.existsSync(layoutPath)) {
  console.log('📁 Layout.tsx:');
  const content = fs.readFileSync(layoutPath, 'utf8');
  
  if (content.includes('<Analytics')) {
    console.log('  ✅ Компонент Analytics подключен');
  } else {
    console.log('  ❌ Компонент Analytics не подключен');
  }
  
  if (content.includes('yandexId={process.env.NEXT_PUBLIC_YANDEX_ID}')) {
    console.log('  ✅ Яндекс.Метрика передается в компонент');
  } else {
    console.log('  ❌ Яндекс.Метрика не передается в компонент');
  }
  
  if (content.includes('gaId={process.env.NEXT_PUBLIC_GA_ID}')) {
    console.log('  ✅ Google Analytics передается в компонент');
  } else {
    console.log('  ❌ Google Analytics не передается в компонент');
  }
  
  console.log('');
}

// Рекомендации
console.log('💡 Рекомендации:');
if (!analyticsConfig.yandex || analyticsConfig.yandex === 'XXXXXXXXXX') {
  console.log('  1. Создайте счетчик в Яндекс.Метрике');
  console.log('  2. Добавьте ID в переменные окружения');
  console.log('  3. Перезапустите приложение');
}

if (!analyticsConfig.ga || analyticsConfig.ga === 'G-XXXXXXXXXX') {
  console.log('  4. Создайте счетчик в Google Analytics');
  console.log('  5. Добавьте ID в переменные окружения');
  console.log('  6. Перезапустите приложение');
}

console.log('\n✅ Проверка завершена!');
