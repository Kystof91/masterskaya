'use client';

import React, { useState, useRef } from 'react';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function ImageUpload({ value, onChange, className = '' }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Проверяем тип файла
    if (!file.type.startsWith('image/')) {
      setError('Пожалуйста, выберите изображение');
      return;
    }

    // Проверяем размер файла (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Размер файла не должен превышать 5MB');
      return;
    }

    setError(null);
    setIsUploading(true);

    try {
      // Создаем FormData для отправки файла
      const formData = new FormData();
      formData.append('file', file);

      // Отправляем файл на сервер
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка загрузки файла');
      }

      const data = await response.json();
      
      // Обновляем значение и предварительный просмотр
      onChange(data.filePath);
      setPreview(data.filePath);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка загрузки файла');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    onChange('');
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Изображение статьи
      </label>
      
      {/* Поле для ввода пути к файлу */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => {
            onChange(e.target.value);
            setPreview(e.target.value);
          }}
          placeholder="/path/to/image.jpg или загрузите файл"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleClickUpload}
          disabled={isUploading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>{isUploading ? 'Загрузка...' : 'Выбрать файл'}</span>
        </button>
      </div>

      {/* Скрытый input для выбора файла */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Предварительный просмотр изображения */}
      {preview && (
        <div className="relative">
          <div className="border border-gray-200 rounded-lg p-3 bg-gray-50">
            <div className="flex items-center space-x-3">
              <div className="relative w-16 h-16 bg-gray-200 rounded overflow-hidden">
                <Image
                  src={preview}
                  alt="Предварительный просмотр"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                  onError={() => setPreview(null)}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 font-medium">
                  {preview.split('/').pop()}
                </p>
                <p className="text-xs text-gray-500">
                  Путь: {preview}
                </p>
              </div>
              <button
                type="button"
                onClick={handleRemoveImage}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                title="Удалить изображение"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Сообщение об ошибке */}
      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md p-2">
          {error}
        </div>
      )}

      {/* Информация о поддерживаемых форматах */}
      <div className="text-xs text-gray-500">
        Поддерживаемые форматы: JPG, PNG, GIF, WebP. Максимальный размер: 5MB.
      </div>
    </div>
  );
}
