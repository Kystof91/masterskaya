#!/bin/bash

# Скрипт для автоматического развертывания на VPS сервер
VPS_IP="89.111.170.219"
VPS_USER="root"
VPS_PASS="FJKH8wQwpBOobw1T"

echo "Начинаем развертывание на VPS сервер..."

# Создаем архив проекта
echo "Создаем архив проекта..."
tar -czf medical-center.tar.gz --exclude=node_modules --exclude=.git --exclude=.next --exclude=medical-center.tar.gz .

# Копируем архив на сервер
echo "Копируем файлы на сервер..."
sshpass -p "$VPS_PASS" scp -o StrictHostKeyChecking=no medical-center.tar.gz $VPS_USER@$VPS_IP:/var/www/medical-center/

# Выполняем команды на сервере
echo "Выполняем команды на сервере..."
sshpass -p "$VPS_PASS" ssh -o StrictHostKeyChecking=no $VPS_USER@$VPS_IP << 'EOF'
cd /var/www/medical-center
tar -xzf medical-center.tar.gz
rm medical-center.tar.gz
npm install
npm run build
mkdir -p logs
pm2 stop medical-center-app 2>/dev/null || true
pm2 delete medical-center-app 2>/dev/null || true
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
EOF

# Удаляем локальный архив
rm medical-center.tar.gz

echo "Развертывание завершено!"
echo "Приложение доступно по адресу: http://$VPS_IP:3000"
