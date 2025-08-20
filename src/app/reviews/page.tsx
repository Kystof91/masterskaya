import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { 
  Star, 
  Quote, 
  ThumbsUp
} from 'lucide-react';
import ReviewsPageClient from './ReviewsPageClient';

export const metadata: Metadata = {
  title: 'Отзывы | Мастерская - Лечение зависимостей',
  description: 'Реальные отзывы пациентов о лечении зависимостей в центре "Мастерская" в Санкт-Петербурге. Истории успеха и выздоровления.',
  keywords: 'отзывы, пациенты, лечение зависимостей, истории успеха, выздоровление, Санкт-Петербург',
  openGraph: {
    title: 'Отзывы | Мастерская - Лечение зависимостей',
    description: 'Отзывы пациентов о результатах лечения в нашем центре.',
    url: 'https://mstrclinic.ru/reviews',
    images: ['/logotip.png'],
  },
  alternates: {
    canonical: '/reviews',
  },
};

export default function ReviewsPage() {
  return <ReviewsPageClient />;
} 