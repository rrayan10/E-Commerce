import { Product, Category, Brand } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Women',
    slug: 'women',
    description: 'Curated essentials for the modern woman. Timeless pieces that transcend seasons.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80',
    productCount: 24,
  },
  {
    id: 'cat-2',
    name: 'Men',
    slug: 'men',
    description: 'Refined menswear built on quality and understated elegance.',
    image: 'https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80',
    productCount: 18,
  },
  {
    id: 'cat-3',
    name: 'Accessories',
    slug: 'accessories',
    description: 'Thoughtfully designed accessories to complete your look.',
    image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=800&q=80',
    productCount: 12,
  },
  {
    id: 'cat-4',
    name: 'Footwear',
    slug: 'footwear',
    description: 'Crafted footwear for every occasion.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    productCount: 15,
  },
];

export const brands: Brand[] = [
  {
    id: 'brand-1',
    name: 'Atelier Noir',
    slug: 'atelier-noir',
    description: 'French-inspired minimalism with an emphasis on impeccable tailoring and neutral palettes.',
    logo: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=200&q=80',
    productCount: 12,
  },
  {
    id: 'brand-2',
    name: 'Nordic Essence',
    slug: 'nordic-essence',
    description: 'Scandinavian design philosophy meeting sustainable fashion. Clean lines, natural materials.',
    logo: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=200&q=80',
    productCount: 15,
  },
  {
    id: 'brand-3',
    name: 'Casa Milano',
    slug: 'casa-milano',
    description: 'Italian craftsmanship refined through contemporary lens. Luxurious fabrics, timeless silhouettes.',
    logo: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&q=80',
    productCount: 10,
  },
  {
    id: 'brand-4',
    name: 'Terra Studio',
    slug: 'terra-studio',
    description: 'Earth-conscious fashion that doesn\'t compromise on style. Organic materials, ethical production.',
    logo: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&q=80',
    productCount: 8,
  },
];

