'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import SocialIcons from './SocialIcons';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Блокируем прокрутку body когда мобильное меню открыто
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('mobile-menu-open');
      console.log('Mobile menu opened, body class added');
    } else {
      document.body.classList.remove('mobile-menu-open');
      console.log('Mobile menu closed, body class removed');
    }

    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    console.log('Toggle menu clicked, current state:', isMenuOpen);
    console.log('Setting menu to:', !isMenuOpen);
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    console.log('Closing menu');
    setIsMenuOpen(false);
  };

  // Тестовая функция для проверки работы меню
  const testMenu = () => {
    console.log('Testing menu functionality...');
    console.log('Current state:', isMenuOpen);
    console.log('Body classes:', document.body.className);
    
    // Проверяем наличие элементов
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.querySelector('button[aria-controls="mobile-menu"]');
    
    console.log('Mobile menu element:', mobileMenu);
    console.log('Mobile menu button:', mobileMenuButton);
    
    if (mobileMenu) {
      const computedStyle = window.getComputedStyle(mobileMenu);
      console.log('Mobile menu computed styles:', {
        display: computedStyle.display,
        opacity: computedStyle.opacity,
        zIndex: computedStyle.zIndex,
        position: computedStyle.position
      });
    }
  };

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
      {/* Debug indicator - only visible in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="bg-red-500 text-white text-xs p-1 text-center">
          Menu State: {isMenuOpen ? 'OPEN' : 'CLOSED'} | Z-Index: 50
          <button 
            onClick={testMenu}
            className="ml-2 bg-white text-red-500 px-1 rounded text-xs"
          >
            Test
          </button>
        </div>
      )}
      
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 cursor-pointer select-none logo-link" 
            aria-label="Перейти на главную страницу"
            style={{ 
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none',
              userSelect: 'none',
              cursor: 'pointer'
            }}
          >
            <img src="/logotip.png" alt="Логотип клиники Мастерская" className="w-12 h-9 sm:w-16 sm:h-12 pointer-events-none" />
            <div className="text-center pointer-events-none">
              <h1 className="text-lg sm:text-xl font-bold pointer-events-none" style={{color: '#B39A7C'}}>Мастерская</h1>
              <p className="text-xs sm:text-sm pointer-events-none" style={{color: '#B8A895'}}>Лечение зависимостей</p>
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
            onClick={toggleMenu}
            className="md:hidden p-2 sm:p-3 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 active:bg-gray-200 touch-manipulation"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile Navigation - Always rendered but controlled by state */}
        <nav 
          id="mobile-menu" 
          className={`md:hidden fixed inset-0 z-[9999] transition-all duration-300 ${
            isMenuOpen 
              ? 'opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none'
          }`}
          role="navigation" 
          aria-label="Мобильное меню"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              console.log('Background clicked, closing menu');
              closeMenu();
            }
          }}
        >
          <div className={`absolute top-16 sm:top-20 left-0 right-0 bg-white border-t shadow-lg max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-5rem)] overflow-y-auto z-[10000] transition-transform duration-300 ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-full'
          }`}>
            <div className="px-3 sm:px-4 pt-3 sm:pt-4 pb-4 sm:pb-5 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 sm:px-4 py-3 sm:py-4 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors duration-200 text-base font-medium"
                  onClick={() => {
                    console.log('Navigation item clicked:', item.name);
                    closeMenu();
                  }}
                  prefetch={true}
                >
                  {item.name}
                </Link>
              ))}
              <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-3 border-t mt-3">
                <div className="flex flex-col space-y-2">
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
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header; 