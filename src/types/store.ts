import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome é obrigatório"),
  slug: z.string().optional(),
});

export const ReviewSchema = z.object({
  id: z.string().optional(),
  userName: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string(),
  date: z.string(),
});

export const VariationSchema = z.object({
  id: z.string().optional(),
  name: z.string().trim().min(1, "Nome da variação é obrigatório"),
  options: z.union([
    z.string().trim().min(1, "Adicione pelo menos uma opção"),
    z.array(z.string()).min(1, "Adicione pelo menos uma opção")
  ])
});

export const ProductSchema = z.object({
  id: z.string().optional(),
  sku: z.string().trim().min(1, "SKU é obrigatório"),
  name: z.string().trim().min(1, "Nome é obrigatório"),
  description: z.string().optional().default(""),
  price: z.coerce.number({ invalid_type_error: "Preço inválido" }).min(0, "Preço não pode ser negativo"),
  categoryId: z.string().min(1, "Categoria é obrigatória"),
  images: z.array(z.string()).min(1, "Adicione pelo menos uma imagem"),
  minQuantity: z.coerce.number({ invalid_type_error: "Quantidade inválida" }).min(1, "Mínimo 1").default(1),
  stock: z.coerce.number({ invalid_type_error: "Estoque inválido" }).min(0, "Mínimo 0").default(0),
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
