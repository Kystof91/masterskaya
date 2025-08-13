// Конфигурация аутентификации
// ВНИМАНИЕ: В реальном продакшн проекте используйте:
// - Переменные окружения (.env)
// - Хеширование паролей (bcrypt)
// - JWT токены
// - HTTPS
// - Rate limiting

// Учетные данные (скрыты в коде)
// В реальном проекте эти данные должны быть в переменных окружения
const AUTH_CREDENTIALS = {
  username: 'Host',
  password: 'Fe09kJ!&'
};

// Дополнительная защита - проверка на пустые значения
export function validateCredentials(username: string, password: string): boolean {
  if (!username || !password) return false;
  
  // Простая проверка (в реальном проекте используйте bcrypt.compare)
  return username === AUTH_CREDENTIALS.username && password === AUTH_CREDENTIALS.password;
}

// Функция для получения placeholder'ов (безопасно)
export function getAuthPlaceholders() {
  return {
    usernamePlaceholder: 'Введите логин',
    passwordPlaceholder: 'Введите пароль'
  };
}

// Функция для получения информации о требованиях к паролю
export function getPasswordRequirements() {
  return {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true
  };
}
