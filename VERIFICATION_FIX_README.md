# Исправление проблемы с файлами верификации

## Проблема
Файл верификации Яндекс Вебмастера `yandex_66ce443c9e6aa964.html` возвращал HTTP 308 Permanent Redirect вместо прямого доступа к содержимому.

## Причина
В `vercel.json` было правило rewrite, которое перенаправляло все запросы:
```json
{
  "source": "/(.*)",
  "destination": "/$1"
}
```

Это правило вызывало конфликт с файлами верификации.

## Решение

### 1. Убрано проблемное правило rewrite
Удалено правило `"source": "/(.*)"` из `vercel.json`, которое перенаправляло все запросы.

### 2. Упрощен файл верификации Яндекс Вебмастера
Файл `public/yandex_66ce443c9e6aa964.html` теперь содержит только код верификации:
```
66ce443c9e6aa964
```

### 3. Добавлены специальные заголовки
В `vercel.json` добавлены специальные заголовки для файлов верификации:
- `Content-Type: text/plain; charset=utf-8`
- `Cache-Control: no-cache, no-store, must-revalidate`

### 4. Убраны дублирующие правила
Удалены дублирующие правила редиректов из `next.config.ts`.

## Файлы верификации

### Яндекс Вебмастер
- **Файл**: `/yandex_66ce443c9e6aa964.html`
- **Содержимое**: `66ce443c9e6aa964`
- **URL**: `https://www.mstrclinic.ru/yandex_66ce443c9e6aa964.html`

### Google Search Console
- **Файл**: `/googlef295c1b7371fdbfb.html`
- **Содержимое**: `google-site-verification: googlef295c1b7371fdbfb.html`
- **URL**: `https://www.mstrclinic.ru/googlef295c1b7371fdbfb.html`

## Тестирование

### 1. Через браузер
Откройте файлы верификации напрямую в браузере:
- `https://www.mstrclinic.ru/yandex_66ce443c9e6aa964.html`
- `https://www.mstrclinic.ru/googlef295c1b7371fdbfb.html`

### 2. Через curl
```bash
# Тест заголовков
curl -I "https://www.mstrclinic.ru/yandex_66ce443c9e6aa964.html"

# Тест содержимого
curl -s "https://www.mstrclinic.ru/yandex_66ce443c9e6aa964.html"
```

### 3. Через тестовую страницу
Откройте `/verification-test` для проверки доступности файлов.

## Ожидаемый результат
- HTTP статус: 200 OK
- Content-Type: text/plain
- Содержимое: код верификации без HTML разметки
- Отсутствие редиректов

## Деплой
После внесения изменений необходимо перезапустить приложение на Vercel для применения новой конфигурации.
