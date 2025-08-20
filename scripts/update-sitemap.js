#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Функция для обновления даты в XML файле
function updateSitemapDate(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    // Обновляем все даты lastmod
    content = content.replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${currentDate}</lastmod>`);
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Обновлен ${filePath} с датой ${currentDate}`);
  } catch (error) {
    console.error(`❌ Ошибка при обновлении ${filePath}:`, error.message);
  }
}

// Основная функция
function main() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  // Обновляем основные sitemap файлы
  const sitemapFiles = [
    'sitemap.xml',
    'sitemap-index.xml'
  ];
  
  sitemapFiles.forEach(file => {
    const filePath = path.join(publicDir, file);
    if (fs.existsSync(filePath)) {
      updateSitemapDate(filePath);
    } else {
      console.log(`⚠️  Файл ${file} не найден`);
    }
  });
  
  console.log('\n🎯 Sitemap файлы обновлены!');
  console.log('📅 Текущая дата:', new Date().toISOString().split('T')[0]);
}

// Запускаем скрипт
if (require.main === module) {
  main();
}

module.exports = { updateSitemapDate };
