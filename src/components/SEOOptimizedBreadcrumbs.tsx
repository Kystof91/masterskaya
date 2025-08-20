import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import StructuredData from './StructuredData';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface SEOOptimizedBreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function SEOOptimizedBreadcrumbs({ 
  items, 
  className = '' 
}: SEOOptimizedBreadcrumbsProps) {
  const allItems = [
    { name: 'Главная', url: '/' },
    ...items
  ];

  const structuredData = {
    items: allItems.map(item => ({
      name: item.name,
      url: `https://mstrclinic.ru${item.url}`
    }))
  };

  return (
    <>
      <StructuredData type="breadcrumb" data={structuredData} />
      <nav 
        className={`flex items-center space-x-2 text-sm text-gray-600 ${className}`}
        aria-label="Хлебные крошки"
      >
        {allItems.map((item, index) => (
          <div key={item.url} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            )}
            {index === 0 ? (
              <Link 
                href={item.url}
                className="flex items-center hover:text-blue-600 transition-colors"
                aria-label="Перейти на главную страницу"
              >
                <Home className="w-4 h-4 mr-1" />
                {item.name}
              </Link>
            ) : index === allItems.length - 1 ? (
              <span className="text-gray-900 font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link 
                href={item.url}
                className="hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </>
  );
}
