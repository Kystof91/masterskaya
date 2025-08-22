'use client';

import { useState } from 'react';
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
  Target,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  position: string;
  experience: string;
  description: string;
  photo?: string;
}

export default function AboutPageClient() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const team: TeamMember[] = [
    {
      name: 'Колосов Денис Александрович',
      position: 'Врач - остеопат',
      experience: '30 лет опыта',
      description: 'Врач-остеопат,мануальный терапевт,реабилитолог,врач ЛФК и спортивной медицины,массажист,тренер.',
      photo: '/kolosov.jpg'
    },
    {
      name: 'Пискунова Антонина Сергеевна',
      position: 'Врач - Психиатр',
      experience: '15 лет опыта',
      description: 'Врач - нарколог, психотерапевт',
      photo: '/piskunova.jpg'
    },
    {
      name: 'Абалян Олег Александрович',
      position: 'Психолог-эксперт по зависимостям',
      experience: '5 лет опыта',
      description: 'Специалист по работе с зависимыми и созависимыми',
      photo: '/abalan.jpg'
    },
    {
      name: 'Карин Роман Александрович',
      position: 'Психолог',
      experience: '17 лет опыта',
      description: 'Специалист по работе с зависимыми и созависимыми'
    },
    {
      name: 'Панежина  Вера Сергеевна',
      position: 'Врач - терапевт',
      experience: '10 лет опыта',
      description: 'Врач - терапевт, врач - гериатр',
      photo: '/paneshina.jpg'
    },
    {
      name: 'Казаков Евгений Константинович',
      position: 'Врач спортивной медицины',
      experience: '20 лет опыта',
      description: 'Кинезиолог,мануальный терапевт,рефлексотерапевт,реабилитолог,врач ЛФК и спортивной медицины,массажист,тренер.',
      photo: ''
    },
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
      title: 'Время работы - круглосуточно',
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

  const totalSlides = Math.ceil(team.length / 2);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg text-white">
        <div className="container-custom section-padding">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              О медицинском центре
            </h1>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-secondary-light max-w-3xl mx-auto px-2">
              Мы помогаем людям вернуться к здоровой жизни уже более 15 лет. 
              Наша миссия — профессиональная помощь в преодолении зависимостей.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
            <div className="px-2 sm:px-0">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Наша миссия
              </h2>
              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                Мы стремимся помочь каждому человеку, страдающему от алкогольной или наркотической зависимости, 
                вернуться к полноценной жизни. Наша цель — не просто избавить от зависимости, 
                а восстановить физическое и психическое здоровье, вернуть человека в общество.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base">Индивидуальный подход к каждому пациенту</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base">Использование современных методик лечения</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base">Полная анонимность и конфиденциальность</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm sm:text-base">Постоянная поддержка после лечения</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 sm:p-6 lg:p-8 mx-2 sm:mx-0">
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Наши ценности</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {values.map((value, index) => (
                  <div key={index} className="text-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-2 sm:mb-3">
                      <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">{value.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{value.description}</p>
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
          <div className="text-center mb-8 sm:mb-12 px-2 sm:px-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Наши достижения
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Цифры, которые говорят о качестве нашей работы
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 sm:gap-8 px-2 sm:px-0">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-1 sm:mb-2">
                  {achievement.number}
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">{achievement.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-12 px-2 sm:px-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Наша команда
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Опытные специалисты, которые помогут вам на пути к выздоровлению
            </p>
          </div>
          
          {/* Carousel Container */}
          <div className="relative max-w-4xl mx-auto px-4 sm:px-0">
            {/* Carousel Track */}
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: totalSlides }, (_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {team.slice(slideIndex * 2, slideIndex * 2 + 2).map((member, index) => (
                        <div key={slideIndex * 2 + index} className="bg-white rounded-lg p-4 sm:p-6 shadow-lg card-hover">
                          <div className="w-32 h-40 sm:w-48 sm:h-60 mx-auto mb-3 sm:mb-4">
                            {member.photo ? (
                              <Image
                                src={member.photo}
                                alt={member.name}
                                width={192}
                                height={240}
                                className="w-full h-full object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-full h-full bg-primary-light rounded-lg flex items-center justify-center">
                                <Users className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
                              </div>
                            )}
                          </div>
                          <h3 className="text-base sm:text-lg font-semibold text-center mb-1 sm:mb-2">{member.name}</h3>
                          <p className="text-primary text-center mb-1 sm:mb-2 text-sm sm:text-base">{member.position}</p>
                          <p className="text-xs sm:text-sm text-gray-500 text-center mb-2 sm:mb-3">{member.experience}</p>
                          <p className="text-gray-600 text-xs sm:text-sm text-center">{member.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons - Hidden on mobile, visible on larger screens */}
            <button
              onClick={prevSlide}
              className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              aria-label="Предыдущий слайд"
            >
              <ChevronLeft className="w-6 h-6 text-primary" />
            </button>
            
            <button
              onClick={nextSlide}
              className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
              aria-label="Следующий слайд"
            >
              <ChevronRight className="w-6 h-6 text-primary" />
            </button>

            {/* Mobile Navigation Buttons */}
            <div className="sm:hidden flex justify-center space-x-4 mt-6">
              <button
                onClick={prevSlide}
                className="bg-primary text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200"
                aria-label="Предыдущий слайд"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
               
              <button
                onClick={nextSlide}
                className="bg-primary text-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200"
                aria-label="Следующий слайд"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 sm:mt-8 space-x-2">
              {Array.from({ length: totalSlides }, (_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                    index === currentSlide 
                      ? 'bg-primary scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Перейти к слайду ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documents Section */}
      <DocumentsSection />

      {/* Contact Form Section */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-6 sm:mb-8 px-2 sm:px-0">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Получить консультацию
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Оставьте заявку, и наш специалист свяжется с вами для бесплатной консультации
            </p>
          </div>
          <div className="max-w-2xl mx-auto px-2 sm:px-0">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
