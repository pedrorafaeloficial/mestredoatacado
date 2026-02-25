import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, Category, CartItem, SkuPrefix } from '../types/store';
import { toast } from 'sonner';

interface StoreContextType {
  products: Product[];
  categories: Category[];
  skuPrefixes: SkuPrefix[];
  cart: CartItem[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  addCategory: (category: Category) => Promise<void>;
  updateCategory: (category: Category) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  addSkuPrefix: (prefix: SkuPrefix) => Promise<void>;
  updateSkuPrefix: (prefix: SkuPrefix) => Promise<void>;
  deleteSkuPrefix: (id: string) => Promise<void>;
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
  const [skuPrefixes, setSkuPrefixes] = useState<SkuPrefix[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async (retries = 5) => {
      try {
        const [productsRes, categoriesRes, prefixesRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/categories'),
          fetch('/api/sku-prefixes')
        ]);
        
        // Check products response
        const pContentType = productsRes.headers.get("content-type");
        if (!productsRes.ok || !pContentType || !pContentType.includes("application/json")) {
          throw new Error(`Failed to fetch products: ${productsRes.status} ${pContentType}`);
        }
        const productsData = await productsRes.json();
        if (isMounted) setProducts(productsData);
        
        // Check categories response
        const cContentType = categoriesRes.headers.get("content-type");
        if (!categoriesRes.ok || !cContentType || !cContentType.includes("application/json")) {
          throw new Error(`Failed to fetch categories: ${categoriesRes.status} ${cContentType}`);
        }
        const categoriesData = await categoriesRes.json();
        if (isMounted) setCategories(categoriesData);

        // Check prefixes response
        if (prefixesRes.ok) {
          const prefixesData = await prefixesRes.json();
          if (isMounted) setSkuPrefixes(prefixesData);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
        if (retries > 0 && isMounted) {
          console.log(`Retrying fetch... (${retries} attempts left)`);
          setTimeout(() => fetchData(retries - 1), 3000);
          return; // Skip finally block for retries
        }
        if (isMounted) {
          toast.error('Erro ao carregar dados do servidor. O banco de dados pode estar indisponível.');
          setLoading(false);
        }
      }
      
      if (isMounted) {
        setLoading(false);
      }
    };

    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Product Actions
  const addProduct = async (product: Product) => {
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || err.error || 'Failed to add product');
      }
      
      // We don't use the response directly because we need the camelCase mapping from GET
      // For simplicity, we just add the local object, but ideally we'd fetch or map the response
      setProducts(prev => [...prev, product]);
      toast.success('Produto adicionado com sucesso!');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Erro ao adicionar produto');
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || err.error || 'Failed to update product');
      }
      
      setProducts(prev => prev.map(p => p.id === product.id ? product : p));
      toast.success('Produto atualizado com sucesso!');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Erro ao atualizar produto');
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || err.error || 'Failed to delete product');
      }
      
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.success('Produto removido com sucesso!');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Erro ao remover produto');
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
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || err.error || 'Failed to add category');
      }
      
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Expected JSON response from server");
      }
      
      const newCategory = await res.json();
      setCategories(prev => [...prev, newCategory]);
      toast.success('Categoria adicionada com sucesso!');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Erro ao adicionar categoria');
    }
  };

  const updateCategory = async (category: Category) => {
    try {
      const res = await fetch(`/api/categories/${category.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || err.error || 'Failed to update category');
      }
      
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Expected JSON response from server");
      }
      
      const updatedCategory = await res.json();
      setCategories(prev => prev.map(c => c.id === category.id ? updatedCategory : c));
      toast.success('Categoria atualizada com sucesso!');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Erro ao atualizar categoria');
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || err.error || 'Failed to delete category');
      }
      
      setCategories(prev => prev.filter(c => c.id !== id));
      toast.success('Categoria removida com sucesso!');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Erro ao remover categoria');
    }
  };

  // Sku Prefix Actions
  const addSkuPrefix = async (prefix: SkuPrefix) => {
    try {
      const res = await fetch('/api/sku-prefixes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefix)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || err.error || 'Failed to add sku prefix');
      }
      
      const newPrefix = await res.json();
      setSkuPrefixes(prev => [...prev, newPrefix]);
      toast.success('Fornecedor adicionado com sucesso!');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Erro ao adicionar fornecedor');
    }
  };

  const updateSkuPrefix = async (prefix: SkuPrefix) => {
    try {
      const res = await fetch(`/api/sku-prefixes/${prefix.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefix)
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || err.error || 'Failed to update sku prefix');
      }
      
      const updatedPrefix = await res.json();
      setSkuPrefixes(prev => prev.map(p => p.id === prefix.id ? updatedPrefix : p));
      toast.success('Fornecedor atualizado com sucesso!');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Erro ao atualizar fornecedor');
    }
  };

  const deleteSkuPrefix = async (id: string) => {
    try {
      const res = await fetch(`/api/sku-prefixes/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || err.error || 'Failed to delete sku prefix');
      }
      
      setSkuPrefixes(prev => prev.filter(p => p.id !== id));
      toast.success('Fornecedor removido com sucesso!');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Erro ao remover fornecedor');
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
      skuPrefixes,
      cart,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      addSkuPrefix,
      updateSkuPrefix,
      deleteSkuPrefix,
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
