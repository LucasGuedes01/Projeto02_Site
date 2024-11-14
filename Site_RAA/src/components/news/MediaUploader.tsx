import React, { useState } from 'react';
import { Upload, X, Video, Image as ImageIcon, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { NewsMedia } from '../../types/news';

interface MediaUploaderProps {
  media: NewsMedia[];
  onMediaChange: (media: NewsMedia[]) => void;
}

// Função para extrair o ID do vídeo do YouTube
const extractYouTubeId = (url: string): string | null => {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

// Função para validar se a URL é um link do YouTube
const validateYouTubeUrl = (url: string): boolean => {
  return extractYouTubeId(url) !== null;
};

// Função para converter URLs do Imgur para URL direta da imagem
const convertImgurUrl = (url: string): string => {
  const match = url.match(/(?:https?:\/\/)?(?:www\.)?imgur\.com\/([a-zA-Z0-9]+)(?:\.[a-zA-Z]+)?/);
  return match ? `https://i.imgur.com/${match[1]}.jpg` : url;
};

export default function MediaUploader({ media, onMediaChange }: MediaUploaderProps) {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const [isHovering, setIsHovering] = useState(-1);

  const handleAddMedia = () => {
    if (!url) {
      setError('Por favor, insira uma URL');
      return;
    }

    // Validação de URL do YouTube
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      if (!validateYouTubeUrl(url)) {
        setError('URL do YouTube inválida');
        return;
      }
      const newMedia = [...media, { type: 'video', url }];
      onMediaChange(newMedia);
      setUrl('');
      setError('');
      return;
    }

    // Validação e conversão de URL do Imgur
    if (url.includes('imgur.com')) {
      const imgurUrl = convertImgurUrl(url);
      const newMedia = [...media, { type: 'image', url: imgurUrl }];
      onMediaChange(newMedia);
      setUrl('');
      setError('');
      return;
    }

    // Validação de URLs de imagem
    if (url.match(/\.(jpeg|jpg|gif|png)$/)) {
      const newMedia = [...media, { type: 'image', url }];
      onMediaChange(newMedia);
      setUrl('');
      setError('');
      return;
    }

    setError('Por favor, use URLs de imagem válidas (incluindo Imgur) ou YouTube');
  };

  const removeMedia = (index: number) => {
    const newMedia = media.filter((_, i) => i !== index);
    onMediaChange(newMedia);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddMedia();
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Adicionar Mídia
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <LinkIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError('');
              }}
              onKeyPress={handleKeyPress}
              placeholder="Cole a URL do YouTube ou imagem (incluindo Imgur)"
              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <button
            type="button"
            onClick={handleAddMedia}
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Upload className="h-5 w-5" />
            <span className="hidden sm:inline">Adicionar</span>
          </button>
        </div>
        {error && (
          <div className="flex items-center gap-1 text-red-600 text-sm">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}
        <p className="text-sm text-gray-500">
          Suporta URLs do YouTube para vídeos e URLs de imagem (incluindo Imgur)
        </p>
      </div>

      {media.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {media.map((item, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setIsHovering(index)}
              onMouseLeave={() => setIsHovering(-1)}
            >
              {item.type === 'image' ? (
                <div className="relative aspect-video">
                  <img
                    src={item.url}
                    alt=""
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/640x360?text=Imagem+não+encontrada';
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity rounded-lg" />
                  <ImageIcon className="absolute top-2 left-2 h-5 w-5 text-white drop-shadow-lg" />
                </div>
              ) : (
                <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${extractYouTubeId(item.url)}`}
                    className="w-full h-full"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity pointer-events-none" />
                  <Video className="absolute top-2 left-2 h-5 w-5 text-white drop-shadow-lg" />
                </div>
              )}
              <button
                onClick={() => removeMedia(index)}
                className={`absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full transition-opacity duration-200 ${
                  isHovering === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
