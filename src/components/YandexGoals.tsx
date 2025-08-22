'use client';

/**
 * Компонент для отслеживания целей Яндекс.Метрики
 * Используется для отслеживания важных событий на сайте
 */

declare global {
  interface Window {
    ym: (id: string, action: string, goal: string, params?: Record<string, unknown>) => void;
  }
}

interface YandexGoalsProps {
  yandexId?: string;
}

export default function YandexGoals({ yandexId }: YandexGoalsProps) {
  if (!yandexId || typeof window === 'undefined') return null;

  // Функция для отправки целей
  const trackGoal = (goal: string, params?: Record<string, unknown>) => {
    if (window.ym && yandexId) {
      window.ym(yandexId, 'reachGoal', goal, params);
      console.log(`🎯 Яндекс.Метрика: цель "${goal}" отправлена`, params);
    }
  };

  // Отслеживание заявок через формы
  const trackFormSubmission = (formType: string) => {
    trackGoal('form_submission', { form_type: formType });
  };

  // Отслеживание звонков
  const trackPhoneCall = (phoneNumber: string) => {
    trackGoal('phone_call', { phone: phoneNumber });
  };

  // Отслеживание просмотров услуг
  const trackServiceView = (serviceName: string) => {
    trackGoal('service_view', { service: serviceName });
  };

  // Отслеживание времени на сайте
  const trackTimeOnSite = (seconds: number) => {
    if (seconds >= 60) { // Отправляем цель каждую минуту
      trackGoal('time_on_site', { seconds });
    }
  };

  // Отслеживание прокрутки страницы
  const trackScrollDepth = (percentage: number) => {
    if (percentage >= 25 && percentage % 25 === 0) { // 25%, 50%, 75%, 100%
      trackGoal('scroll_depth', { percentage });
    }
  };

  // Экспортируем функции для использования в других компонентах
  if (typeof window !== 'undefined') {
    (window as any).yandexGoals = {
      trackFormSubmission,
      trackPhoneCall,
      trackServiceView,
      trackTimeOnSite,
      trackScrollDepth,
      trackGoal
    };
  }

  return null;
}

// Хук для использования в компонентах
export const useYandexGoals = () => {
  if (typeof window === 'undefined') return null;
  
  return (window as any).yandexGoals || {
    trackFormSubmission: () => {},
    trackPhoneCall: () => {},
    trackServiceView: () => {},
    trackTimeOnSite: () => {},
    trackScrollDepth: () => {},
    trackGoal: () => {}
  };
};
