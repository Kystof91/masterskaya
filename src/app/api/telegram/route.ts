import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, message } = body;

    // Валидация данных
    if (!name || !phone || !message) {
      return NextResponse.json(
        { error: 'Не все обязательные поля заполнены' },
        { status: 400 }
      );
    }

    const botToken = '8401717371:AAHyHqkRd4bczZfJKoF4329S8koiq4Ng4Qk';
    

    const chatId = '396946800';
    
    // Формируем сообщение для Telegram
    const telegramMessage = `🔔 Новая заявка с сайта!

👤 Имя: ${name}
📱 Телефон: ${phone}
💬 Сообщение: ${message}

⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

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
      throw new Error(`Ошибка отправки в Telegram: ${errorData.description || 'Неизвестная ошибка'}`);
    }

    const result = await response.json();
    console.log('Message sent to Telegram successfully:', result);

    return NextResponse.json({ 
      success: true, 
      message: 'Сообщение успешно отправлено в Telegram' 
    });

  } catch (error) {
    console.error('Error in Telegram API route:', error);
    return NextResponse.json(
      { 
        error: 'Произошла ошибка при отправке сообщения',
        details: error instanceof Error ? error.message : 'Неизвестная ошибка'
      },
      { status: 500 }
    );
  }
}

