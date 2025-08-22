import { useEffect, useState } from 'react';
import { checkTitleLength, checkDescriptionLength, analyzeHeadingStructure } from '../lib/technicalSEO';

interface MetaOptimizerProps {
  title: string;
  description: string;
  keywords: string[];
  headings: string[];
  className?: string;
  showAnalysis?: boolean;
}

export default function MetaOptimizer({ 
  title, 
  description, 
  keywords, 
  headings, 
  className = '',
  showAnalysis = false 
}: MetaOptimizerProps) {
  const [titleAnalysis, setTitleAnalysis] = useState(() => checkTitleLength(title));
  const [descriptionAnalysis, setDescriptionAnalysis] = useState(() => checkDescriptionLength(description));
  const [headingAnalysis, setHeadingAnalysis] = useState(() => analyzeHeadingStructure(headings));
  const [seoScore, setSeoScore] = useState(0);

  useEffect(() => {
    // Пересчет анализа при изменении данных
    setTitleAnalysis(checkTitleLength(title));
    setDescriptionAnalysis(checkDescriptionLength(description));
    setHeadingAnalysis(analyzeHeadingStructure(headings));
  }, [title, description, headings]);

  useEffect(() => {
    // Расчет общего SEO-счета
    let score = 0;
    let total = 0;

    // Анализ заголовка (30%)
    if (titleAnalysis.isValid) score += 30;
    total += 30;

    // Анализ описания (30%)
    if (descriptionAnalysis.isValid) score += 30;
    total += 30;

    // Анализ структуры заголовков (25%)
    if (headingAnalysis.isValid) score += 25;
    total += 25;

    // Анализ ключевых слов (15%)
    if (keywords.length >= 5 && keywords.length <= 15) score += 15;
    total += 15;

    setSeoScore(total > 0 ? Math.round((score / total) * 100) : 0);
  }, [titleAnalysis, descriptionAnalysis, headingAnalysis, keywords]);

  if (!showAnalysis) {
    return null;
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 90) return 'bg-green-100';
    if (score >= 70) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          SEO Анализ страницы
        </h2>
        
        {/* Общий SEO-счет */}
        <div className="text-center mb-8">
          <div className={`text-6xl font-bold mb-2 ${getScoreColor(seoScore)}`}>
            {seoScore}
          </div>
          <p className="text-lg text-gray-600">
            {seoScore >= 90 ? 'Отлично! Страница оптимизирована' : 
             seoScore >= 70 ? 'Хорошо, есть возможности для улучшения' : 
             'Требует значительной оптимизации'}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Анализ заголовка */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Заголовок страницы</h3>
            
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Длина</span>
                  <span className={`font-mono ${titleAnalysis.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {titleAnalysis.length} символов
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {titleAnalysis.recommendation}
                </p>
                <div className="text-sm">
                  <strong>Текущий заголовок:</strong>
                  <p className="mt-1 text-gray-700 font-mono bg-white p-2 rounded border">
                    {title}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Анализ описания */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Мета-описание</h3>
            
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Длина</span>
                  <span className={`font-mono ${descriptionAnalysis.isValid ? 'text-green-600' : 'text-red-600'}`}>
                    {descriptionAnalysis.length} символов
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  {descriptionAnalysis.recommendation}
                </p>
                <div className="text-sm">
                  <strong>Текущее описание:</strong>
                  <p className="mt-1 text-gray-700 font-mono bg-white p-2 rounded border">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Анализ структуры заголовков */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Структура заголовков</h3>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Статус</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                headingAnalysis.isValid 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {headingAnalysis.isValid ? '✅ Правильно' : '❌ Требует исправления'}
              </span>
            </div>
            
            {headingAnalysis.issues.length > 0 && (
              <div className="mb-3">
                <strong className="text-red-700">Проблемы:</strong>
                <ul className="mt-2 space-y-1">
                  {headingAnalysis.issues.map((issue, index) => (
                    <li key={index} className="text-sm text-red-600 flex items-start">
                      <span className="mr-2">•</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="text-sm">
              <strong>Текущая структура:</strong>
              <div className="mt-2 space-y-1">
                {headingAnalysis.structure.map((heading, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-8 h-8 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold mr-3">
                      {heading.charAt(1)}
                    </span>
                    <span className="font-mono text-gray-700">{heading}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Анализ ключевых слов */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ключевые слова</h3>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <span className="font-medium">Количество</span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                keywords.length >= 5 && keywords.length <= 15 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {keywords.length} слов
              </span>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">
              {keywords.length < 5 
                ? 'Добавьте больше ключевых слов (рекомендуется 5-15)' 
                : keywords.length > 15 
                ? 'Слишком много ключевых слов (рекомендуется 5-15)' 
                : 'Оптимальное количество ключевых слов'
              }
            </p>
            
            <div className="text-sm">
              <strong>Текущие ключевые слова:</strong>
              <div className="mt-2 flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Рекомендации по улучшению */}
        {seoScore < 90 && (
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-medium text-yellow-800 mb-3">Рекомендации по улучшению:</h4>
            <ul className="text-sm text-yellow-700 space-y-2">
              {!titleAnalysis.isValid && (
                <li>• Оптимизируйте заголовок страницы: {titleAnalysis.recommendation}</li>
              )}
              {!descriptionAnalysis.isValid && (
                <li>• Улучшите мета-описание: {descriptionAnalysis.recommendation}</li>
              )}
              {!headingAnalysis.isValid && (
                <li>• Исправьте структуру заголовков согласно иерархии H1 → H2 → H3</li>
              )}
              {(keywords.length < 5 || keywords.length > 15) && (
                <li>• Оптимизируйте количество ключевых слов (рекомендуется 5-15)</li>
              )}
              <li>• Добавьте больше релевантного контента на страницу (минимум 300-500 слов)</li>
              <li>• Используйте LSI-ключевые слова (семантически связанные)</li>
              <li>• Добавьте внутренние ссылки на связанные страницы</li>
            </ul>
          </div>
        )}

        {/* Статус оптимизации */}
        <div className="mt-6 text-center">
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getScoreBgColor(seoScore)} ${getScoreColor(seoScore)}`}>
            <span className="mr-2">
              {seoScore >= 90 ? '✅' : seoScore >= 70 ? '⚠️' : '❌'}
            </span>
            {seoScore >= 90 
              ? 'Страница полностью оптимизирована для SEO' 
              : seoScore >= 70 
              ? 'Страница частично оптимизирована' 
              : 'Страница требует значительной оптимизации'
            }
          </div>
        </div>
      </div>
    </div>
  );
}
