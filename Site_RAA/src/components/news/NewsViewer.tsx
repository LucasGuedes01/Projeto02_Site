import React, { useEffect, useState } from 'react';
import { Eye, AlertCircle, Loader2 } from 'lucide-react';
import { NewsArticle } from '../../types/news';

interface NewsViewerProps {
  article: NewsArticle;
  onView?: () => void;
}

export default function NewsViewer({ article, onView }: NewsViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (onView) {
      try {
        onView();
      } catch (err) {
        console.error('Error updating view count:', err);
        // Não exibe erro para o usuário em contagem de visualizações
      }
    }
    setIsLoading(false);
  }, [onView]);

  const extractYouTubeId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match?.[2] || '';
  };

  const renderMedia = (media: NewsArticle['media'][0]) => {
    if (media.type === 'image') {
      return (
        <img
          src={media.url}
          alt=""
          className="w-full h-auto rounded-lg"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/640x360?text=Imagem+não+encontrada';
          }}
        />
      );
    }

    if (media.type === 'video') {
      const videoId = extractYouTubeId(media.url);
      if (videoId) {
        return (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full rounded-lg"
            />
          </div>
        );
      }
    }

    return null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 text-red-600">
        <AlertCircle className="h-6 w-6 mr-2" />
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500">
            {new Date(article.date).toLocaleDateString('pt-BR')}
          </span>
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <Eye className="h-4 w-4" />
            {article.views} visualizações
          </span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>

        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-8">{article.excerpt}</p>

          {article.media && article.media.length > 0 && (
            <div className="space-y-6 mb-8">
              {article.media.map((media, index) => (
                <div key={index}>
                  {renderMedia(media)}
                </div>
              ))}
            </div>
          )}

          <div className="whitespace-pre-wrap text-gray-700">
            {article.content}
          </div>
        </div>

        {/* Rodapé com a menção ao autor */}
        <footer className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Postado por: <span className="font-semibold">{article.author || "Rio Amambai Agroenergia"}</span>
          </p>
        </footer>
      </div>
    </div>
  );
}
