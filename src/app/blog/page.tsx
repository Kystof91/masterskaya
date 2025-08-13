import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  BookOpen,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { articlesData } from './data';
import Image from 'next/image';

// Функция для перемешивания массива (алгоритм Фишера-Йейтса)
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function BlogPage() {
  // Перемешиваем статьи при каждом рендере страницы
  const shuffledArticles = shuffleArray(articlesData);
  
  // Используем перемешанные данные
  const articles = shuffledArticles.map(article => ({
    id: article.id,
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    image: article.image,
    featured: shuffledArticles.indexOf(article) === 0 // Первая статья в перемешанном массиве как главная
  }));

  const categories = [
    { name: 'Все', count: articles.length },
    { name: 'Детоксикация', count: articles.filter(a => a.category === 'Детоксикация').length },
    { name: 'Методики', count: articles.filter(a => a.category === 'Методики').length },
    { name: 'Семейная терапия', count: articles.filter(a => a.category === 'Семейная терапия').length },
    { name: 'Профилактика', count: articles.filter(a => a.category === 'Профилактика').length },
    { name: 'Психология', count: articles.filter(a => a.category === 'Психология').length }
  ];

  const popularArticles = [
    {
      title: shuffledArticles[0]?.title || 'ДЕТОКС (выведение из запоя, лечения алкоголизма и наркомании)',
      id: shuffledArticles[0]?.id || 1
    },
    {
      title: shuffledArticles[1]?.title || 'Специализированные курсы капельниц для комплексного восстановления организма',
      id: shuffledArticles[1]?.id || 2
    },
    {
      title: shuffledArticles[2]?.title || 'ПСИХОТЕРАПИЯ И ПСИХОЛОГИЧЕСКАЯ ПОМОЩЬ',
      id: shuffledArticles[2]?.id || 3
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
              Блог
            </h1>
            <p className="text-xl mb-8 text-secondary-light max-w-3xl mx-auto">
              Экспертные статьи о лечении зависимостей, советы специалистов 
              и полезная информация для пациентов и их родственников.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="section-padding">
        <div className="container-custom">
          {articles.filter(article => article.featured).map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="relative h-64 lg:h-full">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover blog-image"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="bg-gray-200 h-full flex items-center justify-center">
                      <div className="text-center">
                        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">Изображение статьи</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-4">
                                    <span className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {article.category}
                </span>
                    <span className="text-gray-500 text-sm">Главная статья</span>
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">{article.title}</h2>
                  <p className="text-gray-600 mb-6">{article.excerpt}</p>
                  <Link href={`/blog/${article.id}`} className="btn-primary inline-flex items-center">
                    Читать статью
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Все статьи</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {articles.filter(article => !article.featured).map((article, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                    <div className="relative h-48">
                      {article.image ? (
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover blog-image"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      ) : (
                        <div className="bg-gray-200 h-full flex items-center justify-center">
                          <div className="text-center">
                            <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600 text-sm">Изображение</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <span className="bg-primary-light text-primary px-2 py-1 rounded text-xs font-medium">
                          {article.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-4 line-clamp-2">{article.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                      <Link href={`/blog/${article.id}`} className="text-primary hover:text-primary-hover text-sm font-medium">
                        Читать статью →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Categories */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Категории</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <Link 
                      key={index} 
                      href={`/blog?category=${category.name}`}
                      className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <span className="text-gray-500 text-sm">{category.count}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Popular Articles */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Популярные статьи</h3>
                <div className="space-y-4">
                  {popularArticles.map((article, index) => (
                    <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                      <Link href={`/blog/${article.id}`} className="block">
                        <h4 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-primary transition-colors">
                          {article.title}
                        </h4>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Form */}
              {/* <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Получить консультацию</h3>
                <ContactForm />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      {/* <section className="section-padding">
        <div className="container-custom">
          <div className="bg-primary-light rounded-lg p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <MessageSquare className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Подпишитесь на обновления
              </h2>
              <p className="text-gray-600 mb-6">
                Получайте новые статьи и полезные советы от наших специалистов
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Ваш email" 
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-primary focus:border-transparent"
                />
                <button className="btn-primary">
                  Подписаться
                </button>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
} 