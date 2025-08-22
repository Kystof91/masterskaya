import Link from 'next/link';
import { FileText, Clock, Tag } from 'lucide-react';
import { getRelatedArticles, RelatedContent } from '@/lib/internalLinking';

interface RelatedArticlesProps {
  currentCategory: string;
  currentTags: string[];
  excludeId?: number;
  maxItems?: number;
  className?: string;
}

export default function RelatedArticles({ 
  currentCategory, 
  currentTags, 
  excludeId,
  maxItems = 3,
  className = '' 
}: RelatedArticlesProps) {
  const relatedArticles = getRelatedArticles(currentCategory, currentTags)
    .filter(article => !excludeId || !article.href.includes(excludeId.toString()))
    .slice(0, maxItems);

  if (relatedArticles.length === 0) {
    return null;
  }

  return (
    <section className={`py-8 border-t border-gray-200 ${className}`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Похожие статьи
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {relatedArticles.map((article, index) => (
          <article 
            key={index}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Tag className="w-4 h-4 mr-2" />
                <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                  {article.category}
                </span>
              </div>
              
              <h4 className="font-semibold text-gray-900 mb-3 line-clamp-2">
                <Link 
                  href={article.href}
                  className="hover:text-primary transition-colors"
                >
                  {article.title}
                </Link>
              </h4>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {article.tags.slice(0, 2).map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Link 
                  href={article.href}
                  className="inline-flex items-center text-primary hover:text-primary-dark text-sm font-medium transition-colors"
                >
                  Читать далее
                  <FileText className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
      
      {/* Ссылка на все статьи */}
      <div className="text-center mt-8">
        <Link 
          href="/blog"
          className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        >
          Все статьи блога
          <FileText className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </section>
  );
}
