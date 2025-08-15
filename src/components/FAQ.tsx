'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import StructuredData from './StructuredData';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
  description?: string;
}

export default function FAQ({ items, title = "Часто задаваемые вопросы", description }: FAQProps) {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
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
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <StructuredData type="article" data={faqStructuredData} />
        
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {items.map((item) => (
            <div key={item.question} className="bg-white rounded-lg shadow-sm border border-gray-200">
              <button
                onClick={() => toggleItem(items.indexOf(item))}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                aria-expanded={openItems.includes(items.indexOf(item))}
                aria-controls={`faq-answer-${items.indexOf(item)}`}
              >
                <span className="text-lg font-medium text-gray-900 pr-4">
                  {item.question}
                </span>
                {openItems.includes(items.indexOf(item)) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              <div
                id={`faq-answer-${items.indexOf(item)}`}
                className={`px-6 pb-4 transition-all duration-300 ease-in-out ${
                  openItems.includes(items.indexOf(item)) 
                    ? 'max-h-96 opacity-100' 
                    : 'max-h-0 opacity-0 overflow-hidden'
                }`}
                aria-hidden={!openItems.includes(items.indexOf(item))}
              >
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
