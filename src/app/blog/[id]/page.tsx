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
import { getArticleById as getStaticArticleById, getRelatedArticles as getStaticRelatedArticles, Article } from '../data';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface BlogPostPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const articleId = parseInt(id);
  
  // Получаем статью из статических данных
  const article = getStaticArticleById(articleId);
  
  if (!article) {
    notFound();
  }
  
  // Получаем связанные статьи
  const relatedArticles = getStaticRelatedArticles(article);

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
                  
                  {/* Article Meta */}
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span>Опубликовано {new Date().toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>Время чтения: 5-7 мин</span>
                    </div>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      <span>Автор: Команда клиники</span>
                    </div>
                  </div>
                </div>

                {/* Article Image */}
                {article.image && (
                  <div className="relative h-64 md:h-96">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}

                {/* Article Body */}
                <div className="p-8">
                  <div 
                    className="prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                  
                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Теги
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4">Похожие статьи</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((relatedArticle) => (
                      <Link
                        key={relatedArticle.id}
                        href={`/blog/${relatedArticle.id}`}
                        className="block group"
                      >
                        <div className="flex items-start space-x-3">
                          {relatedArticle.image && (
                            <div className="relative w-16 h-16 flex-shrink-0">
                              <Image
                                src={relatedArticle.image}
                                alt={relatedArticle.title}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-primary line-clamp-2">
                              {relatedArticle.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {relatedArticle.category}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold mb-3">Нужна помощь?</h3>
                <p className="text-primary-light mb-4">
                  Обратитесь к нашим специалистам для консультации
                </p>
                <Link
                  href="/contacts"
                  className="inline-block bg-white text-primary px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Записаться
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 