import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

interface SEOOptimizedBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function SEOOptimizedBreadcrumbs({ items, className = '' }: SEOOptimizedBreadcrumbsProps) {
  const generateStructuredData = () => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": `https://mstrclinic.ru${item.href}`
      }))
    };

    return structuredData;
  };

  return (
    <>
      {/* Структурированные данные для поисковых систем */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateStructuredData())
        }}
      />
      
      {/* Визуальные хлебные крошки */}
      <nav 
        className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
        aria-label="Хлебные крошки"
      >
        <Link 
          href="/" 
          className="flex items-center hover:text-primary transition-colors"
          aria-label="Главная страница"
        >
          <Home className="w-4 h-4" />
        </Link>
        
        {items.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {item.isCurrent ? (
              <span 
                className="text-gray-900 font-medium"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link 
                href={item.href}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
