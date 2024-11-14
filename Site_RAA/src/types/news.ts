export interface NewsMedia {
  type: 'image' | 'video';
  url: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  media: NewsMedia[];
  date: string;
  published: boolean;
  views: number;
  createdAt?: any;
  updatedAt?: any;
}

export interface NewsFormData {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  media: NewsMedia[];
  published: boolean;
}

// types/news.ts

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  published: boolean;
  author: string;  // Novo campo para o autor
}
