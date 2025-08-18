#!/bin/bash

echo "Тестирование файлов верификации..."
echo "=================================="

# Тест файла Яндекс Вебмастера
echo "1. Тестируем файл Яндекс Вебмастера:"
curl -I "https://www.mstrclinic.ru/yandex_66ce443c9e6aa964.html" 2>/dev/null | head -10

echo -e "\n2. Содержимое файла Яндекс Вебмастера:"
curl -s "https://www.mstrclinic.ru/yandex_66ce443c9e6aa964.html"

echo -e "\n\n3. Тестируем файл Google Search Console:"
curl -I "https://www.mstrclinic.ru/googlef295c1b7371fdbfb.html" 2>/dev/null | head -10

echo -e "\n4. Содержимое файла Google Search Console:"
curl -s "https://www.mstrclinic.ru/googlef295c1b7371fdbfb.html"

echo -e "\n\nТестирование завершено!"
