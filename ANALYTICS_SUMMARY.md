# 🎯 Сводка по настройке аналитики

## ✅ Что готово

### 🔧 Техническая настройка
- [x] Компонент `Analytics.tsx` с поддержкой Яндекс.Метрики и Google Analytics
- [x] Компонент `YandexGoals.tsx` для отслеживания целей
- [x] Интеграция в `layout.tsx`
- [x] Переменные окружения настроены
- [x] Скрипт проверки `scripts/check-analytics.js`

### 📊 Функциональность
- [x] Базовый счетчик Яндекс.Метрики
- [x] Базовый счетчик Google Analytics
- [x] Отслеживание целей (goals)
- [x] Вебвизор и карта кликов
- [x] Точный подсчет отказов
- [x] Отслеживание ссылок
- [x] Интеграция с формами

## 🚀 Что нужно сделать

### 1. Создать счетчики
- [ ] Яндекс.Метрика: [metrika.yandex.ru](https://metrika.yandex.ru)
- [ ] Google Analytics: [analytics.google.com](https://analytics.google.com)

### 2. Обновить ID в `env.production`
```bash
NEXT_PUBLIC_GA_ID=G-ВАШ_РЕАЛЬНЫЙ_ID
NEXT_PUBLIC_YANDEX_ID=ВАШ_РЕАЛЬНЫЙ_ID
```

### 3. Перезапустить приложение
```bash
npm run build
npm start
```

## 📈 Отслеживаемые события

### Автоматически
- Просмотры страниц
- Время на сайте
- Глубина прокрутки

### Вручную (уже настроено)
- Отправка форм (`form_submission`)
- Звонки (`phone_call`)
- Просмотры услуг (`service_view`)

## 🔍 Проверка
```bash
node scripts/check-analytics.js
```

## 📚 Документация
- `ANALYTICS_README.md` - полная инструкция
- `QUICK_ANALYTICS_SETUP.md` - быстрый старт
- `YANDEX_METRIKA_SETUP.md` - детальная настройка Яндекс.Метрики

## 🎉 Готово к использованию!

После добавления реальных ID счетчиков аналитика начнет работать автоматически.
