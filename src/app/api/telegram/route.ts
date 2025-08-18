import { NextRequest, NextResponse } from 'next/server';
import { validateAndSanitizeContactForm, logSuspiciousActivity, isBusinessHours } from '@/lib/security';

export async function POST(request: NextRequest) {
  try {
    // Проверяем метод запроса
    if (request.method !== 'POST') {
      return NextResponse.json(
        { error: 'Метод не разрешен' },
        { status: 405 }
      );
    }

    // Проверяем Content-Type
    const contentType = request.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      return NextResponse.json(
        { error: 'Неверный Content-Type' },
        { status: 400 }
      );
    }

    // Получаем и валидируем данные
    const body = await request.json();
    const validationResult = validateAndSanitizeContactForm(body, request);

    if (!validationResult.isValid) {
      // Логируем подозрительную активность
      logSuspiciousActivity(request, 'Validation failed', { errors: validationResult.errors, data: body });
      
      return NextResponse.json(
        { 
          error: 'Данные не прошли валидацию',
          details: validationResult.errors 
        },
        { status: 400 }
      );
    }

    const { sanitizedData } = validationResult;
    if (!sanitizedData) {
      return NextResponse.json(
        { error: 'Ошибка валидации данных' },
        { status: 400 }
      );
    }

    // Проверяем рабочее время (опционально)
    if (!isBusinessHours()) {
      console.log('Form submitted outside business hours');
      // Можно добавить логику для сохранения в очередь или отправки в нерабочее время
    }

    // Получаем токен бота из переменных окружения
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      console.error('TELEGRAM_BOT_TOKEN not configured');
      console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('TELEGRAM')));
      return NextResponse.json(
        { error: 'Конфигурация бота не настроена' },
        { status: 500 }
      );
    }

    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!chatId) {
      console.error('TELEGRAM_CHAT_ID not configured');
      console.error('Available env vars:', Object.keys(process.env).filter(key => key.includes('TELEGRAM')));
      return NextResponse.json(
        { error: 'ID чата не настроен' },
        { status: 500 }
      );
    }

    console.log('Bot configuration loaded:', { botToken: botToken.substring(0, 10) + '...', chatId });

    // Формируем сообщение для Telegram с дополнительной информацией
    const telegramMessage = `🔔 <b>Новая заявка с сайта!</b>

👤 <b>Имя:</b> ${sanitizedData.name}
📱 <b>Телефон:</b> ${sanitizedData.phone}
💬 <b>Сообщение:</b> ${sanitizedData.message}

⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}
🌐 <b>IP:</b> ${request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'}
🕐 <b>Рабочее время:</b> ${isBusinessHours() ? 'Да' : 'Нет'}`;

    // Отправляем сообщение в Telegram
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'HTML'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Telegram API error:', errorData);
      
      // Логируем ошибку Telegram API
      logSuspiciousActivity(request, 'Telegram API error', { 
        telegramError: errorData, 
        data: sanitizedData 
      });
      
      throw new Error(`Ошибка отправки в Telegram: ${errorData.description || 'Неизвестная ошибка'}`);
    }

    const result = await response.json();
    console.log('Message sent to Telegram successfully:', result);

    // Логируем успешную отправку
    console.log('Form submitted successfully:', {
      timestamp: new Date().toISOString(),
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
      data: sanitizedData
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Сообщение успешно отправлено в Telegram' 
    });

  } catch (error) {
    console.error('Error in Telegram API route:', error);
    
    // Логируем ошибку
    logSuspiciousActivity(request, 'Unexpected error', { 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
    
    return NextResponse.json(
      { 
        error: 'Произошла ошибка при отправке сообщения',
        details: error instanceof Error ? error.message : 'Неизвестная ошибка'
      },
      { status: 500 }
    );
  }
}

