import { Star, Quote } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  text: string;
  rating: number;
  date?: string;
  service?: string;
}

interface ReviewsProps {
  reviews: Review[];
  title?: string;
  showAll?: boolean;
  maxItems?: number;
  className?: string;
}

export default function Reviews({ 
  reviews, 
  title = 'Отзывы наших пациентов', 
  showAll = false,
  maxItems = 6,
  className = '' 
}: ReviewsProps) {
  const displayReviews = showAll ? reviews : reviews.slice(0, maxItems);
  
  // Генерация структурированных данных для отзывов
  const generateReviewsSchema = () => {
    const reviewsSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "Мастерская - Лечение зависимостей",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1),
        "reviewCount": reviews.length,
        "bestRating": "5",
        "worstRating": "1"
      },
      "review": reviews.map(review => ({
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": review.rating.toString(),
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": review.name
        },
        "reviewBody": review.text,
        "datePublished": review.date || new Date().toISOString().split('T')[0],
        "itemReviewed": {
          "@type": "MedicalService",
          "name": review.service || "Лечение зависимостей"
        }
      }))
    };

    return reviewsSchema;
  };

  return (
    <section className={`py-12 bg-white ${className}`}>
      {/* Структурированные данные для отзывов */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateReviewsSchema())
        }}
      />
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          <div className="flex items-center justify-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-6 h-6 ${
                  i < Math.round(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`} 
              />
            ))}
            <span className="ml-2 text-lg text-gray-600">
              {reviews.length} отзывов
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayReviews.map((review) => (
            <div 
              key={review.id}
              className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${
                        i < review.rating 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                {review.date && (
                  <span className="ml-auto text-sm text-gray-500">
                    {review.date}
                  </span>
                )}
              </div>
              
              <div className="mb-4">
                <Quote className="w-8 h-8 text-gray-300 mb-2" />
                <p className="text-gray-700 leading-relaxed">
                  {review.text}
                </p>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">
                  {review.name}
                </span>
                {review.service && (
                  <span className="text-sm text-primary bg-primary/10 px-2 py-1 rounded">
                    {review.service}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {!showAll && reviews.length > maxItems && (
          <div className="text-center mt-8">
            <button className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Показать все отзывы ({reviews.length})
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
