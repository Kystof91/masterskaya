'use client';

import { useState, useEffect } from 'react';
import { Article } from '../blog/data';
import { getAllArticles, addArticle, updateArticle, deleteArticle, syncWithServer } from '@/lib/storage';
import ImageUpload from '@/components/ImageUpload';

import { validateCredentials, getAuthPlaceholders } from '@/lib/auth';

interface AdminArticle extends Omit<Article, 'id'> {
  id?: number;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<AdminArticle | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<AdminArticle>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    tags: [],
    image: ''
  });

  // Аутентификация через скрытую конфигурацию
  const handleLogin = () => {
    if (validateCredentials(username, password)) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
    } else {
      alert('Неверные учетные данные');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuth');
  };

  // Загрузка статей
  useEffect(() => {
    if (isAuthenticated) {
      loadArticles();
    }
  }, [isAuthenticated]);

  // Проверка аутентификации при загрузке
  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Функция загрузки статей
  const loadArticles = async () => {
    try {
      // Синхронизируемся с сервером
      const serverArticles = await syncWithServer();
      setArticles(serverArticles);
    } catch (error) {
      console.error('Ошибка загрузки статей:', error);
      // Если сервер недоступен, используем локальные данные
      const localArticles = getAllArticles();
      setArticles(localArticles);
    }
  };

  // Обработка формы
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'tags') {
      setFormData(prev => ({
        ...prev,
        tags: value.split(',').map(tag => tag.trim())
      }));
    } else if (name !== 'image') { // Исключаем поле image, так как оно обрабатывается отдельно
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Добавление новой статьи
  const handleAddArticle = async () => {
    try {
      const newArticle = await addArticle(formData);
      
      if (newArticle) {
        setArticles(prev => [...prev, newArticle]);
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          category: '',
          tags: [],
          image: ''
        });
        alert('Статья успешно добавлена!');
      } else {
        alert('Ошибка при добавлении статьи');
      }
    } catch (error) {
      console.error('Ошибка добавления статьи:', error);
      alert('Ошибка при добавлении статьи');
    }
  };

  // Редактирование статьи
  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      tags: article.tags,
      image: article.image || ''
    });
    setIsEditing(true);
  };

  // Сохранение изменений
  const handleUpdateArticle = async () => {
    if (!editingArticle?.id) return;

    try {
      const updatedArticle = await updateArticle(editingArticle.id, formData);
      
      if (updatedArticle) {
        setArticles(prev => prev.map(article => 
          article.id === editingArticle.id ? updatedArticle : article
        ));
        setIsEditing(false);
        setEditingArticle(null);
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          category: '',
          tags: [],
          image: ''
        });
        alert('Статья успешно обновлена!');
      } else {
        alert('Ошибка при обновлении статьи');
      }
    } catch (error) {
      console.error('Ошибка обновления статьи:', error);
      alert('Ошибка при обновлении статьи');
    }
  };

  // Удаление статьи
  const handleDeleteArticle = async (id: number) => {
    if (!confirm('Вы уверены, что хотите удалить эту статью?')) return;

    try {
      const success = await deleteArticle(id);
      
      if (success) {
        setArticles(prev => prev.filter(article => article.id !== id));
        alert('Статья успешно удалена!');
      } else {
        alert('Ошибка при удалении статьи');
      }
    } catch (error) {
      console.error('Ошибка удаления статьи:', error);
      alert('Ошибка при удалении статьи');
    }
  };

  // Отмена редактирования
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingArticle(null);
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      tags: [],
      image: ''
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">Админ панель</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Имя пользователя
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={getAuthPlaceholders().usernamePlaceholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={getAuthPlaceholders().passwordPlaceholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover transition-colors"
            >
              Войти
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Админ панель</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Выйти
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Форма добавления/редактирования */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? 'Редактировать статью' : 'Добавить новую статью'}
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Заголовок *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Краткое описание *
                </label>
                <textarea
                  name="excerpt"
                  value={formData.excerpt}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Содержание *
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Категория *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Выберите категорию</option>
                  <option value="Детоксикация">Детоксикация</option>
                  <option value="Методики">Методики</option>
                  <option value="Семейная терапия">Семейная терапия</option>
                  <option value="Профилактика">Профилактика</option>
                  <option value="Психология">Психология</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Теги (через запятую)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags.join(', ')}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="детокс, лечение, восстановление"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Изображение
                </label>
                <ImageUpload
                  value={formData.image}
                  onChange={(imageUrl: string) => setFormData(prev => ({ ...prev, image: imageUrl }))}
                />
              </div>

              <div className="flex space-x-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleUpdateArticle}
                      className="flex-1 bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover transition-colors"
                    >
                      Обновить
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                    >
                      Отмена
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleAddArticle}
                    className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover transition-colors"
                  >
                    Добавить статью
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Список статей */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Существующие статьи</h2>
              <button
                onClick={loadArticles}
                className="text-primary hover:text-primary-hover text-sm"
              >
                Обновить
              </button>
            </div>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {articles.map((article) => (
                <div key={article.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-2 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-primary-light text-primary px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditArticle(article)}
                        className="text-blue-600 hover:text-blue-800 text-sm"
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Удалить
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {articles.length === 0 && (
                <p className="text-gray-500 text-center py-8">Статьи не найдены</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
