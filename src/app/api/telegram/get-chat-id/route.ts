import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber } = body;

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'Необходимо указать номер телефона' },
        { status: 400 }
      );
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!botToken) {
      return NextResponse.json(
        { error: 'Токен бота не настроен' },
        { status: 500 }
      );
    }
    
    // Отправляем тестовое сообщение на указанный номер
    const testMessage = `🔍 Тестовое сообщение для получения Chat ID

Это сообщение отправлено для определения Chat ID.
Если вы его получили, значит бот работает корректно.

📱 Номер: ${phoneNumber}
⏰ Время: ${new Date().toLocaleString('ru-RU')}

Для получения Chat ID:
1. Добавьте бота @userinfobot в чат
2. Отправьте команду /start
3. Бот покажет ваш Chat ID`;

    // Сначала попробуем отправить в личные сообщения
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: `@${phoneNumber}`,
        text: testMessage,
        parse_mode: 'HTML'
      }),
    });

    if (response.ok) {
      const result = await response.json();
      return NextResponse.json({ 
        success: true, 
        message: 'Тестовое сообщение отправлено. Проверьте Telegram.',
        chatInfo: result.result.chat,
        instructions: [
          '1. Добавьте бота @userinfobot в чат',
          '2. Отправьте команду /start',
          '3. Бот покажет ваш Chat ID',
          '4. Используйте этот ID в настройках'
        ]
      });
    } else {
      // Если не удалось отправить, возвращаем инструкции
      return NextResponse.json({ 
        success: false, 
        message: 'Не удалось отправить сообщение автоматически',
        instructions: [
          '1. Найдите бота @userinfobot в Telegram',
          '2. Отправьте ему команду /start',
          '3. Бот покажет ваш Chat ID',
          '4. Используйте этот ID в настройках'
        ],
        alternativeMethods: [
          'Добавьте бота в группу и отправьте /start',
          'Или используйте @RawDataBot для получения информации о чате'
        ]
      });
    }

  } catch (error) {
    console.error('Error in get-chat-id route:', error);
    return NextResponse.json(
      { 
        error: 'Произошла ошибка при попытке получить Chat ID',
        details: error instanceof Error ? error.message : 'Неизвестная ошибка'
      },
      { status: 500 }
    );
  }
}

// GET метод для получения инструкций
export async function GET() {
  return NextResponse.json({
    message: 'Инструкция по получению Chat ID',
    methods: [
      {
        name: 'Через @userinfobot',
        steps: [
          '1. Найдите бота @userinfobot в Telegram',
          '2. Отправьте команду /start',
          '3. Бот покажет ваш Chat ID'
        ]
      },
      {
        name: 'Через @RawDataBot',
        steps: [
          '1. Добавьте @RawDataBot в группу',
          '2. Отправьте любое сообщение',
          '3. Бот покажет детальную информацию о чате'
        ]
      },
      {
        name: 'Через веб-версию Telegram',
        steps: [
          '1. Откройте web.telegram.org',
          '2. Отправьте сообщение боту @userinfobot',
          '3. Получите Chat ID'
        ]
      }
    ]
  });
}
