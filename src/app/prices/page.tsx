import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { 
  CheckCircle, 
  Star, 
  Shield, 
  Clock, 
  Users,
  Heart,
  Award,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import PricesPageClient from './PricesPageClient';

export const metadata: Metadata = {
  title: 'Цены | Мастерская - Лечение зависимостей',
  description: 'Актуальные цены на услуги центра "Мастерская" в Санкт-Петербурге. Стоимость детоксикации, реабилитации, психотерапии. Бесплатная консультация.',
  keywords: 'цены, стоимость, детоксикация, реабилитация, психотерапия, лечение зависимостей, Санкт-Петербург',
  openGraph: {
    title: 'Цены | Мастерская - Лечение зависимостей',
    description: 'Прозрачное ценообразование на все услуги центра. Бесплатная первичная консультация.',
    url: 'https://mstrclinic.ru/prices',
    images: ['/logotip.png'],
  },
  alternates: {
    canonical: '/prices',
  },
};

export default function PricesPage() {
  return <PricesPageClient />;
} 