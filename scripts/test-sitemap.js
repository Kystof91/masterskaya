#!/usr/bin/env node

const https = require('https');
const http = require('http');

// Функция для проверки доступности URL
function checkUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https:') ? https : http;
    
    const req = protocol.get(url, (res) => {
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
          success: res.statusCode === 200
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

// Основная функция тестирования
async function testSitemap() {
  const baseUrl = 'https://mstrclinic.ru';
  const urls = [
    `${baseUrl}/sitemap.xml`,
    `${baseUrl}/sitemap-index.xml`,
    `${baseUrl}/robots.txt`
  ];
  
  console.log('🔍 Тестирование доступности Sitemap файлов...\n');
  
  for (const url of urls) {
    console.log(`Проверяю: ${url}`);
    const result = await checkUrl(url);
    
    if (result.success) {
      console.log(`✅ Статус: ${result.status}`);
      console.log(`📄 Тип: ${result.contentType}`);
      console.log(`📏 Размер: ${result.size} байт`);
    } else {
      console.log(`❌ Ошибка: ${result.error || result.status}`);
    }
    console.log('---');
  }
  
  console.log('\n🎯 Тестирование завершено!');
}

// Запускаем тест
if (require.main === module) {
  testSitemap().catch(console.error);
}

module.exports = { checkUrl, testSitemap };
