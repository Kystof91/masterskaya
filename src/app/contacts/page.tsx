import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import YandexMap from '@/components/YandexMap';

import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Shield,
  MessageSquare
} from 'lucide-react';

export default function ContactsPage() {
  const contactInfo = [
    {
      title: 'Телефон',
      value: '88124073407',
      description: 'Круглосуточно',
      icon: Phone,
      link: 'tel:88124073407'
    },
    {
      title: 'Email',
      value: 'masterskaya.clinic@yandex.ru',
      description: 'Ответим в течение часа',
      icon: Mail,
      link: 'mailto:masterskaya.clinic@yandex.ru'
    },
    {
      title: 'Адрес',
      value: 'г. Санкт-Петербург, ул. Заставская, 33л',
      description: '(ул. Ташкентская, 2)',
      icon: MapPin,
      link: '#'
    },
    {
      title: 'Режим работы',
      value: '24/7',
      description: 'Без выходных',
      icon: Clock,
      link: '#'
    }
  ];

  const emergencyInfo = [
    {
      title: 'Кризисная помощь',
      description: 'Немедленная поддержка в сложных ситуациях',
      phone: '88124073407',
      phone2: '+79117500700',
      available: 'Круглосуточно'
    },
    {
      title: 'Консультация специалиста',
      description: 'Бесплатная первичная консультация',
      phone: '88124073407',
      phone2: '+79117500700',
      available: 'С 9:00 до 21:00'
    },
    {
      title: 'Семейная поддержка',
      description: 'Помощь родственникам зависимых',
      phone: '88124073407',
      phone2: '+79117500700',
      available: 'С 10:00 до 20:00'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg text-white">
        <div className="container-custom section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Контакты
            </h1>
            <p className="text-xl mb-8 text-secondary-light max-w-3xl mx-auto">
              Свяжитесь с нами любым удобным способом. Мы готовы помочь вам 24/7.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {contactInfo.map((contact, index) => (
              <div key={index} className="bg-white rounded-lg p-4 sm:p-6 shadow-lg text-center card-hover">
                                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <contact.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{contact.title}</h3>
                <a
                  href={contact.link}
                  className="text-primary hover:text-primary-hover font-medium block mb-1"
                >
                  {contact.value}
                </a>
                <p className="text-sm text-gray-500">{contact.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Details */}
            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Связаться с нами
              </h2>
              
              <div className="space-y-6">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <div className="flex items-center space-x-3 mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                    <h3 className="text-xl font-semibold">Анонимность гарантирована</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Все обращения строго конфиденциальны. Мы не передаем информацию третьим лицам 
                    и не регистрируем данные в государственных базах.
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Shield className="w-4 h-4" />
                    <span>100% анонимность</span>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-8 shadow-lg">
                  <div className="flex items-center space-x-3 mb-6">
                    <MessageSquare className="w-7 h-7 text-primary" />
                    <h3 className="text-2xl font-semibold">Экстренная помощь</h3>
                  </div>
                  <div className="space-y-6">
                    {emergencyInfo.map((service, index) => (
                      <div key={index} className="border-l-4 border-primary pl-6">
                        <h4 className="text-lg font-semibold mb-2">{service.title}</h4>
                        <p className="text-base text-gray-600 mb-3">{service.description}</p>
                        <div className="text-center">
                          <a 
                            href={`tel:${service.phone.replace(/\s/g, '')}`}
                            className="text-primary hover:text-primary-hover font-semibold text-lg flex items-center justify-center space-x-2 mb-2"
                          >
                            <Phone className="w-5 h-5" />
                            <span>{service.phone}</span>
                          </a>
                          <a 
                            href={`tel:${service.phone2.replace(/\s/g, '')}`}
                            className="text-primary hover:text-primary-hover font-semibold text-lg flex items-center justify-center space-x-2 mb-2"
                          >
                            <Phone className="w-5 h-5" />
                            <span>{service.phone2}</span>
                          </a>
                          <span className="text-base text-gray-500 block">{service.available}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Получить консультацию
                </h3>
                <p className="text-gray-600">
                  Оставьте заявку, и наш специалист свяжется с вами для бесплатной консультации
                </p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Как нас найти
            </h2>
            <p className="text-xl text-gray-600">
              Мы находимся в удобном месте с хорошей транспортной доступностью
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-4 h-96">
              <YandexMap />
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-4">Как добраться</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">На метро</h4>
                      <p className="text-gray-600">Пешком от станции метро Московские ворота:
                        <br />
                        1. Выйдите из метро и поверните налево.
                        <br />
                        2. Продолжайте движение прямо, пока не дойдете до ул. Заставской.
                        <br />
                        3. Поверните направо, пешком 250 метров вдоль ул. Заставской и идите до дома №33л</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">На машине</h4>
                      <p className="text-gray-600">В навигаторе укажите адрес: ул. Заставская, дом 33л (или ул. Ташкентская, дом 2). 
                        <br />
                        Обратите внимание, что на этой улице одностороннее движение, поэтому следуйте указаниям навигатора для оптимального маршрута</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* <div className="bg-primary-light rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Важная информация</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Вход с обратной стороны здания</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Код домофона: 1234</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>Конфиденциальный вход</span>
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Часто задаваемые вопросы
            </h2>
            <p className="text-xl text-gray-600">
              Ответы на популярные вопросы о контактах
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold mb-3">Можно ли приехать без записи?</h3>
                <p className="text-gray-600">Да, мы принимаем пациентов без предварительной записи. Однако рекомендуем позвонить заранее для уточнения времени приема.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold mb-3">Работаете ли вы в выходные?</h3>
                <p className="text-gray-600">Да, мы работаем 24/7 без выходных и праздников. Помощь доступна в любое время.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold mb-3">Можно ли вызвать врача на дом?</h3>
                <p className="text-gray-600">Да, мы предоставляем услугу вызова специалиста на дом в экстренных случаях.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold mb-3">Какие документы нужны для обращения?</h3>
                <p className="text-gray-600">Для первичной консультации достаточно паспорта. Мы не требуем направления от врача.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold mb-3">Есть ли бесплатная консультация?</h3>
                <p className="text-gray-600">Да, первичная консультация проводится бесплатно. Специалист оценит ситуацию и предложит план лечения.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold mb-3">Можно ли обратиться анонимно?</h3>
                <p className="text-gray-600">Да, мы гарантируем полную анонимность. Ваши данные не будут переданы третьим лицам.</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
} 