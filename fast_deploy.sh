#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Конфигурация сервера
SERVER_IP="89.111.170.219"
SERVER_USER="root"
SERVER_PASSWORD="FJKH8wQwpBOobw1T"
PROJECT_NAME="medical-center"
REMOTE_DIR="/var/www/medical-center"

echo -e "${GREEN}🚀 Начинаем быстрый деплой на VPS сервер...${NC}"

# Функция для автоматического подтверждения SSH команд
sshpass_auto() {
    sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$SERVER_USER@$SERVER_IP" "$1"
}

# Функция для автоматического подтверждения SCP команд
scp_auto() {
    sshpass -p "$SERVER_PASSWORD" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -r "$1" "$SERVER_USER@$SERVER_IP:$2"
}

echo -e "${YELLOW}📦 Собираем проект...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Ошибка сборки проекта${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Проект собран успешно${NC}"

echo -e "${YELLOW}🔧 Подготавливаем файлы для деплоя...${NC}"

# Создаем временную папку для деплоя
mkdir -p deploy_temp
cp -r .next deploy_temp/
cp -r public deploy_temp/
cp package.json deploy_temp/
cp package-lock.json deploy_temp/
cp ecosystem.config.js deploy_temp/
cp next.config.ts deploy_temp/
cp tailwind.config.ts deploy_temp/
cp postcss.config.mjs deploy_temp/
cp tsconfig.json deploy_temp/

echo -e "${YELLOW}🌐 Подключаемся к серверу и настраиваем окружение...${NC}"

# Подключаемся к серверу и выполняем настройку
sshpass_auto "mkdir -p $REMOTE_DIR"

echo -e "${YELLOW}📤 Копируем файлы на сервер...${NC}"
scp_auto "deploy_temp/*" "$REMOTE_DIR/"

echo -e "${YELLOW}🔧 Устанавливаем зависимости на сервере...${NC}"
sshpass_auto "cd $REMOTE_DIR && npm ci --only=production"

echo -e "${YELLOW}🚀 Запускаем приложение через PM2...${NC}"
sshpass_auto "cd $REMOTE_DIR && pm2 delete medical-center-app 2>/dev/null || true"
sshpass_auto "cd $REMOTE_DIR && pm2 start ecosystem.config.js --env production"

echo -e "${YELLOW}🔧 Настраиваем Nginx...${NC}"
sshpass_auto "apt update -y"
sshpass_auto "apt install -y nginx"

# Создаем конфигурацию Nginx
NGINX_CONFIG="server {
    listen 80;
    server_name $SERVER_IP;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}"

echo "$NGINX_CONFIG" | sshpass_auto "cat > /etc/nginx/sites-available/medical-center"
sshpass_auto "ln -sf /etc/nginx/sites-available/medical-center /etc/nginx/sites-enabled/"
sshpass_auto "rm -f /etc/nginx/sites-enabled/default"
sshpass_auto "systemctl restart nginx"

echo -e "${YELLOW}🔒 Настраиваем firewall...${NC}"
sshpass_auto "ufw allow 22"
sshpass_auto "ufw allow 80"
sshpass_auto "ufw allow 443"
sshpass_auto "ufw --force enable"

echo -e "${YELLOW}🧹 Очищаем временные файлы...${NC}"
rm -rf deploy_temp

echo -e "${GREEN}🎉 Деплой завершен успешно!${NC}"
echo -e "${GREEN}🌐 Сайт доступен по адресу: http://$SERVER_IP${NC}"
echo -e "${GREEN}📊 PM2 статус:${NC}"
sshpass_auto "pm2 status"

echo -e "${GREEN}✅ Все готово! Сайт работает на сервере.${NC}"
