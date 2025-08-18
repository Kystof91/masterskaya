import { useState } from 'react';
import { Star, Quote, User, Calendar } from 'lucide-react';
import StructuredData from './StructuredData';

interface Review {
  id: string;
  authorName: string;
  rating: number;
  reviewText: string;
  datePublished: string;
  service?: string;
  verified?: boolean;
}

interface ReviewsProps {
  reviews: Review[];
  title?: string;
  description?: string;
  showAddReview?: boolean;
  className?: string;
}

export default function Reviews({ 
  reviews, 
  title = "Отзывы наших пациентов", 
  description = "Реальные истории людей, которые прошли лечение в нашем центре",
  showAddReview = true,
  className = "" 
}: ReviewsProps) {
  const [selectedRating, setSelectedRating] = useState(5);
  const [hoveredRating, setHoveredRating] = useState(0);

  // Структурированные данные для отзывов
  const reviewsStructuredData = {
    reviews: reviews.map(review => ({
      rating: review.rating,
      authorName: review.authorName,
      reviewText: review.reviewText,
      datePublished: review.datePublished
    }))
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starValue = index + 1;
      const isFilled = starValue <= rating;
      const isHovered = interactive && starValue <= hoveredRating;
      
      return (
        <button
          key={index}
          type={interactive ? "button" : "button"}
          onClick={() => interactive && onRatingChange?.(starValue)}
          onMouseEnter={() => interactive && setHoveredRating(starValue)}
          onMouseLeave={() => interactive && setHoveredRating(0)}
          className={`transition-colors duration-200 ${
            interactive ? 'cursor-pointer' : 'cursor-default'
          }`}
          disabled={!interactive}
        >
          <Star
            className={`h-5 w-5 ${
              isFilled || isHovered
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        </button>
      );
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <section className={`py-12 bg-white ${className}`}>
      <div className="container mx-auto px-4">
        {/* Структурированные данные */}
        <StructuredData type="review" data={reviewsStructuredData} />
        
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            {description}
          </p>
          
          {/* Общий рейтинг */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="flex items-center">
              {renderStars(Math.round(averageRating))}
            </div>
            <span className="text-2xl font-bold text-gray-900 ml-2">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-gray-600">
              ({reviews.length} отзывов)
            </span>
          </div>
        </div>

        {/* Отзывы */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                {/* Заголовок отзыва */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {review.authorName}
                      </h4>
                      {review.service && (
                        <p className="text-sm text-gray-600">
                          {review.service}
                        </p>
                      )}
                    </div>
                  </div>
                  {review.verified && (
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      Проверен
                    </span>
                  )}
                </div>

                {/* Рейтинг */}
                <div className="flex items-center mb-3">
                  {renderStars(review.rating)}
                  <span className="text-sm text-gray-600 ml-2">
                    {review.rating}/5
                  </span>
                </div>

                {/* Текст отзыва */}
                <div className="mb-4">
                  <Quote className="h-4 w-4 text-gray-400 mb-2" />
                  <p className="text-gray-700 leading-relaxed">
                    {review.reviewText}
                  </p>
                </div>

                {/* Дата */}
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(review.datePublished)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Форма добавления отзыва */}
        {showAddReview && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Оставить отзыв
              </h3>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                    Ваша оценка
                  </label>
                  <div className="flex items-center space-x-1">
                    {renderStars(selectedRating, true, setSelectedRating)}
                    <span className="text-sm text-gray-600 ml-2">
                      {selectedRating}/5
                    </span>
                  </div>
                </div>

                <div>
                  <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-2">
                    Ваш отзыв
                  </label>
                  <textarea
                    id="reviewText"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Поделитесь своим опытом лечения..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  Отправить отзыв
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
