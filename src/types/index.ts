export type CategoryId =
  | 'sewing-basics'
  | 'clothing-repair'
  | 'patterns-projects'
  | 'fabric-crafts'
  | 'floral-fabric-art';

export interface Category {
  id: CategoryId;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  image: string;
  colorScheme: {
    badgeBg: string;
    badgeText: string;
    border: string;
  };
}

export interface MaterialItem {
  name: string;
  detail: string;
  optional?: boolean;
}

export interface TutorialStep {
  stepNumber: number;
  title: string;
  description: string;
  proTip?: string;
  checkpoint?: string;
}

export interface CommonMistake {
  mistake: string;
  consequence: string;
  solution: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  categoryId: CategoryId;
  categoryName: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  publishedDate: string;
  updatedDate: string;
  readTime: string;
  difficulty: 'Beginner' | 'Easy' | 'Intermediate';
  estimatedTime: string;
  author: {
    name: string;
    role: string;
    email: string;
  };
  introParagraphs: string[];
  materials: MaterialItem[];
  tools: MaterialItem[];
  preparation: string[];
  steps: TutorialStep[];
  mistakes: CommonMistake[];
  faqs: FAQItem[];
  troubleshootingTips: string[];
  illustrationType:
    | 'button-stitch'
    | 'tshirt-hole'
    | 'pant-hem'
    | 'body-measurements'
    | 'fabric-flowers'
    | 'loose-seam'
    | 'needle-types'
    | 'tote-bag';
  relatedSlugs: string[];
}
