import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Простое хранилище для rate limiting (в продакшене лучше использовать Redis)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Конфигурация rate limiting
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 минута
const MAX_REQUESTS_PER_WINDOW = 3; // максимум 3 запроса в минуту
const BLOCK_DURATION = 15 * 60 * 1000; // блокировка на 15 минут при превышении

export function middleware(request: NextRequest) {
  // Применяем rate limiting только к API endpoints
  if (request.nextUrl.pathname.startsWith('/api/telegram')) {
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Создаем уникальный ключ для клиента
    const clientKey = `${clientIP}-${userAgent}`;
    
    const now = Date.now();
    const clientData = rateLimitStore.get(clientKey);
    
    if (clientData) {
      // Проверяем, не истекло ли время окна
      if (now > clientData.resetTime) {
        // Сбрасываем счетчик
        rateLimitStore.set(clientKey, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
      } else {
        // Увеличиваем счетчик
        const newCount = clientData.count + 1;
        
        if (newCount > MAX_REQUESTS_PER_WINDOW) {
          // Блокируем клиента
          const blockUntil = now + BLOCK_DURATION;
          rateLimitStore.set(clientKey, { count: newCount, resetTime: blockUntil });
          
          console.warn(`Rate limit exceeded for ${clientIP}. Blocked until ${new Date(blockUntil).toISOString()}`);
          
          return NextResponse.json(
            { 
              error: 'Слишком много запросов. Попробуйте позже.',
              retryAfter: Math.ceil(BLOCK_DURATION / 1000)
            },
            { 
              status: 429,
              headers: {
                'Retry-After': Math.ceil(BLOCK_DURATION / 1000).toString(),
                'X-RateLimit-Limit': MAX_REQUESTS_PER_WINDOW.toString(),
                'X-RateLimit-Remaining': '0',
                'X-RateLimit-Reset': new Date(now + BLOCK_DURATION).toISOString()
              }
            }
          );
        }
        
        rateLimitStore.set(clientKey, { count: newCount, resetTime: clientData.resetTime });
      }
    } else {
      // Первый запрос от клиента
      rateLimitStore.set(clientKey, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    }
    
    // Очищаем старые записи (каждые 100 запросов)
    if (Math.random() < 0.01) {
      for (const [key, data] of rateLimitStore.entries()) {
        if (now > data.resetTime + 60000) { // удаляем записи старше 1 минуты
          rateLimitStore.delete(key);
        }
      }
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
