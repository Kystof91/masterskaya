'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowLeft,
  BookOpen
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { articlesData, getArticleById as getStaticArticleById, getRelatedArticles as getStaticRelatedArticles, Article } from '../data';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface BlogPostPageProps {
  params: {
    id: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const router = useRouter();
  const { id } = params;
  const articleId = parseInt(id);
  
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Функция для получения статьи через API
  const getArticleFromAPI = async (id: number): Promise<Article | null> => {
    try {
      const response = await fetch(`/api/articles/${id}`);
      
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error('Ошибка получения статьи через API:', error);
    }
    
    return null;
  };

  // Функция для получения связанных статей через API
  const getRelatedArticlesFromAPI = async (currentArticle: Article): Promise<Article[]> => {
    try {
      const response = await fetch('/api/articles');
      
      if (response.ok) {
        const allArticles = await response.json();
        return allArticles
          .filter((article: Article) => 
            article.id !== currentArticle.id && 
            (article.category === currentArticle.category || 
             article.tags.some(tag => currentArticle.tags.includes(tag)))
          )
          .slice(0, 3);
      }
    } catch (error) {
      console.error('Ошибка получения связанных статей через API:', error);
    }
    
    return [];
  };

  // Загрузка статьи при монтировании
  useEffect(() => {
    const loadArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Загружаем статью с ID:', articleId);
        
        // Сначала пытаемся получить статью через API
        let foundArticle = await getArticleFromAPI(articleId);
        console.log('Статья через API:', foundArticle ? 'найдена' : 'не найдена');
        
        // Если API не сработал, используем статические данные
        if (!foundArticle) {
          console.log('Пробуем статические данные...');
          foundArticle = getStaticArticleById(articleId) || null;
          console.log('Статья в статических данных:', foundArticle ? 'найдена' : 'не найдена');
        }
        
        if (!foundArticle) {
          console.log('Статья не найдена нигде, показываем 404');
          setError('Статья не найдена');
          setLoading(false);
          return;
        }
        
        console.log('Статья загружена:', foundArticle.title);
        setArticle(foundArticle);
        
        // Получаем связанные статьи
        try {
          const related = await getRelatedArticlesFromAPI(foundArticle);
          console.log('Связанные статьи через API:', related.length);
          setRelatedArticles(related);
        } catch (error) {
          console.log('Ошибка получения связанных статей через API, используем статические');
          const staticRelated = getStaticRelatedArticles(foundArticle);
          setRelatedArticles(staticRelated);
        }
        
      } catch (error) {
        console.error('Ошибка загрузки статьи:', error);
        setError('Ошибка загрузки статьи');
      } finally {
        setLoading(false);
      }
    };

    loadArticle();
  }, [articleId]);

  // Показываем загрузку
  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="section-padding">
          <div className="container-custom text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Загрузка статьи...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Показываем ошибку
  if (error || !article) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="section-padding">
          <div className="container-custom text-center">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8">
              <h1 className="text-2xl font-bold text-red-800 mb-4">Статья не найдена</h1>
              <p className="text-red-600 mb-6">
                {error || 'Запрашиваемая статья не существует или была удалена.'}
              </p>
              <Link 
                href="/blog" 
                className="inline-flex items-center text-primary hover:text-primary-hover font-medium"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Вернуться к блогу
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Breadcrumb */}
      <section className="bg-gray-50 py-4">
        <div className="container-custom">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Главная</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-primary">Блог</Link>
            <span>/</span>
            <span className="text-gray-900">{article.title}</span>
          </nav>
        </div>
      </section>

      {/* Article Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <article className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Article Header */}
                <div className="p-8 border-b border-gray-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-primary-light text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {article.category}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {article.title}
                  </h1>
                  <p className="text-xl text-gray-600 mb-6">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      {/* <span>{article.author}</span> */}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      {/* <span>{new Date(article.date).toLocaleDateString('ru-RU')}</span> */}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      {/* <span>{article.readTime}</span> */}
                    </div>
                  </div>
                </div>

                {/* Article Image */}
                <div className="relative h-64">
                  {article.image ? (
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover blog-image"
                      sizes="(max-width: 1024px) 100vw, 66vw"
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

                {/* Article Body */}
                <div className="p-8">
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                  
                  {/* Tags */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold mb-4">Теги:</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Похожие статьи</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {relatedArticles.map((relatedArticle, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden card-hover">
                        <div className="relative h-48">
                          {relatedArticle.image ? (
                            <Image
                              src={relatedArticle.image}
                              alt={relatedArticle.title}
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
                              {relatedArticle.category}
                            </span>
                          </div>
                          <h3 className="text-xl font-semibold mb-4 line-clamp-2">
                            {relatedArticle.title}
                          </h3>
                          <Link 
                            href={`/blog/${relatedArticle.id}`} 
                            className="text-primary hover:text-primary-hover text-sm font-medium"
                          >
                            Читать статью →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Back to Blog */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <Link 
                  href="/blog" 
                  className="inline-flex items-center text-primary hover:text-primary-hover font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Вернуться к блогу
                </Link>
              </div>

              {/* Share */}
              {/* <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Поделиться</h3>
                <div className="flex space-x-3">
                  <button className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
              </div> */}

              {/* Contact Form */}
              {/* <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Получить консультацию</h3>
                <ContactForm />
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 