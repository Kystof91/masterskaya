import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'Файл не найден' },
        { status: 400 }
      );
    }

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Разрешены только изображения' },
        { status: 400 }
      );
    }

    // Проверяем размер файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Размер файла не должен превышать 5MB' },
        { status: 400 }
      );
    }

    // Создаем уникальное имя файла
    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const fileName = `upload_${timestamp}${fileExtension}`;
    
    // Путь для сохранения файла
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const filePath = path.join(uploadDir, fileName);
    
    // Создаем папку uploads, если её нет
    try {
      await mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error('Ошибка создания папки uploads:', error);
    }

    // Конвертируем File в Buffer и сохраняем
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    
    await writeFile(filePath, buffer);
    
    // Возвращаем путь к файлу для использования в статье
    const publicPath = `/uploads/${fileName}`;
    
    return NextResponse.json({ 
      success: true, 
      filePath: publicPath,
      fileName: fileName
    });

  } catch (error) {
    console.error('Ошибка загрузки файла:', error);
    return NextResponse.json(
      { error: 'Ошибка загрузки файла' },
      { status: 500 }
    );
  }
}
