import { Article } from '../types';
import { ANDRES_MARTINEZ } from './author';
import { AI_ARTICLES } from './articles/aiArticles';
import { DEV_ARTICLES } from './articles/devArticles';
import { CLOUD_ARTICLES } from './articles/cloudArticles';
import { SECURITY_ARTICLES } from './articles/securityArticles';

export { ANDRES_MARTINEZ };

export const CATEGORIES_LIST = [
  { id: 'todos', label: 'Todos los Artículos' },
  { id: 'ia', label: 'Inteligencia Artificial' },
  { id: 'desarrollo', label: 'Desarrollo de Software' },
  { id: 'cloud', label: 'Cloud & DevOps' },
  { id: 'ciberseguridad', label: 'Ciberseguridad' },
  { id: 'gadgets', label: 'Hardware & Redes' },
] as const;

/**
 * Catálogo completo de los 20 artículos técnicos de alto valor de 4kt,
 * redactados y validados por Andrés Martínez con arquitectura, código y benchmarks.
 */
export const ARTICLES_DATA: Article[] = [
  ...AI_ARTICLES,
  ...DEV_ARTICLES,
  ...CLOUD_ARTICLES,
  ...SECURITY_ARTICLES,
];
