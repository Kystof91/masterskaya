import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, Clock, CheckCircle, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Данные о процедурах
const proceduresData = {
  'vitamin-cocktail': {
    title: 'Капельница Детокс',
    description: 'Очищение тканей от токсинов и вредных метаболитов, восстановление поврежденных клеточных мембран',
    fullDescription: 'Капельница Детокс — очищение тканей от токсинов и вредных метаболитов, а затем – восстановление поврежденных клеточных мембран для полноценной защиты клетки от вредных воздействий. Основные компоненты включают солевые растворы, витамины и минералы, антиоксиданты и травяные экстракты.',
    benefits: [
      'Быстрое восстановление водно-электролитного баланса',
      'Улучшение общего состояния организма',
      'Очистка организма от токсинов и шлаков',
      'Повышение энергии и работоспособности',
      'Укрепление иммунной системы'
    ],
    duration: '45-60 минут',
    price: 'от 2500₽',
    preparation: 'За 2-3 дня исключить алкоголь, жирную пищу. Прийти натощак.',
    contraindications: 'Аллергические реакции на компоненты капельницы, хронические заболевания сердечно-сосудистой системы, беременность и лактация, тяжелые формы заболеваний печени и почек.',
    icon: '🧪',
    color: 'bg-blue-100 text-blue-600'
  },
  'detox-drip': {
    title: 'Капельница Anti-age',
    description: 'Замедление процессов старения, улучшение внешнего вида кожи, повышение уровня энергии',
    fullDescription: 'Основная цель данной капельницы — замедлить процессы старения, улучшить внешний вид кожи, повысить уровень энергии и общую жизнеспособность. После капельницы кожа становиться гладкой, привлекательной, более упругой. Морщины разглаживаются, появляется эффект фосфорной прозрачности и внутреннего сияния.',
    benefits: [
      'Быстрое улучшение внешнего вида кожи',
      'Увлажнение и питание на клеточном уровне',
      'Повышение уровня энергии и жизненного тонуса',
      'Профилактика старения и улучшение качества жизни',
      'Улучшение упругости и эластичности кожи'
    ],
    duration: '40-50 минут',
    price: 'от 2800₽',
    preparation: 'За неделю исключить алкоголь, за день – жирную пищу. Прийти натощак.',
    contraindications: 'Аллергия на компоненты капельницы, заболевания сердечно-сосудистой системы, беременность и лактация, определенные заболевания печени и почек.',
    icon: '✨',
    color: 'bg-green-100 text-green-600'
  },
  'energy-boost': {
    title: 'Капельница Anti-age интенсив',
    description: 'Специализированный инфузионный коктейль для борьбы с признаками старения и поддержания здоровья кожи',
    fullDescription: 'Капельница Anti-age интенсив — это специализированный инфузионный коктейль, разработанный для борьбы с признаками старения и поддержания общего здоровья кожи. Эта процедура направлена на восстановление молодости, упругости и свежести кожи, а также на улучшение общего самочувствия.',
    benefits: [
      'Быстрое улучшение общего состояния кожи',
      'Повышение уровня энергии и жизненного тонуса',
      'Устойчивый эффект увлажнения и питания',
      'Профилактика старения и поддержка здоровья на клеточном уровне',
      'Защита от свободных радикалов и агрессивной окружающей среды'
    ],
    duration: '30-60 минут',
    price: 'от 3200₽',
    preparation: 'За неделю исключить алкоголь, за день – жирную пищу. Прийти натощак.',
    contraindications: 'Аллергия на компоненты капельницы, заболевания сердечно-сосудистой системы, беременность и лактация, некоторые заболевания печени и почек.',
    icon: '⚡',
    color: 'bg-yellow-100 text-yellow-600'
  },
  'beauty-drip': {
    title: 'Капельница Лаеннек (1 ампула)',
    description: 'Медицинский препарат на основе экстракта печеночных клеток для восстановления функций печени',
    fullDescription: 'Капельница Лаеннек — это медицинский препарат, который используется для проведения инфузионной терапии и основывается на экстракте печеночных клеток. Препарат назван в честь французского врача Жана Лаеннека, который исследовал свойства печени. Капельница с гидролизатом плацентарных клеток «Лаеннек» - это один из действенных методов борьбы с возрастными изменениями.',
    benefits: [
      'Поддержка и восстановление функций печени',
      'Улучшение общего самочувствия и уровня энергии',
      'Профилактика заболеваний и их последствий',
      'Комплексное воздействие на организм',
      'Стимуляция обмена веществ и регенерации'
    ],
    duration: '30-60 минут',
    price: 'от 3500₽',
    preparation: 'Предварительное обследование и консультация с врачом. Прийти натощак.',
    contraindications: 'Аллергия на компоненты препарата, острые заболевания печени и почек, беременность и лактация, тромбофлебит и другие заболевания кровеносной системы.',
    icon: '💊',
    color: 'bg-pink-100 text-pink-600'
  },
  'immunity-support': {
    title: 'Капельница Иммуно',
    description: 'Инфузионная терапия для укрепления иммунной системы и улучшения общего состояния организма',
    fullDescription: 'Капельница "Иммуно" — это инфузионная терапия, направленная на укрепление иммунной системы и улучшение общего состояния организма. Эта процедура включает введение различных веществ, которые помогают увеличить защитные силы организма, особенно в периоды стресса, хронической усталости или после перенесенных заболеваний.',
    benefits: [
      'Укрепление иммунной системы',
      'Улучшение общего самочувствия',
      'Профилактика и снижение рисков инфекционных заболеваний',
      'Быстрое усвоение активных веществ через вену',
      'Восстановление после инфекционных болезней'
    ],
    duration: '30-120 минут',
    price: 'от 2700₽',
    preparation: 'Предварительное обследование и консультация с врачом. Можно принимать пищу.',
    contraindications: 'Аллергические реакции на компоненты препарата, авитаминоз или нарушения метаболизма витаминов, острые заболевания, некоторые хронические заболевания в стадии обострения.',
    icon: '🛡️',
    color: 'bg-red-100 text-red-600'
  },
  'recovery-drip': {
    title: 'Капельница Super energy',
    description: 'Специализированный раствор для повышения уровня энергии и восстановления организма после нагрузок',
    fullDescription: 'Капельница "Super Energy" — это специализированный инфузионный раствор, предназначенный для повышения уровня энергии, улучшения физической и умственной активности, а также восстановления организма после чрезмерных нагрузок и усталости. Способствует восстановлению поврежденных мембран клеток, препятствуя избыточному образованию свободных радикалов, а также очищает организм от токсинов.',
    benefits: [
      'Быстрое повышенное состояние энергии и работоспособности',
      'Устойчивость к умственным и физическим перегрузкам',
      'Улучшение общего самочувствия',
      'Комплексный подход к поддержанию здоровья',
      'Восстановление после заболеваний и стрессовых ситуаций'
    ],
    duration: '30-60 минут',
    price: 'от 3000₽',
    preparation: 'Консультация у специалиста. Прийти отдохнувшим.',
    contraindications: 'Индивидуальная непереносимость компонентов, острые заболевания и инфекционные процессы, аллергические реакции на витаминные комплексы, острые состояния сердечно-сосудистой системы.',
    icon: '🔄',
    color: 'bg-purple-100 text-purple-600'
  },
  'anti-aging': {
    title: 'Капельница Золушки',
    description: 'Восстановление жизненной энергии, улучшение состояния кожи и омоложение организма',
    fullDescription: 'Капельница "Золушка" предназначена для восстановления жизненной энергии, улучшения состояния кожи и омоложения организма. Она помогает быстро привести в порядок внешний вид и общее самочувствие, особенно после стресса или усталости.',
    benefits: [
      'Быстрое восстановление жизненных сил и энергии',
      'Улучшение состояния кожи и общее самочувствие',
      'Поддержка в борьбе со стрессами и физическими перегрузками',
      'Комплексный подход к поддержанию здоровья',
      'Улучшение аппетита и общего тонуса'
    ],
    duration: '30-45 минут',
    price: 'от 2500₽',
    preparation: 'Консультация врача. Прийти отдохнувшим.',
    contraindications: 'Индивидуальная непереносимость компонентов, острые заболевания и инфекционные процессы, аллергические реакции на витаминные комплексы, острая сердечно-сосудистая недостаточность.',
    icon: '⏰',
    color: 'bg-indigo-100 text-indigo-600'
  },
  'stress-relief': {
    title: 'Капельница Баланс железа',
    description: 'Терапевтическая процедура для коррекции уровня железа в организме при анемии',
    fullDescription: 'Недостаток железа - самая распространенная форма дефицита питательных веществ. Им страдают 80% населения. Признаками недостатка железа могут являться повышенная раздражительность, апатичность, быстрая утомляемость, плохой аппетит, выпадение волос. Капельница "Баланс железа" — это терапевтическая процедура, направленная на коррекцию уровня железа в организме.',
    benefits: [
      'Увеличение уровня гемоглобина',
      'Повышение уровня энергии',
      'Улучшение общего состояния',
      'Оптимизация функционирования различных систем организма',
      'Коррекция дефицита железа'
    ],
    duration: '30-60 минут',
    price: 'от 2900₽',
    preparation: 'Предварительное обследование для определения уровня железа. Прийти натощак.',
    contraindications: 'Аллергические реакции на компоненты, острые заболевания, беременность и лактация, тяжелые хронические болезни.',
    icon: '🧘',
    color: 'bg-teal-100 text-teal-600'
  },
  'custom-cocktail': {
    title: 'Капельница Коктейль Майерса',
    description: 'Витаминный коктейль с микроэлементами для устранения усталости и повышения жизненного тонуса',
    fullDescription: 'Капельница «Коктейль Майерса» — это витаминный коктейль, который сочетает нужные для организма взрослого человека микроэлементы и витамины. Устраняет мышечную усталость, улучшает общее состояние организма, повышает жизненный тонус, усиливает иммунную защиту организма на 40%, улучшается состояние кожи, стабилизирует артериальное давление.',
    benefits: [
      'Улучшение уровня энергии',
      'Поддержка иммунной системы',
      'Улучшение общего самочувствия',
      'Устранение мышечной усталости',
      'Стабилизация артериального давления'
    ],
    duration: '30-60 минут',
    price: 'от 3300₽',
    preparation: 'Предварительная консультация врача. Прийти натощак.',
    contraindications: 'Аллергические реакции на компоненты, острые заболевания, беременность, индивидуальная непереносимость.',
    icon: '🎯',
    color: 'bg-orange-100 text-orange-600'
  }
};

