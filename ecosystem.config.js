module.exports = {
  apps: [
    {
      name: 'medical-center-app',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      instances: 1,
      exec_mode: 'fork',
      cwd: '/var/www/medical-center',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '0.0.0.0',
        TELEGRAM_BOT_TOKEN: '8427033239:AAHph4NRb6z-Ozjtlblnuq5b6tFigG17CBs',
        TELEGRAM_CHAT_ID: '7991415381'
      },
      // Отключаем watch для продакшена
      watch: false,
      // Автоматический перезапуск при сбое
      autorestart: true,
      // Максимальное количество перезапусков
      max_restarts: 5,
      // Время ожидания перед перезапуском
      min_uptime: '10s',
      // Логи
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      // Мониторинг
      monitor: false,
      // Переменные окружения
      env_file: '.env.production'
    }
  ]
};
