import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { 
  Brain, 
  Heart, 
  Users, 
  Award, 
  Clock, 
  CheckCircle,
  Star,
  Target,
  Activity,
  Shield,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';

export default function MethodsPage() {
  const methods = [
    {
      title: 'Когнитивно-поведенческая терапия',
      description: 'Выявление и изменение негативных мыслей и поведенческих паттернов',
      duration: '12-24 сеанса',
      effectiveness: '85%',
      icon: Brain,
      color: 'bg-primary-light text-primary',
      features: [
        'Выявление триггеров зависимости',
        'Обучение навыкам самоконтроля',
        'Развитие здоровых привычек',
        'Профилактика рецидивов'
      ],
      details: 'КПТ помогает пациентам понять связь между мыслями, чувствами и поведением. Терапия направлена на изменение негативных убеждений и развитие здоровых стратегий преодоления стресса.'
    },
    {
      title: 'Мотивационное интервью',
      description: 'Помощь в осознании проблемы и формировании мотивации к изменениям',
      duration: '4-6 сеансов',
      effectiveness: '90%',
      icon: Heart,
      color: 'bg-red-100 text-red-600',
      features: [
        'Осознание последствий зависимости',
        'Формирование внутренней мотивации',
        'Планирование изменений',
        'Поддержка в процессе'
      ],
      details: 'Мотивационное интервью помогает пациентам осознать проблему и сформировать внутреннюю мотивацию к изменениям. Метод особенно эффективен на начальных этапах лечения.'
    },
    {
      title: 'Групповая терапия',
      description: 'Поддержка и обмен опытом в группе единомышленников',
      duration: 'Длительная программа',
      effectiveness: '80%',
      icon: Users,
      color: 'bg-green-100 text-green-600',
      features: [
        'Поддержка группы',
        'Обмен опытом',
        'Развитие социальных навыков',
        'Снижение изоляции'
      ],
      details: 'Групповая терапия создает поддерживающую среду, где пациенты могут поделиться опытом и получить поддержку от людей, прошедших через аналогичные трудности.'
    },
    {
      title: 'Семейная терапия',
      description: 'Работа с семьей для восстановления здоровых отношений',
      duration: '8-12 сеансов',
      effectiveness: '75%',
      icon: Award,
      color: 'bg-secondary-light text-secondary',
      features: [
        'Восстановление семейных отношений',
        'Обучение здоровому общению',
        'Профилактика созависимости',
        'Поддержка семьи'
      ],
      details: 'Семейная терапия помогает восстановить здоровые отношения в семье и предотвратить созависимость. Работа с семьей значительно повышает эффективность лечения.'
    },
    {
      title: 'Медикаментозная терапия',
      description: 'Фармакологическая поддержка в лечении зависимости',
      duration: 'По индивидуальной схеме',
      effectiveness: '70%',
      icon: Shield,
      color: 'bg-yellow-100 text-yellow-600',
      features: [
        'Снятие абстинентного синдрома',
        'Снижение тяги к веществам',
        'Стабилизация настроения',
        'Поддержка психического здоровья'
      ],
      details: 'Медикаментозная терапия используется в сочетании с психотерапией для снятия симптомов абстиненции, снижения тяги к веществам и стабилизации психического состояния.'
    },
    {
      title: 'Арт-терапия',
      description: 'Творческие методы самовыражения и самопознания',
      duration: '10-15 сеансов',
      effectiveness: '65%',
      icon: BookOpen,
      color: 'bg-indigo-100 text-indigo-600',
      features: [
        'Самовыражение через творчество',
        'Снижение стресса и тревоги',
        'Развитие самосознания',
        'Эмоциональная разрядка'
      ],
      details: 'Арт-терапия помогает пациентам выразить эмоции и переживания через творчество. Метод эффективен для снижения стресса и развития самосознания.'
    }
  ];

  const principles = [
    {
      title: 'Индивидуальный подход',
      description: 'Каждый пациент уникален, поэтому мы разрабатываем персональную программу лечения',
      icon: Target
    },
    {
      title: 'Комплексность',
      description: 'Сочетание различных методик для достижения максимального эффекта',
      icon: Award
    },
    {
      title: 'Научная обоснованность',
      description: 'Использование только проверенных и доказанных методов лечения',
      icon: Brain
    },
    {
      title: 'Долгосрочная поддержка',
      description: 'Постоянное сопровождение пациента после завершения основного лечения',
      icon: Heart
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
              Методики лечения
            </h1>
            <p className="text-xl mb-8 text-secondary-light max-w-3xl mx-auto">
              Современные и проверенные методы лечения зависимостей, 
              основанные на научных исследованиях и многолетнем опыте.
            </p>
          </div>
        </div>
      </section>

      {/* Methods Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {methods.map((method, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8 card-hover">
                <div className="flex items-start space-x-4 mb-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${method.color}`}>
                    <method.icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-2">{method.title}</h3>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{method.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span>Эффективность: {method.effectiveness}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Что включает:</h4>
                  <ul className="space-y-2">
                    {method.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <p className="text-gray-600 mb-6">{method.details}</p>
                
                <Link href="/contacts" className="btn-primary inline-flex items-center">
                  Получить консультацию
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Принципы нашей работы
            </h2>
            <p className="text-xl text-gray-600">
              Основы, на которых строится эффективное лечение
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg text-center card-hover">
                <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{principle.title}</h3>
                <p className="text-gray-600">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Methods Work */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Почему наши методики эффективны
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                  <div>
                    <h3 className="font-semibold mb-2">Научная обоснованность</h3>
                    <p className="text-gray-600">Все методики основаны на современных научных исследованиях и имеют доказанную эффективность</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                  <div>
                    <h3 className="font-semibold mb-2">Индивидуальный подход</h3>
                    <p className="text-gray-600">Программа лечения адаптируется под особенности каждого пациента</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Activity className="w-6 h-6 text-primary" />
                </div>
                  <div>
                    <h3 className="font-semibold mb-2">Комплексность</h3>
                    <p className="text-gray-600">Сочетание различных методик обеспечивает максимальную эффективность</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                  <div>
                    <h3 className="font-semibold mb-2">Долгосрочная поддержка</h3>
                    <p className="text-gray-600">Постоянное сопровождение помогает закрепить результаты лечения</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Success Statistics */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Результаты применения методик
            </h2>
            <p className="text-xl text-gray-600">
              Статистика успешного лечения наших пациентов
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
                              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">95%</div>
              <h3 className="text-xl font-semibold mb-2">Успешных случаев</h3>
              <p className="text-gray-600">Полное избавление от зависимости</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">85%</div>
              <h3 className="text-xl font-semibold mb-2">Долгосрочная ремиссия</h3>
              <p className="text-gray-600">Без рецидивов более 2 лет</p>
            </div>
            <div className="text-center">
                              <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">90%</div>
              <h3 className="text-xl font-semibold mb-2">Улучшение качества жизни</h3>
              <p className="text-gray-600">Восстановление социальных связей</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-600 mb-2">80%</div>
              <h3 className="text-xl font-semibold mb-2">Семейная гармония</h3>
              <p className="text-gray-600">Восстановление семейных отношений</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 