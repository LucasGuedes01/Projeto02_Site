import React, { useState, useEffect } from 'react';
import { Search, Calendar, ArrowRight, Tag, TrendingUp, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import RSSFeed from '../components/news/RSSFeed';
import { newsService } from '../services/newsService';
import { NewsArticle } from '../types/news';
import NewsViewer from '../components/news/NewsViewer';

export default function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setIsLoading(true);
      const data = await newsService.getAll();
      setArticles(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar notícias');
      console.error('Error loading articles:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleArticleClick = async (article: NewsArticle) => {
    setSelectedArticle(article);
    await newsService.incrementViews(article.id);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    const isPublished = article.published;
    return matchesSearch && matchesCategory && isPublished;
  });

  const categories = Array.from(new Set(articles.map(article => article.category)));

  return (
    <div className="pt-28">
      {/* Market Indicators */}
      <div className="bg-gray-900 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Açúcar (USD/lb):</span>
                <span className="font-semibold">0.2847</span>
                <span className="text-xs text-green-400">+1.2%</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Etanol Hidratado (R$/L):</span>
                <span className="font-semibold">3.25</span>
                <span className="text-xs text-green-400">+0.5%</span>
              </div>
            </div>
            <span className="text-sm">Fonte: UDOP - Atualizado em {new Date().toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Admin Link */}
        <div className="flex justify-end mb-6">
          <Link
            to="/noticias/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <Lock className="h-5 w-5" />
            Área Administrativa
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {selectedArticle ? (
              <>
                <button
                  onClick={handleCloseArticle}
                  className="mb-6 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900"
                >
                  <ArrowRight className="h-5 w-5 rotate-180" />
                  Voltar para lista de notícias
                </button>
                <NewsViewer article={selectedArticle} />
              </>
            ) : (
              <>
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Buscar notícias..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                    <div className="relative">
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="appearance-none pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
                      >
                        <option value="">Todas as categorias</option>
                        {categories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>

                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                    <p className="text-gray-600 mt-4">Carregando notícias...</p>
                  </div>
                ) : error ? (
                  <div className="text-center py-12 bg-red-50 rounded-lg">
                    <p className="text-red-600 text-lg">{error}</p>
                    <button
                      onClick={loadArticles}
                      className="mt-4 text-green-600 hover:text-green-700"
                    >
                      Tentar novamente
                    </button>
                  </div>
                ) : (
                  <div className="space-y-8">
                    {filteredArticles.map((article) => (
                      <article
                        key={article.id}
                        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => handleArticleClick(article)}
                      >
                        {article.media && article.media[0] && (
                          <div className="relative h-48">
                            {article.media[0].type === 'image' ? (
                              <img
                                src={article.media[0].url.replace(/^https?:\/\/imgur\.com/, 'https://i.imgur.com')}
                                alt={article.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/640x360?text=Imagem+não+encontrada';
                                }}
                              />
                            ) : (
                              <iframe
                                src={`https://www.youtube.com/embed/${newsService.extractYouTubeId(article.media[0].url)}`}
                                className="w-full h-full"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              />
                            )}
                            <div className="absolute top-4 left-4">
                              <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                                {article.category}
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="p-6">
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                            <Calendar className="h-4 w-4" />
                            {new Date(article.date).toLocaleDateString('pt-BR')}
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 mb-4">{article.excerpt}</p>
                          <div className="flex items-center gap-1 text-green-600 font-medium hover:text-green-700">
                            Ler mais
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </article>
                    ))}

                    {filteredArticles.length === 0 && (
                      <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-500 text-lg">
                          Nenhuma notícia encontrada com os critérios selecionados.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <RSSFeed />
          </div>
        </div>
      </div>
    </div>
  );
}