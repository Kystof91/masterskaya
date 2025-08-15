import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import StructuredData from '@/components/StructuredData';
import FAQ from '@/components/FAQ';
import { 
  Heart, 
  Shield, 
  Users, 
  Award, 
  Clock, 
  Phone, 
  ArrowRight,
  CheckCircle,
  Star,
  MapPin,
  Mail,
  Gift
} from 'lucide-react';
import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export default function Home() {
  const services = [
    {
      title: 'Детоксикация',
      description: 'Безопасное выведение токсинов из организма под наблюдением врачей',
      icon: Heart,
      color: 'bg-red-100 text-red-600'
    },
    {
      title: 'Реабилитация',
      description: 'Комплексная программа восстановления физического и психического здоровья',
      icon: Shield,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Психотерапия',
      description: 'Индивидуальные и групповые сеансы с опытными психологами',
      icon: Users,
      color: 'bg-green-100 text-green-600'
    },
    {
      title: 'Семейная терапия',
      description: 'Помощь родственникам в преодолении кризисной ситуации',
      icon: Award,
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const advantages = [
    {
      title: 'Анонимность',
      description: '100% конфиденциальность всех данных пациента',
      icon: Shield
    },
    {
      title: 'Круглосуточно',
      description: 'Помощь доступна 24/7 без выходных',
      icon: Clock
    },
    {
      title: 'Опытные врачи',
      description: 'Команда специалистов с многолетним опытом',
      icon: Users
    },
    {
      title: 'Современные методики',
      description: 'Использование проверенных и инновационных подходов',
      icon: Award
    }
  ];

  const promotions = [
    {
      title: 'Первая консультация бесплатно',
      description: 'Получите бесплатную консультацию специалиста и индивидуальный план лечения',
      discount: 'БЕСПЛАТНО',
      color: 'bg-green-100 text-green-800',
      icon: '🎯'
    },
    {
      title: 'Скидка 20% на курс лечения',
      description: 'При записи на полный курс лечения зависимостей действует специальная скидка',
      discount: '-20%',
      color: 'bg-red-100 text-red-800',
      icon: '💊'
    },
    {
      title: 'Семейная терапия со скидкой',
      description: 'Специальное предложение для семей, проходящих терапию вместе',
      discount: '-15%',
      color: 'bg-blue-100 text-blue-800',
      icon: '👨‍👩‍👧‍👦'
    }
  ];

  const testimonials = [
    {
      name: 'Александр М.',
      text: 'Благодаря центру я смог избавиться от зависимости и вернуться к нормальной жизни. Спасибо всему персоналу!',
      rating: 5
    },
    {
      name: 'Елена В.',
      text: 'Профессиональный подход и внимательное отношение к каждому пациенту. Рекомендую всем, кто столкнулся с проблемой.',
      rating: 5
    },
    {
      name: 'Дмитрий К.',
      text: 'Долго не решался обратиться за помощью, но здесь меня поняли и поддержали. Теперь я на пути к выздоровлению.',
      rating: 5
    }
  ];

  const faqItems = [
    {
      question: "Как проходит лечение зависимостей в вашем центре?",
      answer: "Лечение начинается с бесплатной консультации, где врач оценивает состояние пациента и составляет индивидуальный план. Далее следует детоксикация (при необходимости), реабилитация и психотерапия. Весь процесс проходит анонимно и конфиденциально."
    },
    {
      question: "Сколько времени занимает полный курс лечения?",
      answer: "Длительность лечения зависит от тяжести зависимости и индивидуальных особенностей пациента. Обычно курс занимает от 1 до 6 месяцев. Врач определяет оптимальную продолжительность на основе диагностики."
    },
    {
      question: "Гарантирована ли анонимность лечения?",
      answer: "Да, мы гарантируем 100% анонимность. Все данные пациента защищены врачебной тайной. Мы не передаем информацию третьим лицам без письменного согласия пациента."
    },
    {
      question: "Какие методы лечения вы используете?",
      answer: "Мы применяем современные, научно обоснованные методы: медикаментозную терапию, психотерапию (индивидуальную и групповую), семейную терапию, когнитивно-поведенческую терапию и другие эффективные подходы."
    },
    {
      question: "Работаете ли вы с родственниками зависимых?",
      answer: "Да, мы обязательно работаем с семьей пациента. Семейная терапия помогает родственникам понять природу зависимости, научиться правильно поддерживать близкого человека и восстановить здоровые отношения в семье."
    },
    {
      question: "Есть ли у вас лицензия на медицинскую деятельность?",
      answer: "Да, у нас есть действующая медицинская лицензия №Л041-01148-78/02897906. Мы работаем в строгом соответствии с российским законодательством и медицинскими стандартами."
    }
  ];

  // Структурированные данные для главной страницы
  const mainPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Мастерская - Лечение зависимостей",
    "description": "Профессиональная помощь в лечении алкогольной и наркотической зависимости в Санкт-Петербурге",
    "url": "https://masterskaya.clinic",
    "telephone": ["8-812-407-3-407", "+7-911-750-07-00"],
    "email": "masterskaya.clinic@yandex.ru",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "ул. Заставская, 33л",
      "addressLocality": "Санкт-Петербург",
      "addressCountry": "RU"
    },
    "openingHours": "Mo-Su 00:00-23:59",
    "medicalSpecialty": ["Addiction Medicine", "Psychiatry", "Psychology"],
    "availableService": services.map(service => ({
      "@type": "MedicalService",
      "name": service.title,
      "description": service.description
    }))
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Breadcrumbs */}
      <div className="container-custom pt-6">
        <Breadcrumbs items={[]} />
      </div>
      
      {/* Structured Data */}
      <StructuredData type="medical-clinic" data={mainPageStructuredData} />
      
      {/* Hero Section */}
      <section className="gradient-bg text-white" role="banner" aria-label="Главная информация о центре">
        <div className="container-custom section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Профессиональная помощь в лечении зависимостей
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Анонимно, конфиденциально, эффективно. Мы поможем вам вернуться к здоровой жизни.
              </p>
              <p className="text-sm mb-6 text-blue-200">
                Медицинская лицензия №Л041-01148-78/02897906
              </p>
              <div className="flex flex-col gap-4">
                <Link href="/contacts" className="btn-primary text-center w-full sm:w-auto">
                  Получить консультацию
                </Link>
                <a href="tel:88124073407" className="btn-secondary text-center w-full sm:w-auto">
                  8-812-407-3-407
                </a>
                <a href="tel:+79117500700" className="btn-secondary text-center w-full sm:w-auto">
                  +7-911-750-07-00
                </a>
              </div>
            </div>
            <div className="hidden lg:block">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-gray-50" role="region" aria-labelledby="services-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наши услуги
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Комплексный подход к лечению алкогольной и наркотической зависимости
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <article key={index} className="bg-white rounded-lg p-6 shadow-lg card-hover">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding" role="region" aria-labelledby="about-heading">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 id="about-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                О медицинском центре
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Мы специализируемся на лечении алкогольной и наркотической зависимости более 15 лет. 
                Наша миссия — помочь людям вернуться к здоровой и полноценной жизни.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span>Лицензированная медицинская деятельность</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span>Опытные врачи-наркологи и психологи</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span>Современные методики лечения</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-secondary" />
                  <span>Полная анонимность и конфиденциальность</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6">Почему выбирают нас</h3>
              <div className="grid grid-cols-2 gap-6">
                {advantages.map((advantage, index) => (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <advantage.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2">{advantage.title}</h4>
                    <p className="text-sm text-gray-600">{advantage.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotions Section */}
      <section className="section-padding bg-gradient-to-r from-blue-50 to-indigo-50" role="region" aria-labelledby="promotions-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 id="promotions-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Специальные предложения
            </h2>
            <p className="text-2xl text-gray-600">
              Выгодные условия для наших пациентов
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <article className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-green-500 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                  <Gift className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-green-700">Бесплатная консультация</h3>
              </div>
              <p className="text-lg text-gray-600 mb-4">
                Консультация психиатра-нарколога бесплатно для всех пациентов
              </p>
              <div className="text-base text-green-600 font-medium">
                Экономия: до 3000₽
              </div>
            </article>

            <article className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-blue-500 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Gift className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-blue-700">Скидка участникам СВО</h3>
              </div>
              <p className="text-lg text-gray-600 mb-4">
                Скидка 20% на амбулаторную детоксикацию для участников специальной военной операции
              </p>
              <div className="text-base text-blue-600 font-medium">
                Скидка: 20%
              </div>
            </article>

            <article className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-purple-500 hover:shadow-xl transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                  <Gift className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold text-purple-700">Прерывание запоя</h3>
              </div>
              <p className="text-lg text-gray-600 mb-4">
                Прерывание запоя, детокс капельница от 1900₽ (амбулаторно в медцентре)
              </p>
              <div className="text-base text-purple-600 font-medium">
                Цена: от 1900₽
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50" role="region" aria-labelledby="testimonials-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Отзывы наших пациентов
            </h2>
            <p className="text-xl text-gray-600">
              Реальные истории людей, которые вернулись к здоровой жизни
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <blockquote key={index} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <cite className="font-semibold text-gray-900 not-italic">{testimonial.name}</cite>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ 
        items={faqItems}
        title="Часто задаваемые вопросы"
        description="Ответы на самые популярные вопросы о лечении зависимостей"
      />

      {/* CTA Section */}
      <section className="section-padding gradient-bg text-white" role="region" aria-labelledby="cta-heading">
        <div className="container-custom text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-6">
            Готовы начать путь к выздоровлению?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Оставьте заявку прямо сейчас и получите бесплатную консультацию
          </p>
          <div className="flex flex-col gap-4 justify-center items-center">
            <Link href="/contacts" className="btn-primary text-center w-full sm:w-1/2">
              Получить консультацию
            </Link>
            <a href="tel:88124073407" className="btn-secondary text-center w-full sm:w-1/2">
              Позвонить сейчас
            </a>
            <a href="tel:+79117500700" className="btn-secondary text-center w-full sm:w-1/2">
              +7-911-750-07-00
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding" role="region" aria-labelledby="contact-heading">
        <div className="container-custom">
          <h2 id="contact-heading" className="sr-only">Контактная информация</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <address className="text-center not-italic">
              <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Телефон</h3>
              <p className="text-gray-600">8-812-407-3-407</p>
              <p className="text-gray-600">+7-911-750-07-00</p>
              <p className="text-sm text-gray-500">Круглосуточно</p>
            </address>
            <address className="text-center not-italic">
              <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <a href="mailto:masterskaya.clinic@yandex.ru" className="text-gray-600 hover:text-blue-600 transition-colors">
                masterskaya.clinic@yandex.ru
              </a>
              <p className="text-sm text-gray-500">Ответим в течение часа</p>
            </address>
            <address className="text-center not-italic">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Адрес</h3>
              <p className="text-gray-600">г. Санкт-Петербург, ул. Заставская, 33л</p>
              <p className="text-gray-600">(ул. Ташкентская, 2)</p>
              <p className="text-sm text-gray-500">Конфиденциально</p>
            </address>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
