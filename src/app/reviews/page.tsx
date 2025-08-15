import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import { 
  Star, 
  Heart, 
  Shield, 
  Users, 
  Award, 
  Calendar,
  ThumbsUp
} from 'lucide-react';

export default function ReviewsPage() {
  const testimonials = [
    {
      name: 'Александр М.',
      age: 35,
      treatment: 'Алкогольная зависимость',
      duration: '30 дней',
      rating: 5,
      date: '2024-01-15',
      text: 'Благодаря центру я смог избавиться от зависимости и вернуться к нормальной жизни. Спасибо всему персоналу за профессионализм и поддержку!',
      before: 'Пил каждый день, потерял работу и семью',
      after: 'Полностью трезв 2 года, восстановил отношения с семьей',
      doctor: 'Доктор Иванов А.П.'
    },
    {
      name: 'Елена В.',
      age: 28,
      treatment: 'Наркотическая зависимость',
      duration: '45 дней',
      rating: 5,
      date: '2024-02-20',
      text: 'Профессиональный подход и внимательное отношение к каждому пациенту. Рекомендую всем, кто столкнулся с проблемой.',
      before: 'Зависимость от наркотиков, проблемы с законом',
      after: 'Трезва 1.5 года, работает, планирует семью',
      doctor: 'Петрова Е.В.'
    },
    {
      name: 'Дмитрий К.',
      age: 42,
      treatment: 'Алкогольная зависимость',
      duration: '21 день',
      rating: 5,
      date: '2024-03-10',
      text: 'Долго не решался обратиться за помощью, но здесь меня поняли и поддержали. Теперь я на пути к выздоровлению.',
      before: 'Запои по 2-3 недели, проблемы со здоровьем',
      after: 'Контролирует употребление, здоровье улучшилось',
      doctor: 'Сидоров М.К.'
    },
    {
      name: 'Марина С.',
      age: 31,
      treatment: 'Семейная терапия',
      duration: '12 сеансов',
      rating: 5,
      date: '2024-01-30',
      text: 'Семейная терапия помогла нам восстановить отношения. Теперь мы поддерживаем мужа в его выздоровлении.',
      before: 'Конфликты в семье, непонимание проблемы',
      after: 'Здоровые отношения, взаимная поддержка',
      doctor: 'Петрова Е.В.'
    },
    {
      name: 'Сергей Л.',
      age: 38,
      treatment: 'Комплексная реабилитация',
      duration: '60 дней',
      rating: 5,
      date: '2024-02-15',
      text: 'Долгий путь к выздоровлению, но результат того стоит. Спасибо команде за профессионализм и терпение.',
      before: 'Многолетняя зависимость, потеря всего',
      after: 'Трезв 3 года, открыл свой бизнес',
      doctor: 'Доктор Иванов А.П.'
    },
    {
      name: 'Анна Р.',
      age: 25,
      treatment: 'Психотерапия',
      duration: '20 сеансов',
      rating: 5,
      date: '2024-03-05',
      text: 'Психотерапия помогла мне понять корни проблемы и научиться справляться со стрессом без алкоголя.',
      before: 'Проблемы с самоконтролем, депрессия',
      after: 'Стабильное психическое состояние, новые увлечения',
      doctor: 'Петрова Е.В.'
    }
  ];

  const statistics = [
    {
      number: '95%',
      title: 'Положительных отзывов',
      description: 'Пациенты рекомендуют наш центр'
    },
    {
      number: '1500+',
      title: 'Успешных случаев',
      description: 'Людей вернулись к здоровой жизни'
    },
    {
      number: '4.9',
      title: 'Средняя оценка',
      description: 'По 5-балльной шкале'
    },
    {
      number: '85%',
      title: 'Долгосрочная ремиссия',
      description: 'Без рецидивов более 2 лет'
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg text-white">
        <div className="container-custom section-padding">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Отзывы пациентов
            </h1>
            <p className="text-xl mb-8 text-secondary-light max-w-3xl mx-auto">
              Реальные истории людей, которые вернулись к здоровой жизни. 
              Узнайте о результатах лечения из первых уст.
            </p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
                <p className="text-gray-600">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Истории наших пациентов
            </h2>
            <p className="text-xl text-gray-600">
              Реальные отзывы людей, прошедших лечение в нашем центре
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-8 card-hover">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{testimonial.name}</h3>
                    <p className="text-gray-500 text-sm">
                      {testimonial.age} лет • {testimonial.treatment}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
                
                <div className="mb-6">
                  <p className="text-gray-600 italic mb-4">&ldquo;{testimonial.text}&rdquo;</p>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(testimonial.date).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">До лечения:</h4>
                    <p className="text-red-700 text-sm">{testimonial.before}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">После лечения:</h4>
                    <p className="text-green-700 text-sm">{testimonial.after}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Лечащий врач: {testimonial.doctor}</span>
                  <span className="text-gray-500">Длительность: {testimonial.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      {/* <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Видеоотзывы
            </h2>
            <p className="text-xl text-gray-600">
              Послушайте истории наших пациентов в их собственном исполнении
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gray-200 h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Видеоотзыв {item}</p>
                    <p className="text-sm text-gray-500">Длительность: 2-3 мин</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold mb-2">История пациента</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Реальная история выздоровления с подробным описанием процесса лечения.
                  </p>
                  <button className="btn-primary w-full">
                    Смотреть видео
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Why Patients Choose Us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Почему пациенты выбирают нас
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
                  <Award className="w-6 h-6 text-primary" />
                </div>
                  <div>
                    <h3 className="font-semibold mb-2">Доказанные результаты</h3>
                    <p className="text-gray-600">Высокий процент успешного лечения</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                                  <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-primary" />
                </div>
                  <div>
                    <h3 className="font-semibold mb-2">Поддержка после лечения</h3>
                    <p className="text-gray-600">Постоянное сопровождение и помощь</p>
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

      {/* Trust Indicators */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Нам доверяют
            </h2>
            <p className="text-xl text-gray-600">
              Показатели, которые говорят о качестве нашей работы
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <ThumbsUp className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">95% пациентов</h3>
              <p className="text-gray-600">Рекомендуют нас друзьям и родственникам</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">4.9 из 5</h3>
              <p className="text-gray-600">Средняя оценка на независимых платформах</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">15 лет</h3>
              <p className="text-gray-600">Успешной работы в сфере лечения зависимостей</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg text-center">
              <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">1500+</h3>
              <p className="text-gray-600">Спасенных жизней и восстановленных семей</p>
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