import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Category, CartItem, INITIAL_PRODUCTS, INITIAL_CATEGORIES } from '../types/store';
import { toast } from 'sonner';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  addToCart: (product: Product, quantity: number, selectedVariations?: Record<string, string>) => void;
  removeFromCart: (productId: string, selectedVariations?: Record<string, string>) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedVariations?: Record<string, string>) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Product Actions
  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, product]);
    toast.success('Produto adicionado com sucesso!');
  };

  const updateProduct = (product: Product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
    toast.success('Produto atualizado com sucesso!');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    toast.success('Produto removido com sucesso!');
  };

  // Category Actions
  const addCategory = (category: Category) => {
    setCategories(prev => [...prev, category]);
    toast.success('Categoria adicionada com sucesso!');
  };

  const updateCategory = (category: Category) => {
    setCategories(prev => prev.map(c => c.id === category.id ? category : c));
    toast.success('Categoria atualizada com sucesso!');
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    toast.success('Categoria removida com sucesso!');
  };

  // Cart Actions
  const addToCart = (product: Product, quantity: number, selectedVariations?: Record<string, string>) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(item => 
        item.id === product.id && 
        JSON.stringify(item.selectedVariations) === JSON.stringify(selectedVariations)
      );

      if (existingIndex >= 0) {
        const newCart = [...prev];
        newCart[existingIndex].quantity += quantity;
        return newCart;
      }
      return [...prev, { ...product, quantity, selectedVariations }];
    });
    toast.success('Adicionado ao carrinho!');
  };

  const removeFromCart = (productId: string, selectedVariations?: Record<string, string>) => {
    setCart(prev => prev.filter(item => 
      !(item.id === productId && JSON.stringify(item.selectedVariations) === JSON.stringify(selectedVariations))
    ));
  };

  const updateCartQuantity = (productId: string, quantity: number, selectedVariations?: Record<string, string>) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedVariations);
      return;
    }
    setCart(prev => prev.map(item => 
      (item.id === productId && JSON.stringify(item.selectedVariations) === JSON.stringify(selectedVariations))
        ? { ...item, quantity } 
        : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <StoreContext.Provider value={{
      products,
      categories,
      cart,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
