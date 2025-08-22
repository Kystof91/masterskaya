# 🚀 Быстрая настройка аналитики

## Яндекс.Метрика

1. **Создайте счетчик**: [metrika.yandex.ru](https://metrika.yandex.ru)
2. **Скопируйте ID** (10 цифр)
3. **Обновите env.production**:
   ```bash
   NEXT_PUBLIC_YANDEX_ID=ВАШ_РЕАЛЬНЫЙ_ID
   ```
4. **Перезапустите приложение**

## Google Analytics

1. **Создайте счетчик**: [analytics.google.com](https://analytics.google.com)
2. **Скопируйте ID** (формат G-XXXXXXXXXX)
3. **Обновите env.production**:
   ```bash
   NEXT_PUBLIC_GA_ID=ВАШ_РЕАЛЬНЫЙ_ID
   ```
4. **Перезапустите приложение**

## Проверка

```bash
node scripts/check-analytics.js
```

## Готово! 🎉

Аналитика автоматически начнет собирать данные после настройки ID.
