#!/bin/bash

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🔧 Устанавливаем инструменты для деплоя...${NC}"

# Проверяем операционную систему
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo -e "${YELLOW}🍎 Обнаружена macOS${NC}"
    
    # Проверяем наличие Homebrew
    if ! command -v brew &> /dev/null; then
        echo -e "${YELLOW}📦 Устанавливаем Homebrew...${NC}"
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    
    # Устанавливаем sshpass
    if ! command -v sshpass &> /dev/null; then
        echo -e "${YELLOW}🔑 Устанавливаем sshpass...${NC}"
        brew install sshpass
    fi
    
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo -e "${YELLOW}🐧 Обнаружена Linux${NC}"
    
    # Устанавливаем sshpass
    if ! command -v sshpass &> /dev/null; then
        echo -e "${YELLOW}🔑 Устанавливаем sshpass...${NC}"
        if command -v apt-get &> /dev/null; then
            sudo apt-get update && sudo apt-get install -y sshpass
        elif command -v yum &> /dev/null; then
            sudo yum install -y sshpass
        elif command -v dnf &> /dev/null; then
            sudo dnf install -y sshpass
        fi
    fi
fi

# Проверяем наличие Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js не установлен. Установите Node.js версии 18 или выше.${NC}"
    exit 1
fi

# Проверяем версию Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Требуется Node.js версии 18 или выше. Текущая версия: $(node -v)${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js версии $(node -v) обнаружен${NC}"

# Проверяем наличие npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm не установлен${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm обнаружен${NC}"

# Устанавливаем зависимости проекта
echo -e "${YELLOW}📦 Устанавливаем зависимости проекта...${NC}"
npm install

echo -e "${GREEN}🎉 Все инструменты установлены и готовы к использованию!${NC}"
echo -e "${GREEN}🚀 Теперь можно запустить деплой командой: ./fast_deploy.sh${NC}"
