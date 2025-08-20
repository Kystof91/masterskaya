import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import DocumentsSection from '@/components/DocumentsSection';
import { 
  Award, 
  Users, 
  Shield, 
  Heart, 
  CheckCircle,
  Target,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'О нас | Мастерская - Лечение зависимостей',
  description: 'Узнайте о команде специалистов центра "Мастерская" в Санкт-Петербурге. Опытные врачи, современные методики лечения зависимостей, лицензии и сертификаты.',
  keywords: 'врачи наркологи, специалисты по зависимостям, команда врачей, опыт лечения, лицензии, сертификаты, Санкт-Петербург',
  openGraph: {
    title: 'О нас | Мастерская - Лечение зависимостей',
    description: 'Команда специалистов центра "Мастерская" - опытные врачи с многолетним стажем в лечении зависимостей.',
    url: 'https://mstrclinic.ru/about',
    images: ['/logotip.png'],
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
} 