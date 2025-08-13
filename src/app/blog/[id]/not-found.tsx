import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function BlogNotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      
      {/* 404 Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow-lg p-12">
              <div className="mb-8">
                <BookOpen className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Статья не найдена
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  К сожалению, запрашиваемая статья не существует или была удалена.
                </p>
              </div>
              
              <div className="space-y-4">
                <Link 
                  href="/blog" 
                  className="btn-primary inline-flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Вернуться к блогу
                </Link>
                
                <div className="pt-4">
                  <Link 
                    href="/" 
                    className="text-primary hover:text-primary-hover font-medium"
                  >
                    Перейти на главную страницу
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
} 