export default async function ProcedurePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const procedure = proceduresData[id as keyof typeof proceduresData];

  if (!procedure) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="gradient-bg text-white">
        <div className="container-custom section-padding">
          <div className="max-w-4xl mx-auto">
            <Link 
              href="/health" 
              className="inline-flex items-center text-blue-100 hover:text-white mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад к процедурам
            </Link>
            
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl ${procedure.color}`}>
                {procedure.icon}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                {procedure.title}
              </h1>
              <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                {procedure.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Procedure Details */}
      <section className="section-padding">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Описание процедуры</h2>
                <p className="text-gray-600 leading-relaxed">
                  {procedure.fullDescription}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Преимущества</h2>
                <ul className="space-y-3">
                  {procedure.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Подготовка к процедуре</h2>
                <p className="text-gray-600 leading-relaxed">
                  {procedure.preparation}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Противопоказания</h2>
                <p className="text-gray-600 leading-relaxed">
                  {procedure.contraindications}
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-lg border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Информация о процедуре</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Длительность</p>
                      <p className="font-medium text-gray-900">{procedure.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="w-5 h-5 text-gray-400 mr-3 text-xl font-bold">₽</span>
                    <div>
                      <p className="text-sm text-gray-500">Стоимость</p>
                      <p className="font-medium text-gray-900">{procedure.price}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Записаться на процедуру</h3>
                <div className="space-y-4">
                  <Link 
                    href="/contacts" 
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg text-center block hover:bg-blue-700 transition-colors"
                  >
                    Записаться
                  </Link>
                  <a 
                    href="tel:88124073407" 
                    className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg text-center block hover:bg-gray-200 transition-colors"
                  >
                    <Phone className="w-4 h-4 inline mr-2" />
                    Позвонить
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-lg border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Контакты</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">8-812-407-3-407</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-gray-400 mr-2" />
                    <a href="tel:+79117500700" className="text-gray-600 hover:text-blue-600 transition-colors">+7-911-750-07-00</a>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 text-gray-400 mr-2" />
                    <span className="text-gray-600">г. Санкт-Петербург</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Готовы улучшить свое здоровье?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Запишитесь на консультацию и получите персональные рекомендации по подбору процедуры
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacts" className="btn-primary">
              Получить консультацию <ArrowRight className="w-5 h-5 mx-auto" />
            </Link>
            <a href="tel:88124073407" className="btn-secondary">
              <Phone className="w-5 h-5 mr-2" />
              Позвонить сейчас<br />
              <span className="text-black">8-812-407-3-407</span>
            </a>
            <a href="tel:+79117500700" className="btn-secondary">
              <Phone className="w-5 h-5 mr-2" />
              +7-911-750-07-00
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
