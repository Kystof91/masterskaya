'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import StructuredData from './StructuredData';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  description?: string;
  items: FAQItem[];
  className?: string;
}

export default function FAQ({ 
  title = "Часто задаваемые вопросы", 
  description = "Ответы на самые популярные вопросы о лечении зависимостей",
  items, 
  className = "" 
}: FAQProps) {
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
    questions: items
  };

  return (
    <section className={`py-12 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Структурированные данные */}
        <StructuredData type="faq" data={faqStructuredData} />
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
                  aria-expanded={openItems.has(index)}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-lg font-medium text-gray-900 pr-4">
                    {item.question}
                  </span>
                  {openItems.has(index) ? (
                    <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-primary flex-shrink-0" />
                  )}
                </button>
                
                <div
                  id={`faq-answer-${index}`}
                  className={`px-6 transition-all duration-300 ease-in-out ${
                    openItems.has(index) 
                      ? 'max-h-96 opacity-100 pb-4' 
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                  aria-hidden={!openItems.has(index)}
                >
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Не нашли ответ на свой вопрос?
          </p>
          <a
            href="/contacts"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Связаться с нами
          </a>
        </div>
      </div>
    </section>
  );
}
