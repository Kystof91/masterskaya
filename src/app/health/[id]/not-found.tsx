import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="section-padding">
        <div className="container-custom max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <Search className="w-24 h-24 text-gray-400 mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Процедура не найдена
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              К сожалению, запрашиваемая процедура не существует или была удалена.
            </p>
          </div>
          
          <div className="space-y-4">
            <Link 
              href="/health" 
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к списку процедур
            </Link>
            
            <div className="pt-4">
              <Link 
                href="/contacts" 
                className="btn-primary"
              >
                Получить консультацию <ArrowRight className="w-5 h-5 mx-auto" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
