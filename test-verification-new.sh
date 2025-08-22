#!/bin/bash

echo "🔍 Проверка файлов верификации..."
echo ""

echo "📁 Старый файл верификации Яндекс:"
echo "URL: https://mstrclinic.ru/yandex_66ce443c9e6aa964.html"
curl -I "https://mstrclinic.ru/yandex_66ce443c9e6aa964.html" 2>/dev/null | head -10
echo ""
echo "Содержимое:"
curl -s "https://mstrclinic.ru/yandex_66ce443c9e6aa964.html"
echo ""
echo ""

echo "📁 Новый файл верификации Яндекс:"
echo "URL: https://mstrclinic.ru/yandex_70d29db80d4b9a25.html"
curl -I "https://mstrclinic.ru/yandex_70d29db80d4b9a25.html" 2>/dev/null | head -10
echo ""
echo "Содержимое:"
curl -s "https://mstrclinic.ru/yandex_70d29db80d4b9a25.html"
echo ""
echo ""

echo "📁 Google Search Console:"
echo "URL: https://mstrclinic.ru/googlef295c1b7371fdbfb.html"
curl -I "https://mstrclinic.ru/googlef295c1b7371fdbfb.html" 2>/dev/null | head -10
echo ""
echo "Содержимое:"
curl -s "https://mstrclinic.ru/googlef295c1b7371fdbfb.html"
echo ""
echo ""

echo "✅ Проверка завершена!"
