'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import SocialIcons from './SocialIcons';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Главная', href: '/' },
    { name: 'О центре', href: '/about' },
    { name: 'Услуги', href: '/services' },
    { name: 'Здоровье', href: '/health' },
    { name: 'Методики', href: '/methods' },
    { name: 'Цены', href: '/prices' },
    { name: 'Отзывы', href: '/reviews' },
    { name: 'Блог', href: '/blog' },
    { name: 'Контакты', href: '/contacts' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" role="banner">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2" aria-label="Перейти на главную страницу">
            <img src="/logotip.png" alt="Логотип клиники Мастерская" className="w-16 h-12" />
            <div className="text-center">
              <h1 className="text-xl font-bold" style={{color: '#B39A7C'}}>Мастерская</h1>
              <p className="text-sm" style={{color: '#B8A895'}}>Лечение зависимостей</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4" role="navigation" aria-label="Главное меню">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-base text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex flex-col items-start space-y-1">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <span>8-812-407-3-407</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" aria-hidden="true" />
                <a href="tel:+79117500700" className="hover:text-blue-600 transition-colors">
                  +7-911-750-07-00
                </a>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>Круглосуточно</span>
            </div>
            <SocialIcons className="ml-2" iconSize={18} variant="light" />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav 
            id="mobile-menu" 
            className="md:hidden" 
            role="navigation" 
            aria-label="Мобильное меню"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2 space-y-2">
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <span>8-812-407-3-407</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    <a href="tel:+79117500700" className="hover:text-blue-600 transition-colors">+7-911-750-07-00</a>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  <span>Круглосуточно</span>
                </div>
                <div className="pt-2">
                  <SocialIcons iconSize={20} variant="light" />
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header; 