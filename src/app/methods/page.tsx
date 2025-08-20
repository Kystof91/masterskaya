import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { 
  Heart, 
  Shield, 
  Users, 
  Award, 
  Clock, 
  Phone, 
  CheckCircle,
  Star,
  MapPin,
  Mail,
  Gift
} from 'lucide-react';
import Link from 'next/link';
import MethodsPageClient from './MethodsPageClient';

export const metadata: Metadata = {
  title: 'Методы лечения | Мастерская - Лечение зависимостей',
  description: 'Современные и проверенные методы лечения зависимостей в центре "Мастерская" в Санкт-Петербурге. Индивидуальный подход к каждому пациенту.',
  keywords: 'методы лечения, зависимость, наркология, психотерапия, реабилитация, индивидуальный подход, Санкт-Петербург',
  openGraph: {
    title: 'Методы лечения | Мастерская - Лечение зависимостей',
    description: 'Инновационные и проверенные методики лечения зависимостей.',
    url: 'https://mstrclinic.ru/methods',
    images: ['/logotip.png'],
  },
  alternates: {
    canonical: '/methods',
  },
};

export default function MethodsPage() {
  return <MethodsPageClient />;
} 