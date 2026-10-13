export type Category = 
  | 'todos'
  | 'ia'
  | 'desarrollo'
  | 'cloud'
  | 'ciberseguridad'
  | 'gadgets';

export interface Author {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  email: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface ArticleSection {
  id: string;
  title: string;
  paragraphs: string[];
  codeBlock?: {
    language: string;
    code: string;
    caption?: string;
  };
  callout?: {
    type: 'info' | 'warning' | 'tip' | 'quote';
    title?: string;
    content: string;
  };
  table?: {
    headers: string[];
    rows: string[][];
  };
  bulletPoints?: string[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  categoryLabel: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  author: Author;
  coverImage: string;
  imageAlt: string;
  tags: string[];
  keyTakeaways: string[];
  sections: ArticleSection[];
  featured?: boolean;
  views?: number;
  wordCount?: number;
}

export interface Comment {
  id: string;
  authorName: string;
  date: string;
  content: string;
  avatarBg: string;
}

export type PageView = 
  | { type: 'home'; category?: Category }
  | { type: 'article'; slug: string }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'privacy' }
  | { type: 'terms' }
  | { type: 'cookies' };
