const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/health',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  if (res.statusCode === 200) {
    console.log('✅ Приложение работает нормально');
    process.exit(0);
  } else {
    console.log(`❌ Ошибка: HTTP ${res.statusCode}`);
    process.exit(1);
  }
});

req.on('error', (err) => {
  console.log(`❌ Ошибка соединения: ${err.message}`);
  process.exit(1);
});

req.on('timeout', () => {
  console.log('❌ Таймаут соединения');
  req.destroy();
  process.exit(1);
});

req.end();
