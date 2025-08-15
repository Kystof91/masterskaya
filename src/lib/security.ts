import { NextRequest } from 'next/server';

// Интерфейс для данных формы
export interface ContactFormData {
  name: string;
  phone: string;
  message: string;
}

// Интерфейс для результата валидации
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedData?: ContactFormData;
}

// Список подозрительных паттернов
const SUSPICIOUS_PATTERNS = [
  /(?:viagra|cialis|casino|poker|loan|credit|debt|make money|earn money|work from home)/i,
  /(?:http|https|www\.|\.com|\.ru|\.org)/i,
  /(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, // email адреса
  /(?:[0-9]{10,})/g, // длинные последовательности цифр
];

// Список подозрительных User-Agent
const SUSPICIOUS_USER_AGENTS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python/i,
  /java/i,
  /php/i,
  /perl/i,
];

// Функция для очистки и валидации данных
export function validateAndSanitizeContactForm(data: { name?: unknown; phone?: unknown; message?: unknown }, request: NextRequest): ValidationResult {
  const errors: string[] = [];
  
  // Проверяем, что все поля присутствуют и являются строками
  if (typeof data.name !== 'string' || typeof data.phone !== 'string' || typeof data.message !== 'string') {
    errors.push('Все поля обязательны для заполнения и должны быть строками');
    return { isValid: false, errors };
  }
  
  // Проверяем User-Agent
  const userAgent = request.headers.get('user-agent') || '';
  if (SUSPICIOUS_USER_AGENTS.some(pattern => pattern.test(userAgent))) {
    errors.push('Подозрительный User-Agent');
    return { isValid: false, errors };
  }
  
  // Проверяем Referer (должен быть с вашего сайта)
  const referer = request.headers.get('referer');
  if (!referer || !referer.includes(request.nextUrl.origin)) {
    errors.push('Недопустимый источник запроса');
    return { isValid: false, errors };
  }
  
  // Валидация имени
  const name = data.name.trim();
  if (name.length < 2 || name.length > 50) {
    errors.push('Имя должно содержать от 2 до 50 символов');
  }
  
  // Проверяем имя на подозрительные символы
  if (!/^[а-яёА-ЯЁa-zA-Z\s\-']+$/.test(name)) {
    errors.push('Имя содержит недопустимые символы');
  }
  
  // Валидация телефона
  const phone = data.phone.trim();
  if (!/^[\d\s\-\+\(\)]+$/.test(phone) || phone.length < 10 || phone.length > 20) {
    errors.push('Некорректный формат номера телефона');
  }
  
  // Валидация сообщения
  const message = data.message.trim();
  if (message.length < 10 || message.length > 200) {
    errors.push('Сообщение должно содержать от 10 до 200 символов');
  }
  
  // Проверяем сообщение на подозрительные паттерны
  for (const pattern of SUSPICIOUS_PATTERNS) {
    if (pattern.test(message)) {
      errors.push('Сообщение содержит недопустимое содержимое');
      break;
    }
  }
  
  // Проверяем на повторяющиеся символы (возможный спам)
  if (/(.)\1{5,}/.test(message)) {
    errors.push('Сообщение содержит слишком много повторяющихся символов');
  }
  
  // Проверяем на однотипные символы
  const uniqueChars = new Set(message.replace(/\s/g, '')).size;
  if (message.length > 20 && uniqueChars < 5) {
    errors.push('Сообщение содержит слишком мало уникальных символов');
  }
  
  // Если есть ошибки, возвращаем их
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  // Очищаем данные от потенциально опасных символов
  const sanitizedData: ContactFormData = {
    name: name.replace(/[<>]/g, ''), // убираем HTML теги
    phone: phone.replace(/[^\d\s\-\+\(\)]/g, ''), // оставляем только цифры и символы телефона
    message: message.replace(/[<>]/g, '').replace(/javascript:/gi, ''), // убираем HTML и JavaScript
  };
  
  return {
    isValid: true,
    errors: [],
    sanitizedData
  };
}

// Функция для логирования подозрительной активности
export function logSuspiciousActivity(request: NextRequest, reason: string, data?: Record<string, unknown>) {
  const logData = {
    timestamp: new Date().toISOString(),
    ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    referer: request.headers.get('referer') || 'unknown',
    reason,
    data: data ? JSON.stringify(data) : undefined,
    url: request.url,
    method: request.method,
  };
  
  console.warn('SUSPICIOUS ACTIVITY DETECTED:', logData);
  
  // В продакшене здесь можно отправить уведомление в Telegram или другой сервис
  // sendSecurityAlert(logData);
}

// Функция для проверки времени суток (опционально)
export function isBusinessHours(): boolean {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay();
  
  // Рабочие дни (понедельник - пятница) с 9:00 до 18:00
  return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
}

// Функция для генерации CSRF токена
export function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Функция для проверки CSRF токена
export function validateCSRFToken(token: string, storedToken: string): boolean {
  return token === storedToken;
}
