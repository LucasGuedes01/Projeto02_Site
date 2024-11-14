import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { NewsArticle, NewsFormData } from '../../types/news';
import { newsService } from '../../services/newsService';

// Define as propriedades do componente NewsForm
interface NewsFormProps {
  article: NewsArticle | null; // O artigo existente para edição, ou nulo para um novo
  onSubmit: () => void;        // Função chamada ao enviar o formulário
  onCancel: () => void;        // Função chamada ao cancelar a operação
}

// Componente NewsForm
export default function NewsForm({ article, onSubmit, onCancel }: NewsFormProps) {
  // Estado local para armazenar os dados do formulário
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    image: '',
    published: false,
  });

  // useEffect para carregar os dados do artigo ao editar
  useEffect(() => {
    if (article) {
      // Se existe um artigo, inicializa o formData com os dados do artigo
      setFormData({
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        category: article.category,
        image: article.image,
        published: article.published,
      });
    }
  }, [article]);

  // Função para enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita o comportamento padrão de recarregar a página

    try {
      // Se há um artigo, atualiza; caso contrário, cria um novo
      if (article) {
        await newsService.update(article.id, formData);
      } else {
        await newsService.create(formData);
      }
      onSubmit(); // Chama a função onSubmit após o sucesso
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Ocorreu um erro ao salvar o artigo. Tente novamente.'); // Notifica o usuário em caso de erro
    }
  };

  return (
    // Modal de fundo escuro cobrindo a tela
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      {/* Contêiner centralizado do formulário */}
      <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-lg bg-white">
        {/* Cabeçalho do formulário */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            {article ? 'Editar Notícia' : 'Nova Notícia'} {/* Título dinâmico com base na operação */}
          </h2>
          <button
            onClick={onCancel} // Botão de cancelar/fechar
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" /> {/* Ícone X para fechar */}
          </button>
        </div>

        {/* Formulário com campos de entrada */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })} // Atualiza o estado ao digitar
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Campo de resumo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Resumo
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Campo de conteúdo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conteúdo
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          {/* Campos para categoria e imagem em uma grade de 2 colunas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>

            {/* Campo de URL da imagem */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL da Imagem
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          {/* Checkbox para publicar imediatamente */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
              Publicar imediatamente
            </label>
          </div>

          {/* Botões de ação: Cancelar e Enviar */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel} // Botão para cancelar
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit" // Botão de enviar
              className="px-4 py-2 text-sm font-medium text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
              {article ? 'Salvar Alterações' : 'Criar Notícia'} {/* Texto dinâmico com base na operação */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
