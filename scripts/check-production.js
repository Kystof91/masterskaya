#!/usr/bin/env node

const https = require('https');

// Функция для проверки URL
function checkUrl(url) {
  return new Promise((resolve) => {
    const req = https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        resolve({
          url,
          status: res.statusCode,
          contentType: res.headers['content-type'],
          size: data.length,
          success: res.statusCode === 200,
          data: data
        });
      });
    });
    
    req.on('error', (error) => {
      resolve({
        url,
        error: error.message,
        success: false
      });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        url,
        error: 'Timeout',
        success: false
      });
    });
  });
}

// Основная функция проверки
async function checkProduction() {
  const baseUrl = 'https://www.mstrclinic.ru';
  const urls = [
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/sitemap-index.xml`,
    `${baseUrl}/robots.txt`
  ];
  
  console.log('🔍 Проверка Sitemap файлов на продакшене...\n');
  
  for (const url of urls) {
    console.log(`Проверяю: ${url}`);
    const result = await checkUrl(url);
    
    if (result.success) {
      console.log(`✅ Статус: ${result.status}`);
      console.log(`📄 Тип: ${result.contentType}`);
      console.log(`📏 Размер: ${result.size} байт`);
      
      // Показываем первые несколько строк для sitemap файлов
      if (url.includes('sitemap') && result.data) {
        const lines = result.data.split('\n').slice(0, 5);
        console.log(`📝 Начало файла:`);
        lines.forEach(line => console.log(`   ${line}`));
      }
    } else {
      console.log(`❌ Ошибка: ${result.error || result.status}`);
    }
    console.log('---');
  }
  
  console.log('\n🎯 Проверка завершена!');
  console.log('\n📋 Рекомендации:');
  console.log('1. Если sitemap-index.xml недоступен, подождите 5-10 минут');
  console.log('2. Vercel может обрабатывать изменения асинхронно');
  console.log('3. Проверьте статус деплоя в Vercel Dashboard');
}

// Запускаем проверку
if (require.main === module) {
  checkProduction().catch(console.error);
}

module.exports = { checkUrl, checkProduction };
