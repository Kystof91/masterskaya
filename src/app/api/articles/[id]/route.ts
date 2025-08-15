import { NextRequest, NextResponse } from 'next/server';

import { getArticleById, updateArticle, deleteArticle } from '../../../../lib/serverStorage';

// GET - получение статьи по ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = parseInt(id);
    const article = getArticleById(articleId);
    
    if (!article) {
      return NextResponse.json(
        { error: 'Статья не найдена' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(article);
  } catch (error) {
    console.error('Ошибка получения статьи:', error);
    return NextResponse.json(
      { error: 'Ошибка получения статьи' },
      { status: 500 }
    );
  }
}

// PUT - обновление статьи
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = parseInt(id);
    const body = await request.json();
    
    // Валидация данных
    if (!body.title || !body.excerpt || !body.content || !body.category) {
      return NextResponse.json(
        { error: 'Не все обязательные поля заполнены' },
        { status: 400 }
      );
    }

    const updatedArticle = updateArticle(articleId, {
      title: body.title,
      excerpt: body.excerpt,
      content: body.content,
      category: body.category,
      tags: body.tags || [],
      image: body.image || ''
    });

    if (!updatedArticle) {
      return NextResponse.json(
        { error: 'Статья не найдена' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('Ошибка обновления статьи:', error);
    return NextResponse.json(
      { error: 'Ошибка обновления статьи' },
      { status: 500 }
    );
  }
}

// DELETE - удаление статьи
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const articleId = parseInt(id);
    
    const success = deleteArticle(articleId);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Статья не найдена' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ошибка удаления статьи:', error);
    return NextResponse.json(
      { error: 'Ошибка удаления статьи' },
      { status: 500 }
    );
  }
}
