'use client';

import { useState } from 'react';
import StructuredData from './StructuredData';

interface FAQItem {
  question: string;
  answer: string;
  keywords?: string[];
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  description?: string;
  className?: string;
}

export default function FAQ({ items, title = 'Часто задаваемые вопросы', description, className = '' }: FAQProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  // Структурированные данные для FAQ
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item, index) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className={`py-8 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        {title && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
            {description && (
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
            )}
          </div>
        )}
        
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                aria-expanded={openItems.has(index)}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-medium text-gray-900 pr-4">
                  {item.question}
                </span>
                <span className="flex-shrink-0">
                  <svg
                    className={`w-5 h-5 text-gray-500 transform transition-transform ${
                      openItems.has(index) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              
              <div
                id={`faq-answer-${index}`}
                className={`px-6 pb-4 transition-all duration-300 ease-in-out ${
                  openItems.has(index) ? 'block opacity-100' : 'hidden opacity-0'
                }`}
                aria-hidden={!openItems.has(index)}
              >
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  {item.keywords && item.keywords.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.keywords.map((keyword, keywordIndex) => (
                        <span
                          key={keywordIndex}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Структурированные данные */}
      <StructuredData type="faq" data={faqStructuredData} />
    </section>
  );
}
