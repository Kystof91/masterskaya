# Sitemap для медицинского центра

## Обзор

Этот проект содержит настроенные файлы Sitemap для улучшения SEO и индексации сайта поисковыми роботами.

## Файлы Sitemap

### 1. `src/app/sitemap.ts`
- **Назначение**: Динамический генератор sitemap для Next.js App Router
- **Функция**: Автоматически генерирует sitemap.xml при сборке проекта
- **Доступ**: `/sitemap.xml` (после сборки)

### 2. `public/sitemap.xml`
- **Назначение**: Статический sitemap файл
- **Функция**: Немедленно доступен для поисковых роботов
- **Доступ**: `/sitemap.xml`

### 3. `public/sitemap-index.xml`
- **Назначение**: Индексный файл для организации sitemap
- **Функция**: Ссылается на основные sitemap файлы
- **Доступ**: `/sitemap-index.xml`

### 4. `public/robots.txt`
- **Назначение**: Инструкции для поисковых роботов
- **Функция**: Указывает на все sitemap файлы
- **Доступ**: `/robots.txt`

## Структура страниц

### Основные страницы (Priority: 0.8-1.0)
- Главная страница (`/`) - Priority: 1.0, Change Frequency: daily
- Услуги (`/services`) - Priority: 0.9, Change Frequency: monthly
- Здоровье (`/health`) - Priority: 0.8, Change Frequency: weekly
- Цены (`/prices`) - Priority: 0.8, Change Frequency: weekly
- О нас (`/about`) - Priority: 0.8, Change Frequency: monthly
- Контакты (`/contacts`) - Priority: 0.8, Change Frequency: monthly

### Страницы услуг (Priority: 0.7-0.8)
- Детоксикация (`/services/detox`) - Priority: 0.8
- Реабилитация (`/services/rehabilitation`) - Priority: 0.8
- Терапия (`/services/therapy`) - Priority: 0.8
- Семейная терапия (`/services/family-therapy`) - Priority: 0.7
- Послелечебная поддержка (`/services/aftercare`) - Priority: 0.7

### Дополнительные страницы (Priority: 0.6-0.7)
- Методы детоксикации (`/health/detox`) - Priority: 0.7
- Методы реабилитации (`/health/rehabilitation`) - Priority: 0.7
- Психотерапия (`/methods/psychotherapy`) - Priority: 0.6
- Детокс-терапия (`/methods/detox-therapy`) - Priority: 0.6

## Команды для управления

### Обновление дат в sitemap
```bash
npm run update-sitemap
```

### Сборка проекта с обновлением sitemap
```bash
npm run build:sitemap
```

### Ручное обновление
```bash
node scripts/update-sitemap.js
```

## Автоматическое обновление

### GitHub Actions (рекомендуется)
Добавьте в `.github/workflows/deploy.yml`:
```yaml
- name: Update Sitemap
  run: npm run update-sitemap
```

### Cron Job (для VPS)
Добавьте в crontab:
```bash
0 2 * * * cd /path/to/project && npm run update-sitemap
```

## Проверка работоспособности

### 1. Проверка доступности файлов
```bash
curl -I https://mstrclinic.ru/sitemap.xml
curl -I https://mstrclinic.ru/sitemap-index.xml
curl -I https://mstrclinic.ru/robots.txt
```

### 2. Валидация XML
- Используйте онлайн валидаторы XML
- Проверьте структуру через Google Search Console
- Убедитесь в корректности URL-адресов

### 3. Проверка в поисковых системах
- Google Search Console: Sitemaps → Submit sitemap
- Yandex Webmaster: Индексирование → Sitemap файлы
- Bing Webmaster Tools: Sitemaps → Submit Sitemap

## Мониторинг

### Google Search Console
1. Перейдите в раздел "Sitemaps"
2. Добавьте URL: `https://mstrclinic.ru/sitemap.xml`
3. Мониторьте статус обработки
4. Проверяйте ошибки и предупреждения

### Yandex Webmaster
1. Перейдите в "Индексирование" → "Sitemap файлы"
2. Добавьте sitemap URL
3. Отслеживайте статистику индексации

## Рекомендации по SEO

### 1. Регулярное обновление
- Обновляйте sitemap еженедельно
- Добавляйте новые страницы сразу после создания
- Удаляйте неактуальные страницы

### 2. Оптимизация приоритетов
- Главная страница: 1.0
- Ключевые услуги: 0.8-0.9
- Информационные страницы: 0.6-0.7
- Блог: 0.5-0.6

### 3. Частота обновлений
- Главная: daily (ежедневно)
- Услуги: weekly (еженедельно)
- Блог: weekly (еженедельно)
- Статические страницы: monthly (ежемесячно)

## Устранение проблем

### Проблема: Sitemap не обрабатывается
**Решение:**
1. Проверьте доступность файла
2. Убедитесь в корректности XML
3. Проверьте robots.txt
4. Подождите 24-48 часов

### Проблема: Страницы не индексируются
**Решение:**
1. Проверьте приоритеты в sitemap
2. Убедитесь в корректности URL
3. Проверьте мета-теги страниц
4. Используйте Google Search Console для диагностики

### Проблема: Ошибки валидации
**Решение:**
1. Проверьте синтаксис XML
2. Убедитесь в корректности кодировки
3. Проверьте специальные символы в URL
4. Используйте онлайн валидаторы

## Контакты для поддержки

При возникновении проблем с sitemap обращайтесь к команде разработки или создавайте issue в репозитории проекта.
