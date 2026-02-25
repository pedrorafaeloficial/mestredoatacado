import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Category, CartItem } from '../types/store';
import { toast } from 'sonner';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  cart: CartItem[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: Category) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addToCart: (product: Product, quantity: number, selectedVariations?: Record<string, string>) => void;
  removeFromCart: (productId: string, selectedVariations?: Record<string, string>) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedVariations?: Record<string, string>) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  loading: boolean;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories')
        ]);
        
        if (productsRes.ok) {
          const productsData = await productsRes.json();
          setProducts(productsData);
        }
        
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Erro ao carregar dados do servidor');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Product Actions
  const addProduct = async (product: Product) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (!res.ok) throw new Error('Failed to add product');
      
      // We don't use the response directly because we need the camelCase mapping from GET
      // For simplicity, we just add the local object, but ideally we'd fetch or map the response
      setProducts(prev => [...prev, product]);
      toast.success('Produto adicionado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao adicionar produto');
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (!res.ok) throw new Error('Failed to update product');
      
      setProducts(prev => prev.map(p => p.id === product.id ? product : p));
      toast.success('Produto atualizado com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar produto');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Produto removido com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao remover produto');
    }
  };

  // Category Actions
  const addCategory = async (category: Category) => {
    try {
      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
      });
      if (!res.ok) throw new Error('Failed to add category');
      
      const newCategory = await res.json();
      setCategories(prev => [...prev, newCategory]);
      toast.success('Categoria adicionada com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao adicionar categoria');
    }
  };

  const updateCategory = async (category: Category) => {
    try {
      const res = await fetch(`/api/categories/${category.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
      });
      if (!res.ok) throw new Error('Failed to update category');
      
      const updatedCategory = await res.json();
      setCategories(prev => prev.map(c => c.id === category.id ? updatedCategory : c));
      toast.success('Categoria atualizada com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao atualizar categoria');
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete category');
      
      setCategories(prev => prev.filter(c => c.id !== id));
      toast.success('Categoria removida com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao remover categoria');
    }
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
      getCartTotal,
      loading
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
