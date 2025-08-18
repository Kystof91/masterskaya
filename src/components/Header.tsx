'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, MapPin, ChevronRight } from 'lucide-react';
import SocialIcons from './SocialIcons';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();
  
  // Refs для touch событий
  const menuRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const touchStartTime = useRef<number>(0);
  const touchDistance = useRef<number>(0);
  const isSwiping = useRef<boolean>(false);

  // Блокируем прокрутку когда мобильное меню открыто
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Обработка нажатия Escape
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isMenuOpen]);

  // Touch handlers для свайпа
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMenuOpen || isAnimating) return;
    
    // Проверяем, что свайп начинается в заголовке меню
    const target = e.target as HTMLElement;
    const isInHeader = target.closest('.menu-header');
    
    if (!isInHeader) return; // Разрешаем свайп только в заголовке
    
    touchStartY.current = e.touches[0].clientY;
    touchStartTime.current = Date.now();
    touchDistance.current = 0;
    isSwiping.current = false;
    
    // Добавляем класс для состояния свайпа
    if (menuRef.current) {
      menuRef.current.classList.add('swiping');
    }
    
    // Предотвращаем прокрутку при свайпе
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isMenuOpen || isAnimating || !isSwiping.current) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartY.current;
    
    // Проверяем, что свайп идет вниз (положительный deltaY)
    if (deltaY > 0) {
      touchDistance.current = deltaY;
      
      // Добавляем визуальную обратную связь - двигаем меню вниз
      if (menuRef.current) {
        const menuContent = menuRef.current.querySelector('.bg-white') as HTMLElement;
        if (menuContent) {
          const translateY = Math.min(deltaY * 0.6, 150); // Увеличиваем чувствительность
          menuContent.style.transform = `translateY(${translateY}px)`;
          menuContent.style.transition = 'none';
          
          // Добавляем прозрачность фона в зависимости от расстояния свайпа
          const overlay = menuRef.current.querySelector('.bg-black\\/60') as HTMLElement;
          if (overlay) {
            const opacity = Math.max(0.1, 0.6 - (deltaY / 300));
            overlay.style.opacity = opacity.toString();
          }
        }
      }
      
      // Предотвращаем прокрутку при активном свайпе
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isMenuOpen || isAnimating) return;
    
    // Убираем класс состояния свайпа
    if (menuRef.current) {
      menuRef.current.classList.remove('swiping');
    }
    
    if (!isSwiping.current) return;
    
    const endTime = Date.now();
    const duration = endTime - touchStartTime.current;
    const velocity = touchDistance.current / duration;
    
    // Проверяем условия для закрытия меню:
    // 1. Расстояние свайпа больше 120px ИЛИ
    // 2. Быстрый свайп (скорость > 0.8px/ms) с расстоянием > 60px
    const shouldClose = (touchDistance.current > 120) || 
                       (velocity > 0.8 && touchDistance.current > 60);
    
    if (shouldClose) {
      // Анимированно закрываем меню
      if (menuRef.current) {
        const menuContent = menuRef.current.querySelector('.bg-white') as HTMLElement;
        const overlay = menuRef.current.querySelector('.bg-black\\/60') as HTMLElement;
        
        if (menuContent) {
          menuContent.style.transition = 'transform 0.3s ease-out';
          menuContent.style.transform = 'translateY(100%)';
        }
        
        if (overlay) {
          overlay.style.transition = 'opacity 0.3s ease-out';
          overlay.style.opacity = '0';
        }
      }
      
      // Закрываем меню после анимации
      setTimeout(() => {
        closeMenu();
        // Сбрасываем стили
        if (menuRef.current) {
          const menuContent = menuRef.current.querySelector('.bg-white') as HTMLElement;
          const overlay = menuRef.current.querySelector('.bg-black\\/60') as HTMLElement;
          
          if (menuContent) {
            menuContent.style.transform = '';
            menuContent.style.transition = '';
          }
          
          if (overlay) {
            overlay.style.opacity = '';
            overlay.style.transition = '';
          }
        }
      }, 300);
    } else {
      // Возвращаем меню в исходное положение
      if (menuRef.current) {
        const menuContent = menuRef.current.querySelector('.bg-white') as HTMLElement;
        const overlay = menuRef.current.querySelector('.bg-black\\/60') as HTMLElement;
        
        if (menuContent) {
          menuContent.style.transition = 'transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
          menuContent.style.transform = 'translateY(0)';
        }
        
        if (overlay) {
          overlay.style.transition = 'opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
          overlay.style.opacity = '0.6';
        }
        
        // Убираем transition после анимации
        setTimeout(() => {
          if (menuRef.current) {
            const menuContent = menuRef.current.querySelector('.bg-white') as HTMLElement;
            const overlay = menuRef.current.querySelector('.bg-black\\/60') as HTMLElement;
            
            if (menuContent) {
              menuContent.style.transition = '';
            }
            
            if (overlay) {
              overlay.style.transition = '';
            }
          }
        }, 250);
      }
    }
    
    // Сбрасываем состояние
    isSwiping.current = false;
    touchDistance.current = 0;
  };

  const openMenu = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsMenuOpen(true);
    
    // Сброс анимации после завершения
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const closeMenu = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsMenuOpen(false);
    
    // Сброс анимации после завершения
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  };

  const handleNavigation = (href: string) => {
    if (isAnimating) return;
    
    // Закрываем меню с анимацией
    closeMenu();
    
    // Переходим на страницу после небольшой задержки для завершения анимации
    setTimeout(() => {
      router.push(href);
    }, 150);
  };

  const navigation = [
    { name: 'Главная', href: '/', description: 'Добро пожаловать в клинику Мастерская' },
    { name: 'О центре', href: '/about', description: 'Узнайте больше о нашей клинике' },
    { name: 'Услуги', href: '/services', description: 'Полный спектр медицинских услуг' },
    { name: 'Здоровье', href: '/health', description: 'Статьи о здоровье и профилактике' },
    { name: 'Методики', href: '/methods', description: 'Современные методы лечения' },
    { name: 'Цены', href: '/prices', description: 'Стоимость услуг и консультаций' },
    { name: 'Отзывы', href: '/reviews', description: 'Отзывы наших пациентов' },
    { name: 'Блог', href: '/blog', description: 'Полезные статьи и новости' },
    { name: 'Контакты', href: '/contacts', description: 'Как с нами связаться' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50" role="banner">
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
            <Image 
              src="/logotip.png" 
              alt="Логотип клиники Мастерская" 
              width={64} 
              height={48} 
              className="w-12 h-9 sm:w-16 sm:h-12 pointer-events-none"
              priority
            />
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
                <a href="tel:88124073407" className="hover:text-blue-600 transition-colors">
                  8-812-407-3-407
                </a>
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
              <span>24/7</span>
            </div>
            <SocialIcons className="ml-2" iconSize={18} variant="light" />
          </div>

          {/* Mobile menu button */}
          <button
            onClick={isMenuOpen ? closeMenu : openMenu}
            className="md:hidden p-2 sm:p-3 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 active:bg-gray-200 touch-manipulation transition-all duration-200"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
            style={{ WebkitTapHighlightColor: 'transparent' }}
            disabled={isAnimating}
          >
            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>

        {/* Mobile Navigation - Full Screen Overlay */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            ref={menuRef}
            className="fixed inset-0 z-[9999] md:hidden"
            role="navigation" 
            aria-label="Мобильное меню"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Background overlay */}
            <div 
              className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={closeMenu}
            />
            
            {/* Menu content - Full screen from bottom to top */}
            <div 
              className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl transition-all duration-300 ease-out transform ${
                isMenuOpen ? 'translate-y-0' : 'translate-y-full'
              }`}
              style={{
                minHeight: '85vh',
                maxHeight: '95vh'
              }}
            >
              {/* Header section with close button and swipe indicator */}
              <div className="flex items-center justify-between p-6 border-b border-gray-100 menu-header">
                <div className="flex items-center space-x-3">
                  <h2 className="text-xl font-bold text-gray-800">Меню</h2>
                  {/* Swipe indicator */}
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <div className="w-1 h-1 bg-gray-400 rounded-full swipe-indicator"></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full swipe-indicator" style={{animationDelay: '0.3s'}}></div>
                    <div className="w-1 h-1 bg-gray-400 rounded-full swipe-indicator" style={{animationDelay: '0.6s'}}></div>
                  </div>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
                  aria-label="Закрыть меню"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Navigation items */}
              <div className="px-6 py-4 space-y-3 max-h-[calc(85vh-120px)] overflow-y-auto">
                {navigation.map((item, index) => (
                  <div
                    key={item.name}
                    className="group"
                    style={{
                      animationDelay: `${index * 50}ms`,
                      animationFillMode: 'both'
                    }}
                  >
                    <button
                      onClick={() => handleNavigation(item.href)}
                      className="w-full p-4 bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 text-left group-hover:bg-blue-50"
                      disabled={isAnimating}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 group-hover:text-gray-700">
                            {item.description}
                          </p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              {/* Contact information section */}
              <div className="px-6 py-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Phone className="w-5 h-5 text-blue-600 mr-2" />
                  Контакты
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-base text-gray-700">
                    <Phone className="w-5 h-5 text-blue-600" aria-hidden="true" />
                    <a href="tel:88124073407" className="hover:text-blue-600 transition-colors font-medium">
                      8-812-407-3-407
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-base text-gray-700">
                    <Phone className="w-5 h-5 text-blue-600" aria-hidden="true" />
                    <a href="tel:+79117500700" className="hover:text-blue-600 transition-colors font-medium">
                      +7-911-750-07-00
                    </a>
                  </div>
                  <div className="flex items-center space-x-3 text-base text-gray-700">
                    <MapPin className="w-5 h-5 text-blue-600" aria-hidden="true" />
                    <span className="font-medium">24/7</span>
                  </div>
                </div>
                
                {/* Social icons */}
                <div className="pt-4 border-t border-blue-200 mt-4">
                  <p className="text-sm text-gray-600 mb-3">Мы в социальных сетях:</p>
                  <SocialIcons iconSize={24} variant="light" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 