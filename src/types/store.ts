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
  categoryId: z.string(),
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

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    sku: 'TSH-001',
    name: "Kit Camisetas Premium",
    description: "Kit com 10 camisetas 100% algodão fio 30.1 penteado. Cores variadas. Ideal para revenda ou uso próprio. Malha de alta qualidade que não desbota e não encolhe.",
    price: 29.90,
    categoryId: '1',
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop"
    ],
    minQuantity: 10,
    stock: 1000,
    featured: true,
    specifications: {
      "Material": "100% Algodão",
      "Fio": "30.1 Penteado",
      "Gola": "Redonda",
      "Cores": "Variadas"
    },
    reviews: [
      { id: '1', userName: 'Ricardo Silva', rating: 5, comment: 'Qualidade excelente, vendi tudo em 2 dias!', date: '2024-02-15' },
      { id: '2', userName: 'Ana Paula', rating: 4, comment: 'Muito boas, mas demorou um pouco a entrega.', date: '2024-02-10' }
    ],
    variations: []
  },
  {
    id: '2',
    sku: 'AUD-002',
    name: "Fone Bluetooth Pro",
    description: "Fone de ouvido sem fio com cancelamento de ruído ativo e bateria de longa duração. Conexão estável e som de alta fidelidade.",
    price: 45.00,
    categoryId: '2',
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"],
    minQuantity: 5,
    stock: 500,
    featured: true,
    specifications: {
      "Conexão": "Bluetooth 5.3",
      "Bateria": "Até 8 horas",
      "Cancelamento de Ruído": "Sim",
      "Resistência à Água": "IPX4"
    },
    reviews: [],
    variations: []
  },
  {
    id: '3',
    sku: 'WAT-003',
    name: "Smartwatch Series 8",
    description: "Relógio inteligente com monitoramento de saúde e notificações.",
    price: 89.90,
    categoryId: '2',
    images: ["https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=800&auto=format&fit=crop"],
    minQuantity: 5,
    stock: 300,
    featured: true,
    reviews: [],
    variations: []
  },
  {
    id: '4',
    sku: 'BEA-004',
    name: "Kit Maquiagem Completo",
    description: "Maleta profissional com sombras, batons e pincéis.",
    price: 120.00,
    categoryId: '3',
    images: ["https://images.unsplash.com/photo-1512496015851-a90fb38ba796?q=80&w=800&auto=format&fit=crop"],
    minQuantity: 3,
    stock: 100,
    featured: true,
    reviews: [],
    variations: []
  },
  {
    id: '5',
    sku: 'SHO-005',
    name: "Tênis Esportivo Run",
    description: "Tênis leve e confortável para corrida e dia a dia.",
    price: 65.00,
    categoryId: '5',
    images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop"],
    minQuantity: 6,
    stock: 200,
    featured: true,
    reviews: [],
    variations: []
  },
  {
    id: '6',
    sku: 'BAG-006',
    name: "Mochila Executiva",
    description: "Mochila resistente com compartimento para notebook.",
    price: 55.00,
    categoryId: '1',
    images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop"],
    minQuantity: 5,
    stock: 150,
    featured: true,
    reviews: [],
    variations: []
  }
];
