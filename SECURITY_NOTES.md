# Инструкции по безопасности для админ-панели

## ⚠️ ВАЖНО: Безопасность в продакшене

Текущая реализация аутентификации предназначена **ТОЛЬКО для разработки и демонстрации**.

### 🚨 Что НЕ безопасно в текущей версии:

1. **Учетные данные в коде** - логин и пароль хранятся в исходном коде
2. **Отсутствие хеширования** - пароли не зашифрованы
3. **Простая проверка** - нет защиты от брутфорса
4. **localStorage** - токены хранятся в браузере без шифрования
5. **HTTP** - данные передаются в открытом виде

### 🔒 Что нужно реализовать для продакшена:

#### 1. Переменные окружения
```bash
# .env (НЕ коммитить в git!)
ADMIN_USERNAME=Host
ADMIN_PASSWORD=Fe09kJ!&
JWT_SECRET=your-super-secret-key-here
```

#### 2. Хеширование паролей
```typescript
import bcrypt from 'bcrypt';

// При создании пользователя
const hashedPassword = await bcrypt.hash(password, 12);

// При проверке
const isValid = await bcrypt.compare(password, hashedPassword);
```

#### 3. JWT токены
```typescript
import jwt from 'jsonwebtoken';

// Создание токена
const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, { 
  expiresIn: '1h' 
});

// Проверка токена
const decoded = jwt.verify(token, process.env.JWT_SECRET);
```

#### 4. HTTPS
```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/admin',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          }
        ]
      }
    ];
  }
};
```

#### 5. Rate Limiting
```typescript
import rateLimit from 'express-rate-limit';

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 5, // максимум 5 попыток
  message: 'Слишком много попыток входа'
});
```

#### 6. Сессии на сервере
```typescript
// Вместо localStorage использовать серверные сессии
import session from 'express-session';

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: true, // только для HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 часа
  }
}));
```

### 🛡️ Дополнительные меры безопасности:

1. **Двухфакторная аутентификация (2FA)**
2. **Логирование всех действий**
3. **IP-фильтрация**
4. **Автоматическая блокировка при подозрительной активности**
5. **Регулярная смена паролей**
6. **Мониторинг безопасности**

### 📋 Чек-лист безопасности:

- [ ] Учетные данные в переменных окружения
- [ ] Пароли захешированы с bcrypt
- [ ] JWT токены с коротким временем жизни
- [ ] HTTPS включен
- [ ] Rate limiting настроен
- [ ] Сессии на сервере
- [ ] Логирование действий
- [ ] 2FA (опционально)
- [ ] Регулярные проверки безопасности

### 🔐 Текущие учетные данные (ТОЛЬКО для разработки):

- **Логин:** `Host`
- **Пароль:** `Fe09kJ!&`

### 📝 Примечание:

Эти учетные данные **НЕ должны использоваться в продакшене**. 
Создайте новые, более сложные учетные данные и используйте все перечисленные выше меры безопасности.


