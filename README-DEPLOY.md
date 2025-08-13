# 🚀 Инструкция по развертыванию

Этот документ содержит инструкции по развертыванию вашего медицинского центра на различные хостинги.

## 📋 Предварительные требования

- Node.js 18+ 
- npm или yarn
- Git

## 🎯 Варианты развертывания

### 1. Vercel (Рекомендуется для начинающих)

**Самый простой способ:**

1. Зарегистрируйтесь на [vercel.com](https://vercel.com)
2. Подключите ваш GitHub репозиторий
3. Vercel автоматически определит Next.js проект
4. Настройте переменные окружения в Vercel Dashboard:
   ```
   TELEGRAM_BOT_TOKEN=your_bot_token
   TELEGRAM_CHAT_ID=your_chat_id
   ```
5. Нажмите "Deploy"

**Преимущества:** Автоматическое развертывание, SSL, CDN, бесплатный план

### 2. Netlify

1. Зарегистрируйтесь на [netlify.com](https://netlify.com)
2. Подключите GitHub репозиторий
3. Настройте команды сборки:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Настройте переменные окружения
5. Развертывайте

### 3. Обычный VPS/Хостинг

#### Подготовка сервера:

```bash
# Обновляем систему
sudo apt update && sudo apt upgrade -y

# Устанавливаем Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Устанавливаем PM2 для управления процессами
sudo npm install -g pm2

# Устанавливаем Nginx
sudo apt install nginx -y

# Устанавливаем Certbot для SSL
sudo apt install certbot python3-certbot-nginx -y
```

#### Развертывание:

1. **Клонируйте проект:**
   ```bash
   git clone your-repository-url
   cd your-project
   ```

2. **Настройте переменные окружения:**
   ```bash
   cp env.example .env.production
   nano .env.production
   # Заполните ваши данные
   ```

3. **Установите зависимости и соберите проект:**
   ```bash
   npm ci --only=production
   npm run build
   ```

4. **Запустите с помощью PM2:**
   ```bash
   pm2 start ecosystem.config.js --env production
   pm2 save
   pm2 startup
   ```

5. **Настройте Nginx:**
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/your-app
   sudo ln -s /etc/nginx/sites-available/your-app /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

6. **Настройте SSL:**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

### 4. Docker

#### Локальный запуск:
```bash
# Сборка образа
docker build -t medical-center-app .

# Запуск контейнера
docker run -p 3000:3000 medical-center-app
```

#### С Docker Compose:
```bash
docker-compose up -d
```

#### На сервере:
```bash
# Сборка и запуск
docker-compose -f docker-compose.yml up -d --build
```

## 🔧 Настройка переменных окружения

Создайте файл `.env.production`:

```env
# Telegram Bot
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here

# API URL
NEXT_PUBLIC_API_URL=https://your-domain.com

# Аналитика (опционально)
NEXT_PUBLIC_GA_ID=your_google_analytics_id
```

## 📱 Настройка Telegram Bot

1. Создайте бота через [@BotFather](https://t.me/botfather)
2. Получите токен бота
3. Добавьте бота в нужный чат
4. Получите ID чата (можно использовать [@userinfobot](https://t.me/userinfobot))
5. Добавьте данные в переменные окружения

## 🚀 Автоматическое развертывание

Используйте скрипт `deploy.sh`:

```bash
# Сделайте скрипт исполняемым
chmod +x deploy.sh

# Запустите развертывание
./deploy.sh production
```

## 📊 Мониторинг

### PM2 команды:
```bash
pm2 status          # Статус процессов
pm2 logs            # Просмотр логов
pm2 monit           # Мониторинг в реальном времени
pm2 restart all     # Перезапуск всех процессов
```

### Логи:
- Логи приложения: `logs/combined.log`
- Стандартный вывод: `logs/out.log`
- Ошибки: `logs/error.log`

## 🔒 Безопасность

- Всегда используйте HTTPS в продакшене
- Регулярно обновляйте зависимости
- Используйте сильные пароли
- Настройте файрвол
- Регулярно делайте бэкапы

## 🆘 Устранение неполадок

### Ошибка "Port already in use":
```bash
# Найдите процесс, использующий порт 3000
sudo lsof -i :3000

# Остановите процесс
sudo kill -9 PID
```

### Ошибка "Permission denied":
```bash
# Проверьте права доступа
sudo chown -R $USER:$USER /path/to/your/app

# Сделайте скрипт исполняемым
chmod +x deploy.sh
```

### Проблемы с Nginx:
```bash
# Проверьте конфигурацию
sudo nginx -t

# Перезапустите Nginx
sudo systemctl restart nginx

# Проверьте статус
sudo systemctl status nginx
```

## 📞 Поддержка

При возникновении проблем:
1. Проверьте логи: `pm2 logs`
2. Проверьте статус: `pm2 status`
3. Проверьте переменные окружения
4. Убедитесь, что все зависимости установлены

## 🎉 Готово!

После успешного развертывания ваш сайт будет доступен по адресу:
- Локально: http://localhost:3000
- В интернете: https://your-domain.com

Не забудьте:
- ✅ Настроить SSL сертификат
- ✅ Настроить домен
- ✅ Протестировать все функции
- ✅ Настроить мониторинг
- ✅ Сделать бэкап
