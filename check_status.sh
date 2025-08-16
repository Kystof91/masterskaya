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

echo -e "${GREEN}🔍 Проверяем статус сервера...${NC}"

# Функция для автоматического подтверждения SSH команд
sshpass_auto() {
    sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$SERVER_USER@$SERVER_IP" "$1"
}

echo -e "${YELLOW}📊 Статус PM2:${NC}"
sshpass_auto "pm2 status"

echo -e "${YELLOW}🌐 Статус Nginx:${NC}"
sshpass_auto "systemctl status nginx --no-pager -l"

echo -e "${YELLOW}🔒 Статус Firewall:${NC}"
sshpass_auto "ufw status"

echo -e "${YELLOW}💾 Использование диска:${NC}"
sshpass_auto "df -h"

echo -e "${YELLOW}🧠 Использование памяти:${NC}"
sshpass_auto "free -h"

echo -e "${YELLOW}🔥 Активные процессы:${NC}"
sshpass_auto "ps aux | grep -E '(node|nginx)' | grep -v grep"

echo -e "${GREEN}✅ Проверка завершена!${NC}"
