import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import StructuredData from './StructuredData';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [
    { name: 'Главная', href: '/' },
    ...items
  ];

  const structuredData = {
    items: allItems
  };

  return (
    <>
      <StructuredData type="breadcrumb" data={structuredData} />
      <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6" aria-label="Хлебные крошки">
        {allItems.map((item, index) => (
          <div key={item.href} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
            )}
            {index === 0 ? (
              <Link 
                href={item.href}
                className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                aria-label="Перейти на главную страницу"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">{item.name}</span>
              </Link>
            ) : index === allItems.length - 1 ? (
              <span className="text-gray-900 font-medium" aria-current="page">
                {item.name}
              </span>
            ) : (
              <Link 
                href={item.href}
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
