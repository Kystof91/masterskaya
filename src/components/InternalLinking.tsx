import Link from 'next/link';
import { getRelatedLinks, getRelatedArticles } from '../lib/internalLinking';

interface InternalLinkingProps {
  keywords: string[];
  category?: string;
  tags?: string[];
  title?: string;
  className?: string;
  maxLinks?: number;
}

export default function InternalLinking({ 
  keywords, 
  category, 
  tags = [], 
  title = 'Полезные ссылки',
  className = '',
  maxLinks = 6
}: InternalLinkingProps) {
  const relatedLinks = getRelatedLinks(keywords).slice(0, Math.ceil(maxLinks / 2));
  const relatedArticles = category || tags.length > 0 
    ? getRelatedArticles(category || '', tags).slice(0, Math.ceil(maxLinks / 2))
    : [];

  if (relatedLinks.length === 0 && relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className={`py-8 bg-gray-50 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        {title && (
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {title}
          </h2>
        )}
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Связанные страницы */}
          {relatedLinks.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Основные услуги
              </h3>
              <div className="space-y-3">
                {relatedLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.href}
                    className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mr-3 group-hover:bg-primary/20 transition-colors">
                        <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors">
                          {link.text}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {link.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {link.keywords.slice(0, 3).map((keyword, keywordIndex) => (
                            <span
                              key={keywordIndex}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Связанные статьи */}
          {relatedArticles.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Полезные статьи
              </h3>
              <div className="space-y-3">
                {relatedArticles.map((article, index) => (
                  <Link
                    key={index}
                    href={article.href}
                    className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-primary hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-100 transition-colors">
                        <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {article.category}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {article.tags.slice(0, 2).map((tag, tagIndex) => (
                              <span
                                key={tagIndex}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Призыв к действию */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Нужна консультация?
            </h3>
            <p className="text-gray-600 mb-4">
              Получите бесплатную консультацию специалиста по лечению зависимостей
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contacts"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Записаться на консультацию
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Узнать об услугах
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
