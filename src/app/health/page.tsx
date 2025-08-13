import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Droplets, Heart, Shield, Zap, Star, Clock, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function HealthPage() {
  const procedures = [
    {
      id: 'vitamin-cocktail',
      title: 'Капельница Детокс',
      description: 'Очищение тканей от токсинов и вредных метаболитов, восстановление поврежденных клеточных мембран',
      icon: Droplets,
      color: 'bg-blue-100 text-blue-600',
      duration: '45-60 мин',
      price: 'от 2500₽'
    },
    {
      id: 'detox-drip',
      title: 'Капельница Anti-age',
      description: 'Замедление процессов старения, улучшение внешнего вида кожи, повышение уровня энергии',
      icon: Shield,
      color: 'bg-green-100 text-green-600',
      duration: '40-50 мин',
      price: 'от 2800₽'
    },
    {
      id: 'energy-boost',
      title: 'Капельница Anti-age интенсив',
      description: 'Специализированный инфузионный коктейль для борьбы с признаками старения и поддержания здоровья кожи',
      icon: CheckCircle,
      color: 'bg-yellow-100 text-yellow-600',
      duration: '30-60 мин',
      price: 'от 3200₽'
    },
    {
      id: 'beauty-drip',
      title: 'Капельница Лаеннек (1 ампула)',
      description: 'Медицинский препарат на основе экстракта печеночных клеток для восстановления функций печени',
      icon: Star,
      color: 'bg-pink-100 text-pink-600',
      duration: '30-60 мин',
      price: 'от 3500₽'
    },
    {
      id: 'immunity-support',
      title: 'Капельница Иммуно',
      description: 'Инфузионная терапия для укрепления иммунной системы и улучшения общего состояния организма',
      icon: Heart,
      color: 'bg-red-100 text-red-600',
      duration: '30-120 мин',
      price: 'от 2700₽'
    },
    {
      id: 'recovery-drip',
      title: 'Капельница Super energy',
      description: 'Специализированный раствор для повышения уровня энергии и восстановления организма после нагрузок',
      icon: Zap,
      color: 'bg-purple-100 text-purple-600',
      duration: '30-60 мин',
      price: 'от 3000₽'
    },
    {
      id: 'anti-aging',
      title: 'Капельница Золушки',
      description: 'Восстановление жизненной энергии, улучшение состояния кожи и омоложение организма',
      icon: Clock,
      color: 'bg-indigo-100 text-indigo-600',
      duration: '30-45 мин',
      price: 'от 2500₽'
    },
    {
      id: 'stress-relief',
      title: 'Капельница Баланс железа',
      description: 'Терапевтическая процедура для коррекции уровня железа в организме при анемии',
      icon: Shield,
      color: 'bg-teal-100 text-teal-600',
      duration: '30-60 мин',
      price: 'от 2900₽'
    },
    {
      id: 'custom-cocktail',
      title: 'Капельница Коктейль Майерса',
      description: 'Витаминный коктейль с микроэлементами для устранения усталости и повышения жизненного тонуса',
      icon: Star,
      color: 'bg-orange-100 text-orange-600',
      duration: '30-60 мин',
      price: 'от 3300₽'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg text-white">
        <div className="container-custom section-padding">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Капельницы для поддержания здоровья
            </h1>
            <p className="text-xl mb-8 text-blue-100 leading-relaxed">
              Здоровье – это гармония, которую стоит беречь. Наши восстанавливающие капельницы – это сбалансированный коктейль витаминов, минералов и аминокислот, созданный для того, чтобы ваш организм работал как часы. Быстрое усвоение, мгновенное действие и максимальная польза – ваш ключ к энергии, сияющему виду и отличному самочувствию каждый день.
            </p>
          </div>
        </div>
      </section>

      {/* Procedures Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наши процедуры
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Выберите подходящую процедуру для поддержания вашего здоровья и красоты
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {procedures.map((procedure, index) => (
              <Link 
                key={procedure.id} 
                href={`/health/${procedure.id}`}
                className="bg-white rounded-lg p-6 shadow-lg card-hover group"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${procedure.color}`}>
                  <procedure.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                  {procedure.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {procedure.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {procedure.duration}
                  </span>
                  <span className="font-semibold text-blue-600">
                    {procedure.price}
                  </span>
                </div>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                  Подробнее
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Преимущества наших капельниц
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Почему стоит выбрать именно наши процедуры для поддержания здоровья
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Droplets className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Быстрое усвоение</h3>
              <p className="text-gray-600">Прямое поступление в кровь обеспечивает мгновенный эффект</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Безопасность</h3>
              <p className="text-gray-600">Все препараты сертифицированы и подбираются индивидуально</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Индивидуальный подход</h3>
              <p className="text-gray-600">Состав подбирается с учетом ваших потребностей и анализов</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Долговременный эффект</h3>
              <p className="text-gray-600">Результат сохраняется на длительное время</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding gradient-bg text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Готовы улучшить свое здоровье?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Запишитесь на консультацию и получите персональные рекомендации
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacts" className="btn-primary">
              Записаться на консультацию <ArrowRight className="w-5 h-5 mx-auto" />
            </Link>
            <a href="tel:88124073407" className="btn-secondary">
              Позвонить сейчас<br />
              <span className="text-black">8-812-407-3-407</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
