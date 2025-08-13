import { Article } from '@/app/blog/data';

// Клиентская версия storage для работы с localStorage
// Синхронизируется с сервером через API

// Ключ для localStorage
const STORAGE_KEY = 'blog_articles';

// Получение статей из localStorage
export function getStoredArticles(): Article[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Ошибка чтения из localStorage:', error);
    return [];
  }
}

// Сохранение статей в localStorage
export function setStoredArticles(articles: Article[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(articles));
  } catch (error) {
    console.error('Ошибка сохранения в localStorage:', error);
  }
}

// Инициализация статей - объединяем статические с сохраненными
export function initializeArticles(): Article[] {
  // Получаем сохраненные статьи из localStorage
  const storedArticles = getStoredArticles();
  
  // Если в localStorage нет статей, возвращаем пустой массив
  // Статические статьи будут загружены с сервера
  if (storedArticles.length === 0) {
    return [];
  }
  
  return storedArticles;
}

// Синхронизация с сервером
export async function syncWithServer(): Promise<Article[]> {
  try {
    const response = await fetch('/api/articles');
    if (response.ok) {
      const serverArticles = await response.json();
      // Сохраняем статьи сервера в localStorage
      setStoredArticles(serverArticles);
      return serverArticles;
    }
  } catch (error) {
    console.error('Ошибка синхронизации с сервером:', error);
  }
  
  // Если синхронизация не удалась, возвращаем сохраненные статьи
  return getStoredArticles();
}

// Добавление новой статьи
export async function addArticle(article: Omit<Article, 'id'>): Promise<Article | null> {
  try {
    const response = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article),
    });

    if (response.ok) {
      const newArticle = await response.json();
      
      // Обновляем localStorage
      const currentArticles = getStoredArticles();
      const updatedArticles = [...currentArticles, newArticle];
      setStoredArticles(updatedArticles);
      
      return newArticle;
    }
  } catch (error) {
    console.error('Ошибка добавления статьи:', error);
  }
  
  return null;
}

// Обновление статьи
export async function updateArticle(id: number, updates: Partial<Article>): Promise<Article | null> {
  try {
    const response = await fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });

    if (response.ok) {
      const updatedArticle = await response.json();
      
      // Обновляем localStorage
      const currentArticles = getStoredArticles();
      const updatedArticles = currentArticles.map(article => 
        article.id === id ? updatedArticle : article
      );
      setStoredArticles(updatedArticles);
      
      return updatedArticle;
    }
  } catch (error) {
    console.error('Ошибка обновления статьи:', error);
  }
  
  return null;
}

// Удаление статьи
export async function deleteArticle(id: number): Promise<boolean> {
  try {
    const response = await fetch(`/api/articles/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Обновляем localStorage
      const currentArticles = getStoredArticles();
      const updatedArticles = currentArticles.filter(article => article.id !== id);
      setStoredArticles(updatedArticles);
      
      return true;
    }
  } catch (error) {
    console.error('Ошибка удаления статьи:', error);
  }
  
  return false;
}

// Получение статьи по ID
export function getArticleById(id: number): Article | undefined {
  const articles = getStoredArticles();
  return articles.find(article => article.id === id);
}

// Получение всех статей
export function getAllArticles(): Article[] {
  return getStoredArticles();
}
