import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight,
  ThumbsUp
} from 'lucide-react';
import { articlesData, Article } from './data';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Блог | Мастерская - Лечение зависимостей',
  description: 'Полезные статьи о лечении зависимостей, советы специалистов, новости медицины. Центр "Мастерская" в Санкт-Петербурге.',
  keywords: 'блог, статьи, лечение зависимостей, советы врачей, новости медицины, наркология, Санкт-Петербург',
  openGraph: {
    title: 'Блог | Мастерская - Лечение зависимостей',
    description: 'Информативные статьи о лечении зависимостей от специалистов центра.',
    url: 'https://mstrclinic.ru/blog',
    images: ['/logotip.png'],
  },
  alternates: {
    canonical: '/blog',
  },
};

export default function BlogPage() {
  return <BlogPageClient />;
} 