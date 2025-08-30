'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface AutoInternalLinkingProps {
  content: string;
  className?: string;
  maxLinks?: number;
  excludeWords?: string[];
}

interface LinkData {
  text: string;
  url: string;
  relevance: number;
}

export default function AutoInternalLinking({
  content,
  className = '',
  maxLinks = 5,
  excludeWords = ['и', 'в', 'на', 'с', 'по', 'для', 'от', 'до', 'из', 'за', 'под', 'над', 'между', 'через', 'около', 'вокруг', 'внутри', 'вне', 'при', 'без', 'кроме', 'вместо', 'вопреки', 'благодаря', 'согласно', 'вследствие', 'ввиду', 'вслед', 'в течение', 'в продолжение', 'в силу', 'в связи с', 'по причине', 'по поводу', 'по случаю', 'по мере', 'по направлению к', 'по отношению к', 'по сравнению с', 'по образцу', 'по примеру', 'по повелению', 'по приказу', 'по распоряжению', 'по указанию', 'по совету', 'по рекомендации', 'по предложению', 'по инициативе', 'по истечении', 'по окончании', 'по завершении', 'по прибытии', 'по приезде', 'по приходе', 'по возвращении', 'по приезде', 'по приходе', 'по возвращении']
}: AutoInternalLinkingProps) {
  const [processedContent, setProcessedContent] = useState<string>('');

  // База данных внутренних ссылок с приоритетами
  const internalLinks: Record<string, LinkData> = {
    'детоксикация': {
      text: 'детоксикация',
      url: '/services/detox',
      relevance: 0.9
    },
    'детоксикация организма': {
      text: 'детоксикация организма',
      url: '/services/detox',
      relevance: 0.95
    },
    'выведение токсинов': {
      text: 'выведение токсинов',
      url: '/services/detox',
      relevance: 0.9
    },
    'капельницы': {
      text: 'капельницы',
      url: '/services/detox',
      relevance: 0.85
    },
    'вывод из запоя': {
      text: 'вывод из запоя',
      url: '/services/emergency',
      relevance: 0.9
    },
    'реабилитация': {
      text: 'реабилитация',
      url: '/services/rehabilitation',
      relevance: 0.9
    },
    'реабилитация зависимостей': {
      text: 'реабилитация зависимостей',
      url: '/services/rehabilitation',
      relevance: 0.95
    },
    'психотерапия': {
      text: 'психотерапия',
      url: '/services/therapy',
      relevance: 0.9
    },
    'психолог': {
      text: 'психолог',
      url: '/services/therapy',
      relevance: 0.8
    },
    'психиатр': {
      text: 'психиатр',
      url: '/services/therapy',
      relevance: 0.8
    },
    'нарколог': {
      text: 'нарколог',
      url: '/services',
      relevance: 0.85
    },
    'семейная терапия': {
      text: 'семейная терапия',
      url: '/services/family-therapy',
      relevance: 0.9
    },
    'лечение алкоголизма': {
      text: 'лечение алкоголизма',
      url: '/services',
      relevance: 0.95
    },
    'лечение наркомании': {
      text: 'лечение наркомании',
      url: '/services',
      relevance: 0.95
    },
    'лечение зависимости': {
      text: 'лечение зависимости',
      url: '/services',
      relevance: 0.9
    },
    'алкогольная зависимость': {
      text: 'алкогольная зависимость',
      url: '/services',
      relevance: 0.9
    },
    'наркотическая зависимость': {
      text: 'наркотическая зависимость',
      url: '/services',
      relevance: 0.9
    },
    'кодирование': {
      text: 'кодирование',
      url: '/services/coding',
      relevance: 0.85
    },
    'кодирование от алкоголизма': {
      text: 'кодирование от алкоголизма',
      url: '/services/coding',
      relevance: 0.95
    },
    'анонимно': {
      text: 'анонимно',
      url: '/about',
      relevance: 0.7
    },
    'конфиденциально': {
      text: 'конфиденциально',
      url: '/about',
      relevance: 0.7
    },
    'круглосуточно': {
      text: 'круглосуточно',
      url: '/contacts',
      relevance: 0.6
    },
    'санкт-петербург': {
      text: 'Санкт-Петербург',
      url: '/contacts',
      relevance: 0.8
    },
    'спб': {
      text: 'СПб',
      url: '/contacts',
      relevance: 0.8
    },
    'цены': {
      text: 'цены',
      url: '/prices',
      relevance: 0.8
    },
    'стоимость': {
      text: 'стоимость',
      url: '/prices',
      relevance: 0.8
    },
    'отзывы': {
      text: 'отзывы',
      url: '/reviews',
      relevance: 0.7
    },
    'методы лечения': {
      text: 'методы лечения',
      url: '/methods',
      relevance: 0.85
    },
    'здоровье': {
      text: 'здоровье',
      url: '/health',
      relevance: 0.7
    },
    'блог': {
      text: 'блог',
      url: '/blog',
      relevance: 0.6
    }
  };

  // Функция для поиска и замены текста на ссылки
  const processContent = (text: string): string => {
    let processedText = text;
    let linkCount = 0;
    const usedLinks = new Set<string>();

    // Сортируем ссылки по релевантности (от высокой к низкой)
    const sortedLinks = Object.entries(internalLinks)
      .sort(([,a], [,b]) => b.relevance - a.relevance);

    for (const [keyword, linkData] of sortedLinks) {
      if (linkCount >= maxLinks) break;
      
      // Проверяем, не использовали ли мы уже эту ссылку
      if (usedLinks.has(linkData.url)) continue;

      // Создаем регулярное выражение для поиска ключевого слова
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      
      // Проверяем, есть ли совпадения
      if (regex.test(processedText)) {
        // Заменяем первое вхождение на ссылку
        processedText = processedText.replace(
          regex,
          `<a href="${linkData.url}" class="text-blue-600 hover:text-blue-800 underline transition-colors duration-200" title="${linkData.text}">${linkData.text}</a>`
        );
        
        usedLinks.add(linkData.url);
        linkCount++;
      }
    }

    return processedText;
  };

  // Обработка контента при изменении
  useEffect(() => {
    const processed = processContent(content);
    setProcessedContent(processed);
  }, [content, maxLinks]);

  // Функция для безопасного рендеринга HTML
  const createMarkup = (html: string) => {
    return { __html: html };
  };

  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={createMarkup(processedContent)}
    />
  );
}