export const products: Product[] = [
  {
    id: 'prod-1',
    name: 'Oversized Wool Coat',
    slug: 'oversized-wool-coat',
    description: 'A timeless oversized coat crafted from premium Italian wool. Features a relaxed silhouette, notched lapels, and hidden button closure. Fully lined with a single back vent.',
    price: 485,
    originalPrice: 650,
    images: [
      'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80',
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80',
    ],
    categoryId: 'cat-1',
    brandId: 'brand-1',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Charcoal', hex: '#2D2D2D' },
      { name: 'Camel', hex: '#C19A6B' },
      { name: 'Black', hex: '#0A0A0A' },
    ],
    inStock: true,
    featured: true,
    createdAt: '2024-01-15',
  },
  {
    id: 'prod-2',
    name: 'Cashmere Crew Sweater',
    slug: 'cashmere-crew-sweater',
    description: 'Ultra-soft cashmere knit in a classic crew neck silhouette. Relaxed fit with ribbed cuffs and hem. An essential layering piece.',
    price: 295,
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&q=80',
    ],
    categoryId: 'cat-1',
    brandId: 'brand-2',
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Ivory', hex: '#FFFFF0' },
      { name: 'Heather Grey', hex: '#9AA297' },
      { name: 'Navy', hex: '#1B2838' },
    ],
    inStock: true,
    featured: true,
    createdAt: '2024-01-20',
  },
  {
    id: 'prod-3',
    name: 'Tailored Wool Trousers',
    slug: 'tailored-wool-trousers',
    description: 'Impeccably tailored trousers in fine wool blend. High waist with pleated front, side pockets, and a slightly tapered leg.',
    price: 225,
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80',
    ],
    categoryId: 'cat-1',
    brandId: 'brand-3',
    sizes: ['24', '26', '28', '30', '32'],
    colors: [
      { name: 'Black', hex: '#0A0A0A' },
      { name: 'Tan', hex: '#D2B48C' },
    ],
    inStock: true,
    featured: false,
    createdAt: '2024-01-25',
  },
  {
    id: 'prod-4',
    name: 'Cotton Oxford Shirt',
    slug: 'cotton-oxford-shirt',
    description: 'Classic oxford shirt in premium organic cotton. Relaxed fit with button-down collar. A wardrobe essential.',
    price: 125,
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&q=80',
    ],
    categoryId: 'cat-2',
    brandId: 'brand-4',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Light Blue', hex: '#ADD8E6' },
      { name: 'Pale Pink', hex: '#F8D7DA' },
    ],
    inStock: true,
    featured: true,
    createdAt: '2024-02-01',
  },
  {
    id: 'prod-5',
    name: 'Leather Tote Bag',
    slug: 'leather-tote-bag',
    description: 'Minimalist tote in vegetable-tanned leather. Unlined interior with magnetic closure and internal pocket. Develops beautiful patina over time.',
    price: 395,
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    ],
    categoryId: 'cat-3',
    brandId: 'brand-1',
    sizes: ['One Size'],
    colors: [
      { name: 'Cognac', hex: '#9A463D' },
      { name: 'Black', hex: '#0A0A0A' },
    ],
    inStock: true,
    featured: true,
    createdAt: '2024-02-05',
  },
  {
    id: 'prod-6',
    name: 'Minimalist Leather Sneakers',
    slug: 'minimalist-leather-sneakers',
    description: 'Clean-lined sneakers in full-grain leather. Cushioned insole, rubber sole, and tonal laces. The perfect everyday shoe.',
    price: 245,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80',
    ],
    categoryId: 'cat-4',
    brandId: 'brand-2',
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44', '45'],
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Black', hex: '#0A0A0A' },
    ],
    inStock: true,
    featured: false,
    createdAt: '2024-02-10',
  },
  {
    id: 'prod-7',
    name: 'Silk Blend Scarf',
    slug: 'silk-blend-scarf',
    description: 'Lightweight scarf in silk and cashmere blend. Subtle jacquard pattern with hand-finished edges.',
    price: 145,
    images: [
      'https://images.unsplash.com/photo-1601370690183-1c7796ecec61?w=800&q=80',
    ],
    categoryId: 'cat-3',
    brandId: 'brand-3',
    sizes: ['One Size'],
    colors: [
      { name: 'Sand', hex: '#C2B280' },
      { name: 'Charcoal', hex: '#36454F' },
    ],
    inStock: true,
    featured: false,
    createdAt: '2024-02-15',
  },
  {
    id: 'prod-8',
    name: 'Double-Breasted Blazer',
    slug: 'double-breasted-blazer',
    description: 'Structured double-breasted blazer in wool-blend fabric. Peak lapels, flap pockets, and a slightly oversized fit.',
    price: 425,
    originalPrice: 525,
    images: [
      'https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=800&q=80',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80',
    ],
    categoryId: 'cat-2',
    brandId: 'brand-1',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Navy', hex: '#1B2838' },
      { name: 'Black', hex: '#0A0A0A' },
    ],
    inStock: true,
    featured: true,
    createdAt: '2024-02-20',
  },
];

// Helper functions
export const getProductById = (id: string): Product | undefined => 
  products.find(p => p.id === id);

export const getProductBySlug = (slug: string): Product | undefined => 
  products.find(p => p.slug === slug);

export const getCategoryById = (id: string): Category | undefined => 
  categories.find(c => c.id === id);

export const getCategoryBySlug = (slug: string): Category | undefined => 
  categories.find(c => c.slug === slug);

export const getBrandById = (id: string): Brand | undefined => 
  brands.find(b => b.id === id);

export const getBrandBySlug = (slug: string): Brand | undefined => 
  brands.find(b => b.slug === slug);

export const getProductsByCategory = (categoryId: string): Product[] => 
  products.filter(p => p.categoryId === categoryId);

export const getProductsByBrand = (brandId: string): Product[] => 
  products.filter(p => p.brandId === brandId);

export const getFeaturedProducts = (): Product[] => 
  products.filter(p => p.featured);
 