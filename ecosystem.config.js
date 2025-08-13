module.exports = {
  apps: [
    {
      name: 'medical-center-app',
      script: 'server.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      // Автоматический перезапуск при изменении файлов
      watch: false,
      // Перезапуск при сбое
      autorestart: true,
      // Максимальное количество перезапусков
      max_restarts: 10,
      // Время ожидания перед перезапуском
      min_uptime: '10s',
      // Логи
      log_file: './logs/combined.log',
      out_file: './logs/out.log',
      error_file: './logs/error.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      // Мониторинг
      monitor: true,
      // Переменные окружения
      env_file: '.env.production'
    }
  ]
};
