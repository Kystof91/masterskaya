'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


const contactSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  message: z.string().min(10, 'Сообщение должно содержать минимум 10 символов').max(200, 'Сообщение не должно превышать 200 символов'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Отправляем данные в наш API endpoint
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Ошибка отправки');
      }

      console.log('Form data sent successfully:', data);
      setIsSubmitted(true);
      setError(null); // Сбрасываем ошибку при успехе
      reset();
      
      // Сброс состояния через 5 секунд
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Произошла ошибка при отправке. Попробуйте еще раз или позвоните нам.');
      // Скрываем ошибку через 5 секунд
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-secondary text-6xl mb-4">✓</div>
        <h3 className="text-xl font-semibold text-green-800 mb-2">
          Спасибо за обращение!
        </h3>
        <p className="text-green-700">
          Мы свяжемся с вами в ближайшее время для консультации.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Получить консультацию
        </h3>
      </div>
      
      <p className="text-gray-600 mb-6">
        Оставьте заявку, и наш специалист свяжется с вами для бесплатной консультации. 
        Все данные строго конфиденциальны.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Имя *
          </label>
          <div>
            <input
              {...register('name')}
              type="text"
              id="name"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500"
              placeholder="Введите ваше полное имя"
              style={{ color: '#000000' }}
            />
          </div>
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Телефон *
          </label>
          <div>
            <input
              {...register('phone')}
              type="tel"
              id="phone"
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500"
              placeholder="+7 (999) 123-45-67"
              style={{ color: '#000000' }}
            />
          </div>
          {errors.phone && (
            <p className="text-red-600 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Сообщение * (максимум 200 символов)
          </label>
          <div>
            <textarea
              {...register('message')}
              id="message"
              rows={4}
              maxLength={200}
              className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black placeholder-gray-500"
              placeholder="Расскажите о вашей проблеме или задайте вопрос..."
              style={{ color: '#000000' }}
            />
          </div>
          {errors.message && (
            <p className="text-red-600 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Отправка...' : 'Получить консультацию'}
        </button>
      </form>

      {/* Отображение ошибки */}
      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Или позвоните нам прямо сейчас:
        </p>
        <a
          href="tel:88005550123"
          className="text-lg font-semibold text-blue-600 hover:text-blue-700"
        >
          8-812-407-34-07
        </a>
      </div>
    </div>
  );
};

export default ContactForm; 