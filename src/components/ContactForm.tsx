'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(50, 'Имя не должно превышать 50 символов')
    .regex(/^[а-яёА-ЯЁa-zA-Z\s\-']+$/, 'Имя содержит недопустимые символы'),
  phone: z.string()
    .min(10, 'Введите корректный номер телефона')
    .max(20, 'Номер телефона слишком длинный')
    .regex(/^[\d\s\-\+\(\)]+$/, 'Номер телефона содержит недопустимые символы'),
  message: z.string()
    .min(10, 'Сообщение должно содержать минимум 10 символов')
    .max(200, 'Сообщение не должно превышать 200 символов')
    .refine((val) => {
      // Проверяем на повторяющиеся символы
      if (/(.)\1{5,}/.test(val)) return false;
      // Проверяем на однотипные символы
      const uniqueChars = new Set(val.replace(/\s/g, '')).size;
      if (val.length > 20 && uniqueChars < 5) return false;
      return true;
    }, 'Сообщение содержит слишком много повторяющихся символов'),
  csrfToken: z.string().min(1, 'Токен безопасности отсутствует'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [csrfToken, setCsrfToken] = useState<string>('');

  // Генерируем CSRF токен при загрузке компонента
  useEffect(() => {
    const generateToken = () => {
      const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      setCsrfToken(token);
    };
    generateToken();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  // Устанавливаем CSRF токен в форму
  useEffect(() => {
    if (csrfToken) {
      setValue('csrfToken', csrfToken);
    }
  }, [csrfToken, setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Дополнительная проверка на клиенте
      if (data.message.length < 10 || data.message.length > 200) {
        throw new Error('Некорректная длина сообщения');
      }

      // Проверяем на подозрительные паттерны
      const suspiciousPatterns = [
        /(?:viagra|cialis|casino|poker|loan|credit|debt|make money|earn money|work from home)/i,
        /(?:http|https|www\.|\.com|\.ru|\.org)/i,
        /(?:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g,
      ];

      for (const pattern of suspiciousPatterns) {
        if (pattern.test(data.message)) {
          throw new Error('Сообщение содержит недопустимое содержимое');
        }
      }

      // Отправляем данные в наш API endpoint
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        
        // Обрабатываем различные типы ошибок
        if (response.status === 429) {
          throw new Error('Слишком много запросов. Попробуйте позже.');
        } else if (response.status === 400) {
          throw new Error(errorData.details?.join(', ') || errorData.error || 'Ошибка валидации');
        } else {
          throw new Error(errorData.error || 'Ошибка отправки');
        }
      }

      console.log('Form data sent successfully:', data);
      setIsSubmitted(true);
      setError(null);
      reset();
      
      // Генерируем новый CSRF токен после успешной отправки
      const newToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      setCsrfToken(newToken);
      
      // Сброс состояния через 5 секунд
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError(error instanceof Error ? error.message : 'Произошла ошибка при отправке. Попробуйте еще раз или позвоните нам.');
      
      // Скрываем ошибку через 8 секунд для ошибок безопасности
      setTimeout(() => setError(null), 8000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 text-center">
        <div className="text-secondary text-4xl sm:text-6xl mb-3 sm:mb-4">✓</div>
        <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2">
          Спасибо за обращение!
        </h3>
        <p className="text-sm sm:text-base text-green-700">
          Мы свяжемся с вами в ближайшее время для консультации.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 md:p-6">
      <div className="mb-3 sm:mb-4 md:mb-6">
        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-900">
          Получить консультацию
        </h3>
      </div>
      
      <p className="text-xs sm:text-sm md:text-base text-gray-600 mb-3 sm:mb-4 md:mb-6">
        Оставьте заявку, и наш специалист свяжется с вами для бесплатной консультации.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-3 md:space-y-4">
        {/* Скрытое поле для CSRF токена */}
        <input type="hidden" {...register('csrfToken')} />
        
        <div>
          <label htmlFor="name" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Имя *
          </label>
          <div>
            <input
              {...register('name')}
              type="text"
              id="name"
              className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500 text-xs sm:text-sm md:text-base"
              placeholder="Введите ваше полное имя"
              style={{ color: '#000000' }}
              autoComplete="name"
              maxLength={50}
            />
          </div>
          {errors.name && (
            <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Телефон *
          </label>
          <div>
            <input
              {...register('phone')}
              type="tel"
              id="phone"
              className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500 text-xs sm:text-sm md:text-base"
              placeholder="8-812-407-3-407"
              style={{ color: '#000000' }}
              autoComplete="tel"
              maxLength={20}
            />
          </div>
          {errors.phone && (
            <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Сообщение * (максимум 200 символов)
          </label>
          <div>
            <textarea
              {...register('message')}
              id="message"
              rows={3}
              maxLength={200}
              className="w-full px-2.5 sm:px-3 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500 text-xs sm:text-sm md:text-base"
              placeholder="Расскажите о вашей проблеме или задайте вопрос..."
              style={{ color: '#000000' }}
            />
          </div>
          {errors.message && (
            <p className="text-red-600 text-xs sm:text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !csrfToken}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm md:text-base py-2 sm:py-2.5 md:py-3"
        >
          {isSubmitting ? 'Отправка...' : 'Получить консультацию'}
        </button>
      </form>

      {/* Отображение ошибки */}
      {error && (
        <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-xs sm:text-sm">{error}</p>
        </div>
      )}

      <div className="mt-3 sm:mt-4 text-center">
        <p className="text-xs sm:text-sm text-gray-500">
          Или позвоните нам прямо сейчас:
        </p>
        <a
          href="tel:88124073407"
          className="text-sm sm:text-base md:text-lg font-semibold text-blue-600 hover:text-blue-700"
        >
          8-812-407-3-407
        </a>
      </div>

    </div>
  );
};

export default ContactForm; 