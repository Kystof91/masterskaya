# Инструкция по развертыванию Sitemap

## Быстрый старт

После настройки sitemap файлов выполните следующие шаги для их развертывания:

### 1. Сборка проекта
```bash
npm run build:sitemap
```

Эта команда:
- Собирает Next.js проект
- Обновляет даты в sitemap файлах
- Генерирует все необходимые файлы

### 2. Проверка файлов
```bash
ls -la public/ | grep sitemap
```

Должны быть файлы:
- `sitemap.xml`
- `sitemap-index.xml`
- `robots.txt`

### 3. Тестирование (опционально)
```bash
npm run test-sitemap
```

## Развертывание на Vercel

### Автоматическое развертывание
1. Закоммитьте изменения в Git
2. Запушьте в репозиторий
3. Vercel автоматически соберет проект
4. Sitemap будет доступен по адресу `/sitemap.xml`

### Проверка после развертывания
```bash
curl -I https://mstrclinic.ru/sitemap.xml
curl -I https://mstrclinic.ru/sitemap-index.xml
curl -I https://mstrclinic.ru/robots.txt
```

## Развертывание на VPS

### 1. Копирование файлов
```bash
# Копируем sitemap файлы на сервер
scp public/sitemap.xml user@server:/var/www/html/
scp public/sitemap-index.xml user@server:/var/www/html/
scp public/robots.txt user@server:/var/www/html/
```

### 2. Проверка прав доступа
```bash
# На сервере
chmod 644 /var/www/html/sitemap*.xml
chmod 644 /var/www/html/robots.txt
```

### 3. Перезапуск сервисов
```bash
# Если используете PM2
pm2 restart medical-center-app

# Если используете systemd
sudo systemctl restart your-app.service
```

## Настройка автоматического обновления

### GitHub Actions
Создайте файл `.github/workflows/update-sitemap.yml`:

```yaml
name: Update Sitemap

on:
  schedule:
    - cron: '0 2 * * *'  # Каждый день в 2:00 UTC
  workflow_dispatch:  # Ручной запуск

jobs:
  update-sitemap:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Update sitemap
      run: npm run update-sitemap
    
    - name: Commit and push changes
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        git add public/sitemap*.xml
        git commit -m "Update sitemap dates" || exit 0
        git push
```

### Cron Job (для VPS)
Добавьте в crontab:
```bash
# Открыть crontab
crontab -e

# Добавить строку
0 2 * * * cd /path/to/project && npm run update-sitemap >> /var/log/sitemap-update.log 2>&1
```

## Проверка в поисковых системах

### Google Search Console
1. Перейдите в [Google Search Console](https://search.google.com/search-console)
2. Выберите ваш сайт
3. В левом меню: "Sitemaps"
4. Добавьте URL: `https://mstrclinic.ru/sitemap.xml`
5. Нажмите "Отправить"

### Yandex Webmaster
1. Перейдите в [Yandex Webmaster](https://webmaster.yandex.ru/)
2. Выберите ваш сайт
3. В меню: "Индексирование" → "Sitemap файлы"
4. Добавьте URL sitemap
5. Нажмите "Добавить"

### Bing Webmaster Tools
1. Перейдите в [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Выберите ваш сайт
3. В меню: "Sitemaps"
4. Добавьте URL sitemap

## Мониторинг и поддержка

### Логи обновлений
```bash
# Просмотр логов cron job
tail -f /var/log/sitemap-update.log

# Проверка статуса последнего обновления
ls -la public/sitemap*.xml
```

### Уведомления об ошибках
Настройте уведомления в GitHub Actions или используйте сервисы мониторинга.

### Резервное копирование
```bash
# Создание резервной копии
cp public/sitemap.xml public/sitemap.xml.backup
cp public/sitemap-index.xml public/sitemap-index.xml.backup
cp public/robots.txt public/robots.txt.backup
```

## Устранение проблем

### Проблема: Файлы не обновляются
**Решение:**
1. Проверьте права доступа к папке `scripts/`
2. Убедитесь, что Node.js установлен
3. Проверьте логи выполнения

### Проблема: Sitemap не доступен после развертывания
**Решение:**
1. Проверьте, что файлы скопированы в правильную папку
2. Убедитесь, что веб-сервер настроен правильно
3. Проверьте права доступа к файлам

### Проблема: Поисковые системы не обрабатывают sitemap
**Решение:**
1. Подождите 24-48 часов
2. Проверьте корректность XML
3. Убедитесь, что robots.txt ссылается на sitemap
4. Проверьте статус в Search Console

## Контакты

При возникновении проблем обращайтесь к команде разработки или создавайте issue в репозитории проекта.
