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
  CheckCircle,
  Target,
  Brain,
  Home,
  Activity,
  MessageSquare
} from 'lucide-react';

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
  const services = [
    {
      id: 'detox',
      title: 'Детоксикация',
      description: 'Безопасное выведение токсинов из организма под наблюдением врачей',
      duration: '3-7 дней',
      price: 'от 15 000 ₽',
      icon: Heart,
      color: 'bg-red-100 text-red-600',
      features: [
        'Медикаментозная поддержка',
        'Круглосуточное наблюдение',
        'Индивидуальная программа',
        'Безопасные препараты'
      ],
      details: 'Детоксикация — это первый и важнейший этап лечения зависимости. Мы используем современные методики для безопасного выведения токсинов из организма, снимаем абстинентный синдром и стабилизируем состояние пациента.'
    },
    {
      id: 'rehabilitation',
      title: 'Реабилитация',
      description: 'Комплексная программа восстановления физического и психического здоровья',
      duration: '21-90 дней',
      price: 'от 45 000 ₽',
      icon: Shield,
      color: 'bg-primary-light text-primary',
      features: [
        'Индивидуальная программа',
        'Групповая терапия',
        'Физическая активность',
        'Питание и режим'
      ],
      details: 'Реабилитация включает комплексный подход к восстановлению здоровья. Программа включает психотерапию, физическую активность, правильное питание и формирование здоровых привычек.'
    },
    {
      id: 'therapy',
      title: 'Психотерапия',
      description: 'Индивидуальные и групповые сеансы с опытными психологами',
      duration: 'По индивидуальной программе',
      price: 'от 3 000 ₽',
      icon: Brain,
      color: 'bg-green-100 text-green-600',
      features: [
        'Индивидуальные сеансы',
        'Групповая терапия',
        'Семейная терапия',
        'Когнитивно-поведенческая терапия'
      ],
      details: 'Психотерапия направлена на выявление и устранение психологических причин зависимости. Мы используем различные методики, включая когнитивно-поведенческую терапию, гештальт-терапию и другие современные подходы.'
    },
    {
      id: 'family',
      title: 'Семейная терапия',
      description: 'Помощь родственникам в преодолении кризисной ситуации',
      duration: 'По индивидуальной программе',
      price: 'от 2 500 ₽',
      icon: Home,
      color: 'bg-secondary-light text-secondary',
      features: [
        'Консультации для родственников',
        'Обучение правильному поведению',
        'Поддержка семьи',
        'Профилактика созависимости'
      ],
      details: 'Семейная терапия помогает родственникам понять природу зависимости и научиться правильно поддерживать близкого человека. Мы обучаем здоровым моделям поведения и предотвращаем созависимость.'
    },
    {
      id: 'aftercare',
      title: 'Постреабилитационная поддержка',
      description: 'Долгосрочная поддержка после завершения основного лечения',
      duration: '6-12 месяцев',
      price: 'от 5 000 ₽',
      icon: Activity,
      color: 'bg-yellow-100 text-yellow-600',
      features: [
        'Регулярные консультации',
        'Поддержка в кризисных ситуациях',
        'Группы взаимопомощи',
        'Мониторинг состояния'
      ],
      details: 'Постреабилитационная поддержка помогает закрепить результаты лечения и предотвратить рецидивы. Мы обеспечиваем долгосрочное сопровождение и поддержку в сложных ситуациях.'
    },
    {
      id: 'consultation',
      title: 'Консультации',
      description: 'Первичные и повторные консультации специалистов',
      duration: '1-2 часа',
      price: 'от 1 500 ₽',
      icon: MessageSquare,
      color: 'bg-indigo-100 text-indigo-600',
      features: [
        'Первичная консультация',
        'Диагностика состояния',
        'Разработка плана лечения',
        'Ответы на вопросы'
      ],
      details: 'Консультации проводят опытные специалисты, которые помогут оценить ситуацию, поставить диагноз и разработать индивидуальный план лечения.'
    }
  ];

  const treatmentStages = [
    {
      stage: '1',
      title: 'Первичная консультация',
      description: 'Оценка состояния, диагностика, разработка плана лечения'
    },
    {
      stage: '2',
      title: 'Детоксикация',
      description: 'Выведение токсинов, стабилизация состояния'
    },
    {
      stage: '3',
      title: 'Реабилитация',
      description: 'Комплексное восстановление физического и психического здоровья'
    },
    {
      stage: '4',
      title: 'Постреабилитационная поддержка',
      description: 'Долгосрочное сопровождение и профилактика рецидивов'
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
              Услуги медицинского центра
            </h1>
            <p className="text-xl mb-8 text-secondary-light max-w-3xl mx-auto">
              Комплексный подход к лечению алкогольной и наркотической зависимости. 
              Индивидуальные программы для каждого пациента.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наши услуги
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Комплексный подход к лечению алкогольной и наркотической зависимости. 
              Индивидуальные программы для каждого пациента.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service) => (
              <article key={service.id} className="bg-white rounded-lg p-4 sm:p-6 shadow-lg card-hover">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${service.color}`}>
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {service.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {service.duration}
                  </span>
                  <span className="font-semibold text-blue-600">
                    {service.price}
                  </span>
                </div>
                <div className="space-y-2">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Treatment Stages */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Этапы лечения
            </h2>
            <p className="text-xl text-gray-600">
              Пошаговый подход к выздоровлению
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {treatmentStages.map((stage, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                  {stage.stage}
                </div>
                <h3 className="text-xl font-semibold mb-3">{stage.title}</h3>
                <p className="text-gray-600">{stage.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Почему выбирают наши услуги
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                  <div>
                    <h3 className="font-semibold mb-2">Анонимность</h3>
                    <p className="text-gray-600">Полная конфиденциальность всех данных пациента</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                  <div>
                    <h3 className="font-semibold mb-2">Опытные специалисты</h3>
                    <p className="text-gray-600">Команда врачей с многолетним опытом работы</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                  <div>
                    <h3 className="font-semibold mb-2">Индивидуальный подход</h3>
                    <p className="text-gray-600">Персональная программа для каждого пациента</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                  <div>
                    <h3 className="font-semibold mb-2">Современные методики</h3>
                    <p className="text-gray-600">Использование проверенных и инновационных подходов</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Получить консультацию</h3>
              <p className="text-gray-600 mb-4">
                Оставьте заявку, и наш специалист свяжется с вами для бесплатной консультации.
              </p>
              <a href="/contacts" className="btn-primary inline-block">
                Перейти к контактам
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Часто задаваемые вопросы
            </h2>
            <p className="text-xl text-gray-600">
              Ответы на популярные вопросы о наших услугах
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold mb-3">Сколько длится лечение?</h3>
                <p className="text-gray-600">Длительность лечения зависит от индивидуальных особенностей пациента и стадии зависимости. Обычно курс составляет от 21 до 90 дней.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold mb-3">Гарантирована ли анонимность?</h3>
                <p className="text-gray-600">Да, мы гарантируем полную анонимность. Все данные пациента строго конфиденциальны и не передаются третьим лицам.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold mb-3">Можно ли лечиться амбулаторно?</h3>
                <p className="text-gray-600">Да, мы предлагаем как стационарное, так и амбулаторное лечение в зависимости от состояния пациента.</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold mb-3">Какие документы нужны для госпитализации?</h3>
                <p className="text-gray-600">Для госпитализации достаточно паспорта. Мы не требуем направления от врача или других документов.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold mb-3">Работаете ли вы с родственниками?</h3>
                <p className="text-gray-600">Да, мы проводим семейную терапию и консультации для родственников зависимых людей.</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold mb-3">Есть ли поддержка после лечения?</h3>
                <p className="text-gray-600">Да, мы предоставляем постреабилитационную поддержку и группы взаимопомощи для предотвращения рецидивов.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Получить консультацию
            </h2>
            <p className="text-xl text-gray-600">
              Оставьте заявку, и наш специалист свяжется с вами для бесплатной консультации
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 