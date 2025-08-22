// Система внутренней перелинковки для SEO

export interface InternalLink {
  text: string;
  href: string;
  description: string;
  keywords: string[];
}

export interface RelatedContent {
  title: string;
  excerpt: string;
  href: string;
  category: string;
  tags: string[];
}

// Основные страницы для перелинковки
export const mainPages: InternalLink[] = [
  {
    text: 'Детоксикация',
    href: '/services',
    description: 'Безопасное выведение токсинов из организма',
    keywords: ['детоксикация', 'капельницы', 'вывод из запоя', 'очищение организма']
  },
  {
    text: 'Реабилитация',
    href: '/health',
    description: 'Комплексная программа восстановления',
    keywords: ['реабилитация', 'восстановление', 'лечение зависимостей', 'терапия']
  },
  {
    text: 'Психотерапия',
    href: '/methods',
    description: 'Индивидуальные и групповые сеансы',
    keywords: ['психотерапия', 'психолог', 'консультация', 'лечение']
  },
  {
    text: 'Цены',
    href: '/prices',
    description: 'Стоимость услуг и программы',
    keywords: ['цены', 'стоимость', 'тарифы', 'услуги']
  },
  {
    text: 'Контакты',
    href: '/contacts',
    description: 'Как связаться с нами',
    keywords: ['контакты', 'адрес', 'телефон', 'запись']
  }
];

// Связанные статьи по темам
export const relatedArticles: Record<string, RelatedContent[]> = {
  'детоксикация': [
    {
      title: 'ДЕТОКС (выведение из запоя, лечения алкоголизма и наркомании)',
      excerpt: 'Индивидуально подобранные курсы детоксикации с помощью капельниц',
      href: '/blog/1',
      category: 'Детоксикация',
      tags: ['детокс', 'капельницы', 'алкоголизм', 'наркомания']
    },
    {
      title: 'Специализированные курсы капельниц для комплексного восстановления организма',
      excerpt: 'Обзор самых эффективных методик лечения наркотической зависимости',
      href: '/blog/2',
      category: 'Методики',
      tags: ['наркомания', 'лечение', 'реабилитация', 'терапия']
    }
  ],
  'психотерапия': [
    {
      title: 'ПСИХОТЕРАПИЯ И ПСИХОЛОГИЧЕСКАЯ ПОМОЩЬ',
      excerpt: 'Пакеты психотерапии – выгодные условия для вашего восстановления',
      href: '/blog/3',
      category: 'Семейная терапия',
      tags: ['семья', 'поддержка', 'терапия', 'выздоровление']
    },
    {
      title: 'Групповая терапия – сила поддержки на пути к трезвости',
      excerpt: 'Что делать после завершения лечения, чтобы избежать возвращения к зависимости',
      href: '/blog/4',
      category: 'Профилактика',
      tags: ['профилактика', 'рецидив', 'выздоровление', 'советы']
    }
  ],
  'лечение зависимостей': [
    {
      title: 'Клиника «Мастерская»: профессиональная помощь в борьбе с зависимостями',
      excerpt: 'Современная клиника в Санкт-Петербурге, специализирующаяся на лечении',
      href: '/blog/6',
      category: 'Клиника',
      tags: ['клиника', 'алкоголизм', 'наркомания', 'лечение']
    },
    {
      title: 'Алкоголь и наркотики: разрушительная сила зависимостей и пути к выздоровлению',
      excerpt: 'О последствиях зависимостей и эффективных методах лечения',
      href: '/blog/7',
      category: 'Лечение зависимостей',
      tags: ['зависимости', 'лечение', 'алкоголизм', 'наркомания']
    }
  ]
};

// Функция для получения связанных ссылок по ключевым словам
export function getRelatedLinks(keywords: string[]): InternalLink[] {
  const related: InternalLink[] = [];
  
  keywords.forEach(keyword => {
    const lowerKeyword = keyword.toLowerCase();
    
    mainPages.forEach(page => {
      if (page.keywords.some(k => k.toLowerCase().includes(lowerKeyword) || 
                                   lowerKeyword.includes(k.toLowerCase()))) {
        if (!related.find(r => r.href === page.href)) {
          related.push(page);
        }
      }
    });
  });
  
  return related.slice(0, 3); // Максимум 3 связанные ссылки
}

// Функция для получения связанных статей
export function getRelatedArticles(category: string, tags: string[]): RelatedContent[] {
  const related: RelatedContent[] = [];
  
  // Поиск по категории
  Object.values(relatedArticles).forEach(articles => {
    articles.forEach(article => {
      if (article.category.toLowerCase().includes(category.toLowerCase()) ||
          category.toLowerCase().includes(article.category.toLowerCase())) {
        if (!related.find(r => r.href === article.href)) {
          related.push(article);
        }
      }
    });
  });
  
  // Поиск по тегам
  Object.values(relatedArticles).forEach(articles => {
    articles.forEach(article => {
      if (article.tags.some(tag => 
        tags.some(t => t.toLowerCase().includes(tag.toLowerCase()) || 
                      tag.toLowerCase().includes(t.toLowerCase())))) {
        if (!related.find(r => r.href === article.href)) {
          related.push(article);
        }
      }
    });
  });
  
  return related.slice(0, 3); // Максимум 3 связанные статьи
}

// Функция для создания контекстных ссылок в тексте
export function createContextualLinks(text: string): string {
  let enhancedText = text;
  
  // Добавление ссылок на основные услуги
  mainPages.forEach(page => {
    const regex = new RegExp(`\\b(${page.keywords.join('|')})\\b`, 'gi');
    enhancedText = enhancedText.replace(regex, (match) => {
      return `<a href="${page.href}" class="text-primary hover:underline" title="${page.description}">${match}</a>`;
    });
  });
  
  return enhancedText;
}

// Функция для генерации мета-описания с ключевыми словами
export function generateMetaDescription(text: string, keywords: string[]): string {
  let description = text;
  
  // Добавление ключевых слов в начало описания
  const mainKeywords = keywords.slice(0, 3).join(', ');
  if (!description.toLowerCase().includes(mainKeywords.toLowerCase())) {
    description = `${mainKeywords}. ${description}`;
  }
  
  // Ограничение длины
  if (description.length > 160) {
    description = description.substring(0, 157) + '...';
  }
  
  return description;
}
