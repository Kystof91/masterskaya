import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { Droplets, Heart, Shield, Zap, Star, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import HealthPageClient from './HealthPageClient';

export const metadata: Metadata = {
  title: 'Здоровье | Мастерская - Лечение зависимостей',
  description: 'Полезная информация о здоровье, профилактике зависимостей, советы специалистов. Центр "Мастерская" в Санкт-Петербурге.',
  keywords: 'здоровье, профилактика зависимостей, советы врачей, здоровый образ жизни, Санкт-Петербург',
  openGraph: {
    title: 'Здоровье | Мастерская - Лечение зависимостей',
    description: 'Советы по поддержанию здоровья и профилактике зависимостей.',
    url: 'https://mstrclinic.ru/health',
    images: ['/logotip.png'],
  },
  alternates: {
    canonical: '/health',
  },
};

export default function HealthPage() {
  return <HealthPageClient />;
}
