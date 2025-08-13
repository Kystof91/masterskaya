import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const botToken = '8427033239:AAHph4NRb6z-Ozjtlblnuq5b6tFigG17CBs';
    
    // Получаем информацию о боте
    const botInfoResponse = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    const botInfo = await botInfoResponse.json();
    
    // Получаем последние обновления (сообщения, которые получил бот)
    const updatesResponse = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates`);
    const updates = await updatesResponse.json();
    
    // Получаем webhook информацию
    const webhookResponse = await fetch(`https://api.telegram.org/bot${botToken}/getWebhookInfo`);
    const webhookInfo = await webhookResponse.json();
    
    return NextResponse.json({
      success: true,
      botInfo: botInfo.ok ? botInfo.result : null,
      updates: updates.ok ? updates.result : null,
      webhookInfo: webhookInfo.ok ? webhookInfo.result : null,
      instructions: [
        'Для получения Chat ID:',
        '1. Напишите боту в Telegram',
        '2. Проверьте обновления выше',
        '3. Найдите chat.id в обновлениях'
      ]
    });

  } catch (error) {
    console.error('Error in bot-info route:', error);
    return NextResponse.json(
      { 
        error: 'Произошла ошибка при получении информации о боте',
        details: error instanceof Error ? error.message : 'Неизвестная ошибка'
      },
      { status: 500 }
    );
  }
}

// POST метод для очистки обновлений
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;
    
    const botToken = '8427033239:AAHph4NRb6z-Ozjtlblnuq5b6tFigG17CBs';
    
    if (action === 'clear_updates') {
      // Очищаем все обновления
      const response = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates?offset=-1`);
      const result = await response.json();
      
      return NextResponse.json({
        success: true,
        message: 'Обновления очищены',
        result
      });
    }
    
    return NextResponse.json({
      error: 'Неизвестное действие'
    }, { status: 400 });

  } catch (error) {
    console.error('Error in bot-info POST route:', error);
    return NextResponse.json(
      { 
        error: 'Произошла ошибка при выполнении действия',
        details: error instanceof Error ? error.message : 'Неизвестная ошибка'
      },
      { status: 500 }
    );
  }
}
