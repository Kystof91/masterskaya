#!/bin/bash

echo "🔍 Проверка favicon файлов..."
echo "================================"

# Проверяем наличие favicon файлов
echo "📁 Проверка наличия файлов:"
if [ -f "public/favicon.ico" ]; then
    echo "✅ favicon.ico - найден"
    ls -la public/favicon.ico
else
    echo "❌ favicon.ico - НЕ НАЙДЕН"
fi

if [ -f "public/favicon-16x16.png" ]; then
    echo "✅ favicon-16x16.png - найден"
    ls -la public/favicon-16x16.png
else
    echo "❌ favicon-16x16.png - НЕ НАЙДЕН"
fi

if [ -f "public/favicon-32x32.png" ]; then
    echo "✅ favicon-32x32.png - найден"
    ls -la public/favicon-32x32.png
else
    echo "❌ favicon-32x32.png - НЕ НАЙДЕН"
fi

if [ -f "public/favicon.svg" ]; then
    echo "✅ favicon.svg - найден"
    ls -la public/favicon.svg
else
    echo "❌ favicon.svg - НЕ НАЙДЕН"
fi

if [ -f "public/apple-touch-icon.png" ]; then
    echo "✅ apple-touch-icon.png - найден"
    ls -la public/apple-touch-icon.png
else
    echo "❌ apple-touch-icon.png - НЕ НАЙДЕН"
fi

if [ -f "public/site.webmanifest" ]; then
    echo "✅ site.webmanifest - найден"
    ls -la public/site.webmanifest
else
    echo "❌ site.webmanifest - НЕ НАЙДЕН"
fi

if [ -f "public/browserconfig.xml" ]; then
    echo "✅ browserconfig.xml - найден"
    ls -la public/browserconfig.xml
else
    echo "❌ browserconfig.xml - НЕ НАЙДЕН"
fi

echo ""
echo "🔧 Проверка конфигурации Next.js:"
echo "================================"

# Проверяем наличие favicon в next.config.ts
if grep -q "favicon" next.config.ts; then
    echo "✅ favicon заголовки найдены в next.config.ts"
else
    echo "❌ favicon заголовки НЕ найдены в next.config.ts"
fi

# Проверяем metadata в layout.tsx
if grep -q "favicon" src/app/layout.tsx; then
    echo "✅ favicon metadata найдены в layout.tsx"
else
    echo "❌ favicon metadata НЕ найдены в layout.tsx"
fi

echo ""
echo "🌐 Проверка доступности (если сервер запущен):"
echo "================================"

# Проверяем, запущен ли сервер
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Сервер запущен на localhost:3000"
    
    # Проверяем доступность favicon файлов
    if curl -s -I http://localhost:3000/favicon.ico | grep -q "200"; then
        echo "✅ favicon.ico доступен"
    else
        echo "❌ favicon.ico НЕ доступен"
    fi
    
    if curl -s -I http://localhost:3000/favicon.svg | grep -q "200"; then
        echo "✅ favicon.svg доступен"
    else
        echo "❌ favicon.svg НЕ доступен"
    fi
    
    if curl -s -I http://localhost:3000/site.webmanifest | grep -q "200"; then
        echo "✅ site.webmanifest доступен"
    else
        echo "❌ site.webmanifest НЕ доступен"
    fi
else
    echo "ℹ️  Сервер не запущен. Запустите 'npm run dev' для проверки доступности"
fi

echo ""
echo "📋 Рекомендации:"
echo "================================"
echo "1. Убедитесь, что все favicon файлы находятся в папке public/"
echo "2. Проверьте, что в layout.tsx правильно настроены metadata"
echo "3. Проверьте, что в next.config.ts добавлены заголовки для favicon"
echo "4. Пересоберите проект: npm run build"
echo "5. Очистите кеш браузера и CDN"
echo "6. Проверьте в Google Search Console и Yandex.Webmaster"

echo ""
echo "✅ Проверка завершена!"
