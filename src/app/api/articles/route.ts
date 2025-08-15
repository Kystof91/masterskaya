import { NextRequest, NextResponse } from 'next/server';

import { getArticles, addArticle } from '@/lib/serverStorage';

// GET - получение всех статей
export async function GET() {
  try {
    const articles = getArticles();
    return NextResponse.json(articles);
  } catch (error) {
    console.error('Ошибка получения статей:', error);
    return NextResponse.json(
      { error: 'Ошибка получения статей' },
      { status: 500 }
    );
  }
}

// POST - добавление новой статьи
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Валидация данных
    if (!body.title || !body.excerpt || !body.content || !body.category) {
      return NextResponse.json(
        { error: 'Не все обязательные поля заполнены' },
        { status: 400 }
      );
    }

    const newArticle = addArticle({
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      tags: body.tags || [],
      image: body.image || ''
    });
    
    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error('Ошибка добавления статьи:', error);
    return NextResponse.json(
      { error: 'Ошибка добавления статьи' },
      { status: 500 }
    );
  }
}
