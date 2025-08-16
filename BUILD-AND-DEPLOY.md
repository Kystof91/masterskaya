# 🚀 Быстрый старт: Сборка и развертывание

## 📦 Сборка проекта

```bash
# Установка зависимостей
npm ci

# Сборка для продакшена
npm run build

# Проверка сборки
npm run start
```

## 🌐 Развертывание на Vercel (Самый простой способ)

1. **Подготовка:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Vercel:**
   - Зайдите на [vercel.com](https://vercel.com)
   - Подключите GitHub репозиторий
   - Настройте переменные окружения:
     ```
     TELEGRAM_BOT_TOKEN=8427033239:AAHph4NRb6z-Ozjtlblnuq5b6tFigG17CBs
TELEGRAM_CHAT_ID=7991415381
     ```
   - Нажмите "Deploy"

## 🐳 Развертывание с Docker

```bash
# Сборка образа
npm run docker:build

# Запуск контейнера
npm run docker:run

# Или с Docker Compose
docker-compose up -d
```

## 🖥️ Развертывание на VPS

```bash
# На сервере
git clone your-repo
cd your-project

# Установка зависимостей
npm ci --only=production

# Сборка
npm run build

# Запуск с PM2
npm run pm2:start

# Автозапуск
pm2 save
pm2 startup
```

## 🔧 Переменные окружения

Создайте `.env.production`:
```env
TELEGRAM_BOT_TOKEN=8427033239:AAHph4NRb6z-Ozjtlblnuq5b6tFigG17CBs
TELEGRAM_CHAT_ID=7991415381
NEXT_PUBLIC_API_URL=https://your-domain.com
```

## ✅ Проверка

После развертывания проверьте:
- [ ] Сайт открывается
- [ ] Форма обратной связи работает
- [ ] Telegram уведомления приходят
- [ ] Все страницы загружаются

## 🆘 Проблемы?

- Проверьте логи: `npm run pm2:logs`
- Проверьте статус: `pm2 status`
- Убедитесь, что порт 3000 свободен
- Проверьте переменные окружения

## 📚 Подробная документация

См. [README-DEPLOY.md](./README-DEPLOY.md) для детальных инструкций.
