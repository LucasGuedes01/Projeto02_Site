import React, { useState, useEffect } from 'react';
import { ArrowRight, Leaf, Droplet, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';
import { newsService } from '../services/newsService';
import { NewsArticle } from '../types/news';
import RSSFeed from '../components/news/RSSFeed';

export default function Home() {
  const [latestNews, setLatestNews] = useState<NewsArticle[]>([]);

  useEffect(() => {
    const loadLatestNews = async () => {
      try {
        const allNews = await newsService.getAll();
        const publishedNews = allNews
          .filter(article => article.published)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 3);
        setLatestNews(publishedNews);
      } catch (error) {
        console.error('Error loading news:', error);
      }
    };

    loadLatestNews();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="h-screen relative flex items-center justify-center">
        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://i.imgur.com/tXzR4dz.mp4" type="video/mp4" />
        </video>

        {/* Overlay for darkening the background */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            A Força que Brota da Terra
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Transformando a natureza em energia sustentável para um futuro mais verde
          </p>
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Conheça Nossos Produtos
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Restante do componente */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Compromisso com a Excelência
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa dedicação à qualidade e sustentabilidade nos torna referência no setor sucroenergético
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Sustentabilidade</h3>
              <p className="text-gray-600">
                Compromisso com práticas sustentáveis e preservação ambiental em todo nosso processo produtivo
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                <Droplet className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Qualidade</h3>
              <p className="text-gray-600">
                Produtos de alta qualidade que atendem aos mais rigorosos padrões internacionais
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-yellow-100 rounded-full flex items-center justify-center">
                <Sun className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Inovação</h3>
              <p className="text-gray-600">
                Investimento constante em tecnologia e processos inovadores para melhor eficiência
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* News Sections */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Company News */}
            <div className="md:col-span-2">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Últimas Notícias
                </h2>
                <p className="text-xl text-gray-600">
                  Fique por dentro das novidades da Rio Amambai Agroenergia
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {latestNews.length > 0 ? (
                  latestNews.map((article) => (
                    <div key={article.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                      {article.media && article.media[0] && (
                        <img
                          src={article.media[0].url}
                          alt={article.title}
                          className="w-full h-48 object-cover"
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/640x360?text=Imagem+não+encontrada';
                          }}
                        />
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {article.excerpt}
                        </p>
                        <Link
                          to="/noticias"
                          className="text-green-600 font-semibold hover:text-green-700 inline-flex items-center gap-1"
                        >
                          Ler mais
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-12">
                    <p className="text-gray-500">Nenhuma notícia publicada ainda.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Agro News */}
            <div>
              <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Notícias do Agro
                </h2>
                <p className="text-xl text-gray-600">
                  Acompanhe as principais notícias do setor
                </p>
              </div>
              <RSSFeed />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}