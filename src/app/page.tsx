import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  Mail
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

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg text-white">
        <div className="container-custom section-padding">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Профессиональная помощь в лечении зависимостей
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Анонимно, конфиденциально, эффективно. Мы поможем вам вернуться к здоровой жизни.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contacts" className="btn-primary text-center">
                  Получить консультацию
                </Link>
                <a href="tel:88124073407" className="btn-secondary text-center">
                  <Phone className="w-5 h-5 inline mr-2" />
                  8-812-407-3-407
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
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наши услуги
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Комплексный подход к лечению алкогольной и наркотической зависимости
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg card-hover">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
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

      {/* Testimonials Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Отзывы наших пациентов
            </h2>
            <p className="text-xl text-gray-600">
              Реальные истории людей, которые вернулись к здоровой жизни
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">&ldquo;{testimonial.text}&rdquo;</p>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы начать путь к выздоровлению?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Оставьте заявку прямо сейчас и получите бесплатную консультацию
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacts" className="btn-primary">
              Получить консультацию <ArrowRight className="w-5 h-5 mx-auto" />
            </Link>
            <a href="tel:88005550123" className="btn-secondary">
              <Phone className="w-5 h-5 mr-2" />
              Позвонить сейчас
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Phone className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Телефон</h3>
                                  <p className="text-gray-600">8-812-407-3-407</p>
              <p className="text-sm text-gray-500">Круглосуточно</p>
            </div>
            <div className="text-center">
              <Mail className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
                                  <a href="mailto:masterskaya.clinic@yandex.ru" className="text-gray-600 hover:text-blue-600 transition-colors">
                masterskaya.clinic@yandex.ru
              </a>
              <p className="text-sm text-gray-500">Ответим в течение часа</p>
            </div>
            <div className="text-center">
              <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Адрес</h3>
              <p className="text-gray-600">г. Санкт-Петербург, ул. Заставская, 33л</p>
              <p className="text-sm text-gray-500">Конфиденциально</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
