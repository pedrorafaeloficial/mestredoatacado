import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
});

export const ReviewSchema = z.object({
  id: z.string(),
  userName: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  date: z.string(),
});

export const VariationSchema = z.object({
  id: z.string(),
  name: z.string(),
  options: z.array(z.string())
});

export const ProductSchema = z.object({
  id: z.string(),
  sku: z.string().min(1, "SKU é obrigatório"),
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string(),
  price: z.number().min(0),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  images: z.array(z.string()).min(1, "Adicione pelo menos uma imagem"),
  minQuantity: z.number().min(1).default(1),
  stock: z.number().min(0).default(0),
  featured: z.boolean().default(false),
  specifications: z.record(z.string(), z.string()).optional(),
  reviews: z.array(ReviewSchema).default([]),
  variations: z.array(VariationSchema).default([]),
});

export type Category = z.infer<typeof CategorySchema>;
export type Product = z.infer<typeof ProductSchema>;
export type Review = z.infer<typeof ReviewSchema>;
export type Variation = z.infer<typeof VariationSchema>;

export interface CartItem extends Product {
  quantity: number;
  selectedVariations?: Record<string, string>;
}

export const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Moda', slug: 'moda' },
  { id: '2', name: 'Eletrônicos', slug: 'eletronicos' },
  { id: '3', name: 'Beleza', slug: 'beleza' },
  { id: '4', name: 'Ferramentas', slug: 'ferramentas' },
  { id: '5', name: 'Calçados', slug: 'calcados' },
  { id: '6', name: 'Brinquedos', slug: 'brinquedos' },
];

export const INITIAL_PRODUCTS: Product[] = [];
