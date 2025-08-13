#!/bin/bash

# Скрипт для развертывания на сервер
# Использование: ./deploy.sh [production|staging]

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Проверяем аргументы
ENVIRONMENT=${1:-production}
echo -e "${GREEN}Развертывание в окружении: ${ENVIRONMENT}${NC}"

# Проверяем, что мы в правильной директории
if [ ! -f "package.json" ]; then
    echo -e "${RED}Ошибка: package.json не найден. Запустите скрипт из корня проекта.${NC}"
    exit 1
fi

# Устанавливаем зависимости
echo -e "${YELLOW}Установка зависимостей...${NC}"
npm ci --only=production

# Сборка проекта
echo -e "${YELLOW}Сборка проекта...${NC}"
npm run build

# Создаем директорию для логов если её нет
mkdir -p logs

# Останавливаем предыдущий процесс если запущен
echo -e "${YELLOW}Остановка предыдущего процесса...${NC}"
pm2 stop medical-center-app 2>/dev/null || true
pm2 delete medical-center-app 2>/dev/null || true

# Запускаем приложение
echo -e "${YELLOW}Запуск приложения...${NC}"
pm2 start ecosystem.config.js --env ${ENVIRONMENT}

# Сохраняем конфигурацию PM2
pm2 save

# Проверяем статус
echo -e "${YELLOW}Проверка статуса...${NC}"
pm2 status

echo -e "${GREEN}Развертывание завершено успешно!${NC}"
echo -e "${GREEN}Приложение доступно по адресу: http://localhost:3000${NC}"
