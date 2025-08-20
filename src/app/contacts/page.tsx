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
import ContactsPageClient from './ContactsPageClient';

export const metadata: Metadata = {
  title: 'Контакты | Мастерская - Лечение зависимостей',
  description: 'Контакты центра "Мастерская" в Санкт-Петербурге. Адрес: ул. Заставская, 33л. Телефоны: 8-812-407-3-407, +7-911-750-07-00. Круглосуточно.',
  keywords: 'контакты, адрес, телефон, как добраться, Санкт-Петербург, ул. Заставская, круглосуточно',
  openGraph: {
    title: 'Контакты | Мастерская - Лечение зависимостей',
    description: 'Свяжитесь с нами для получения помощи. Адрес, телефоны, схема проезда.',
    url: 'https://mstrclinic.ru/contacts',
    images: ['/logotip.png'],
  },
  alternates: {
    canonical: '/contacts',
  },
};

export default function ContactsPage() {
  return <ContactsPageClient />;
} 