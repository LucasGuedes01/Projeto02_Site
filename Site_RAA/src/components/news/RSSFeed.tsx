import React, { useState, useEffect } from 'react';
import { ExternalLink, RefreshCw } from 'lucide-react';

interface RSSItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
}

export default function RSSFeed() {
  const [feed, setFeed] = useState<RSSItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRSSFeed = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=' + 
        encodeURIComponent('https://news.google.com/rss/search?q=agro&hl=pt-BR&gl=BR&ceid=BR:pt-419'));
      const data = await response.json();
      
      if (data.status === 'ok') {
        setFeed(data.items);
      } else {
        setError('Erro ao carregar o feed RSS');
      }
    } catch (err) {
      setError('Erro ao carregar o feed RSS');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRSSFeed();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchRSSFeed}
          className="mt-2 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
        >
          <RefreshCw className="h-4 w-4" />
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 bg-green-600 text-white">
        <h2 className="text-lg font-semibold">Notícias do Agro</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {feed.slice(0, 5).map((item, index) => (
          <article key={index} className="p-4 hover:bg-gray-50 transition-colors">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <h3 className="text-gray-900 font-medium group-hover:text-green-600 mb-1">
                {item.title}
              </h3>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {new Date(item.pubDate).toLocaleDateString('pt-BR')}
                </span>
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-green-600" />
              </div>
            </a>
          </article>
        ))}
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <a
          href="https://news.google.com/search?q=agro&hl=pt-BR"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-green-600 hover:text-green-700 flex items-center justify-center gap-1"
        >
          Ver mais notícias
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}