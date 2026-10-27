import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'sewing-basics',
    name: 'Sewing Basics',
    slug: 'sewing-basics',
    description: 'Essential foundational skills, hand-sewing stitches, needle selection, and measuring fundamentals for mindful crafting.',
    iconName: 'Scissors',
    image: '/assets/images/sewing-needle-guide.jpg',
    colorScheme: {
      badgeBg: 'bg-[#E3EBE5]',
      badgeText: 'text-[#3F5947]',
      border: 'border-[#C5D7C9]'
    }
  },
  {
    id: 'clothing-repair',
    name: 'Clothing Repair',
    slug: 'clothing-repair',
    description: 'Practical garment mending tutorials, button replacement, hole mending in knits, and reinforcing strained seams to extend wardrobe life.',
    iconName: 'Sparkles',
    image: '/assets/images/sewing-button-guide.jpg',
    colorScheme: {
      badgeBg: 'bg-[#F7EBEB]',
      badgeText: 'text-[#964E4E]',
      border: 'border-[#E8B4B4]'
    }
  },
  {
    id: 'patterns-projects',
    name: 'Patterns & Projects',
    slug: 'patterns-projects',
    description: 'Straightforward sewing projects, functional home goods, tote bags, and beginner garments with clear measurement guides.',
    iconName: 'BookOpen',
    image: '/assets/images/fabric-tote-bag.jpg',
    colorScheme: {
      badgeBg: 'bg-[#EAE5DE]',
      badgeText: 'text-[#5C4D44]',
      border: 'border-[#D6CCC0]'
    }
  },
  {
    id: 'fabric-crafts',
    name: 'Fabric Crafts',
    slug: 'fabric-crafts',
    description: 'Creative scrap fabric repurposing, hem alterations without machines, home decor accents, and tactile textile crafting.',
    iconName: 'Layers',
    image: '/assets/images/hem-pants-guide.jpg',
    colorScheme: {
      badgeBg: 'bg-[#E3EBE5]',
      badgeText: 'text-[#3F5947]',
      border: 'border-[#C5D7C9]'
    }
  },
  {
    id: 'floral-fabric-art',
    name: 'Floral Fabric Art',
    slug: 'floral-fabric-art',
    description: 'Handcrafted fabric blossoms, dimensional ribbon rosettes, petal assembly, and botanical textile embellishments for clothing and accessories.',
    iconName: 'Flower2',
    image: '/assets/images/fabric-flowers-tutorial.jpg',
    colorScheme: {
      badgeBg: 'bg-[#F7EBEB]',
      badgeText: 'text-[#964E4E]',
      border: 'border-[#E8B4B4]'
    }
  }
];

export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find(c => c.id === id || c.slug === id);
};
