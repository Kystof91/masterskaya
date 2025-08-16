# Инструкция по развертыванию на VPS

## Шаг 1: Подключение к серверу
```bash
ssh root@89.111.170.219
# Пароль: FJKH8wQwpBOobw1T
```

## Шаг 2: Создание директории
```bash
mkdir -p /var/www/medical-center
cd /var/www/medical-center
```

## Шаг 3: Копирование файлов
На локальной машине выполните:
```bash
scp medical-center.tar.gz root@89.111.170.219:/var/www/medical-center/
```

## Шаг 4: Распаковка и установка
На сервере выполните:
```bash
cd /var/www/medical-center
tar -xzf medical-center.tar.gz
rm medical-center.tar.gz
npm install
npm run build
mkdir -p logs
```

## Шаг 5: Запуск с PM2
```bash
pm2 stop medical-center-app 2>/dev/null || true
pm2 delete medical-center-app 2>/dev/null || true
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup
```

## Шаг 6: Настройка файрвола
```bash
ufw allow 3000
ufw allow 80
ufw allow 443
```

## Шаг 7: Настройка Nginx (опционально)
```bash
cp nginx.conf /etc/nginx/sites-available/medical-center
ln -s /etc/nginx/sites-available/medical-center /etc/nginx/sites-enabled/
systemctl restart nginx
```

## Результат
Приложение будет доступно по адресу: http://89.111.170.219:3000
