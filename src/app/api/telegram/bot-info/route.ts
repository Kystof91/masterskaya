import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json({
        error: 'Bot configuration incomplete',
        botToken: botToken ? 'Configured' : 'Missing',
        chatId: chatId ? 'Configured' : 'Missing'
      }, { status: 500 });
    }

    // Получаем информацию о боте
    const botInfoResponse = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    
    if (!botInfoResponse.ok) {
      const errorData = await botInfoResponse.json();
      return NextResponse.json({
        error: 'Failed to get bot info',
        telegramError: errorData
      }, { status: 500 });
    }

    const botInfo = await botInfoResponse.json();

    // Проверяем доступ к чату
    const chatInfoResponse = await fetch(`https://api.telegram.org/bot${botToken}/getChat?chat_id=${chatId}`);
    
    if (!chatInfoResponse.ok) {
      const errorData = await chatInfoResponse.json();
      return NextResponse.json({
        error: 'Failed to get chat info',
        telegramError: errorData,
        botInfo: botInfo.result
      }, { status: 500 });
    }

    const chatInfo = await chatInfoResponse.json();

    return NextResponse.json({
      success: true,
      botInfo: botInfo.result,
      chatInfo: chatInfo.result,
      configuration: {
        botToken: botToken.substring(0, 10) + '...',
        chatId: chatId
      }
    });

  } catch (error) {
    console.error('Error in bot-info endpoint:', error);
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST метод для очистки обновлений
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;
    
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    
    if (!botToken) {
      return NextResponse.json({
        error: 'Токен бота не настроен'
      }, { status: 500 });
    }
    
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
