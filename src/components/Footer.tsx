import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Shield, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-bl from-emerald-600 to-emerald-500 text-white" style={{background: 'linear-gradient(315deg, hsl(var(--gradient-start)) 0%, hsl(var(--gradient-end)) 100%)'}}>
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* О центре */}
          <div>
            <h3 className="text-lg font-semibold mb-4">О медицинском центре</h3>
            <p className="text-gray-300 mb-4">
              Профессиональная помощь в лечении алкогольной и наркотической зависимости. 
              Анонимность, конфиденциальность, современные методики.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <Shield className="w-4 h-4" />
              <span>100% анонимность</span>
            </div>
          </div>

          {/* Услуги */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Услуги</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/services#detox" className="hover:text-white transition-colors">
                  Детоксикация
                </Link>
              </li>
              <li>
                <Link href="/services#rehabilitation" className="hover:text-white transition-colors">
                  Реабилитация
                </Link>
              </li>
              <li>
                <Link href="/services#therapy" className="hover:text-white transition-colors">
                  Психотерапия
                </Link>
              </li>
              <li>
                <Link href="/services#family" className="hover:text-white transition-colors">
                  Семейная терапия
                </Link>
              </li>
              <li>
                <Link href="/services#aftercare" className="hover:text-white transition-colors">
                  Постреабилитационная поддержка
                </Link>
              </li>
            </ul>
          </div>

          {/* Информация */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Информация</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  О нас
                </Link>
              </li>
              <li>
                <Link href="/methods" className="hover:text-white transition-colors">
                  Методики лечения
                </Link>
              </li>
              <li>
                <Link href="/prices" className="hover:text-white transition-colors">
                  Цены и программы
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-white transition-colors">
                  Отзывы пациентов
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Статьи и блог
                </Link>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href="tel:88124073407" className="hover:text-white transition-colors">
                  8-812-407-3-407
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:masterskaya.clinic@yandex.ru" className="hover:text-white transition-colors">
                  masterskaya.clinic@yandex.ru
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>г. Санкт-Петербург, ул. Заставская, 33л</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Круглосуточно</span>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="border-t border-emerald-400/40 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="w-5 h-5 text-red-500" />
              <span className="text-sm text-gray-300">
                © 2025 Медицинский Центр. Все права защищены.
              </span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-300">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Политика конфиденциальности
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Условия использования
              </Link>
              <Link href="/licenses" className="hover:text-white transition-colors">
                Лицензии
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 