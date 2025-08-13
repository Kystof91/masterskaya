import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import DocumentsSection from '@/components/DocumentsSection';
import { 
  Award, 
  Users, 
  Shield, 
  Heart, 
  CheckCircle,
  Target
} from 'lucide-react';

export default function AboutPage() {
  const team = [
    {
      name: 'Доктор Иванов А.П.',
      position: 'Главный врач-нарколог',
      experience: '15 лет опыта',
      description: 'Специалист высшей категории, автор научных работ по лечению зависимостей'
    },
    {
      name: 'Петрова Е.В.',
      position: 'Психолог-психотерапевт',
      experience: '12 лет опыта',
      description: 'Сертифицированный специалист по семейной терапии и групповой работе'
    },
    {
      name: 'Сидоров М.К.',
      position: 'Врач-психиатр',
      experience: '10 лет опыта',
      description: 'Эксперт в области диагностики и лечения психических расстройств'
    },
    {
      name: 'Козлова А.С.',
      position: 'Медицинская сестра',
      experience: '8 лет опыта',
      description: 'Специалист по уходу за пациентами и медицинским процедурам'
    }
  ];

  const achievements = [
    {
      number: '1500+',
      title: 'Пациентов',
      description: 'Успешно прошли лечение'
    },
    {
      number: '95%',
      title: 'Успешность',
      description: 'Положительных результатов'
    },
    {
      number: '15',
      title: 'Лет опыта',
      description: 'В лечении зависимостей'
    },
    {
      number: '24/7',
      title: 'Поддержка',
      description: 'Круглосуточная помощь'
    }
  ];

  const values = [
    {
      title: 'Конфиденциальность',
      description: 'Полная анонимность всех данных пациента',
      icon: Shield
    },
    {
      title: 'Профессионализм',
      description: 'Высокий уровень квалификации специалистов',
      icon: Award
    },
    {
      title: 'Человечность',
      description: 'Индивидуальный подход к каждому пациенту',
      icon: Heart
    },
    {
      title: 'Результативность',
      description: 'Доказанные методики с высокой эффективностью',
      icon: Target
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
              О медицинском центре
            </h1>
            <p className="text-xl mb-8 text-secondary-light max-w-3xl mx-auto">
              Мы помогаем людям вернуться к здоровой жизни уже более 15 лет. 
              Наша миссия — профессиональная помощь в преодолении зависимостей.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Наша миссия
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Мы стремимся помочь каждому человеку, страдающему от алкогольной или наркотической зависимости, 
                вернуться к полноценной жизни. Наша цель — не просто избавить от зависимости, 
                а восстановить физическое и психическое здоровье, вернуть человека в общество.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Индивидуальный подход к каждому пациенту</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Использование современных методик лечения</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Полная анонимность и конфиденциальность</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span>Постоянная поддержка после лечения</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-semibold mb-6">Наши ценности</h3>
              <div className="grid grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <div key={index} className="text-center">
                                    <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-3">
                  <value.icon className="w-6 h-6 text-primary" />
                </div>
                    <h4 className="font-semibold mb-2">{value.title}</h4>
                    <p className="text-sm text-gray-600">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наши достижения
            </h2>
            <p className="text-xl text-gray-600">
              Цифры, которые говорят о качестве нашей работы
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                  {achievement.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Наша команда
            </h2>
            <p className="text-xl text-gray-600">
              Опытные специалисты, которые помогут вам на пути к выздоровлению
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-lg card-hover">
                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-center mb-2">{member.name}</h3>
                <p className="text-primary text-center mb-2">{member.position}</p>
                <p className="text-sm text-gray-500 text-center mb-3">{member.experience}</p>
                <p className="text-gray-600 text-sm text-center">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <DocumentsSection />

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