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
  MessageSquare
} from 'lucide-react';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Услуги | Мастерская - Лечение зависимостей',
  description: 'Полный спектр услуг по лечению зависимостей в Санкт-Петербурге: детоксикация, реабилитация, психотерапия, семейная терапия. Анонимно и конфиденциально.',
  keywords: 'детоксикация, реабилитация, психотерапия, семейная терапия, лечение алкоголизма, лечение наркомании, Санкт-Петербург',
  openGraph: {
    title: 'Услуги | Мастерская - Лечение зависимостей',
    description: 'Комплексные услуги по лечению зависимостей: от детоксикации до реабилитации и психотерапии.',
    url: 'https://mstrclinic.ru/services',
    images: ['/logotip.png'],
  },
  alternates: {
    canonical: '/services',
  },
};

export default function ServicesPage() {
  return <ServicesPageClient />;
} 