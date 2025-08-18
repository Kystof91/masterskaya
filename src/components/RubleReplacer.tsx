'use client';

import { useEffect } from 'react';

/**
 * Компонент для автоматической замены символа рубля ₽ на р в мобильной версии
 * Работает на всех страницах сайта
 */
export default function RubleReplacer() {
  useEffect(() => {
    // Функция для замены символов рубля
    const replaceRubleSymbols = () => {
      // Проверяем, является ли устройство мобильным
      const isMobile = window.innerWidth <= 768;
      
      if (!isMobile) return;
      
      // Находим все текстовые узлы и заменяем символы
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null
      );
      
      const textNodes: Text[] = [];
      let node: Node | null;
      
      while (node = walker.nextNode()) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.includes('₽')) {
          textNodes.push(node as Text);
        }
      }
      
      // Заменяем символы в найденных узлах
      textNodes.forEach(textNode => {
        if (textNode.textContent) {
          textNode.textContent = textNode.textContent.replace(/₽/g, 'р');
        }
      });
    };

    // Заменяем символы при загрузке
    replaceRubleSymbols();
    
    // Заменяем символы при изменении размера окна
    window.addEventListener('resize', replaceRubleSymbols);
    
    // Заменяем символы при изменении содержимого
    const observer = new MutationObserver(() => {
      setTimeout(replaceRubleSymbols, 100);
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    // Очистка при размонтировании
    return () => {
      window.removeEventListener('resize', replaceRubleSymbols);
      observer.disconnect();
    };
  }, []);

  // Компонент не рендерит ничего видимого
  return null;
}
