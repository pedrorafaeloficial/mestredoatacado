import { useState, useMemo, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ShoppingBag, Star, Filter, Search, SlidersHorizontal, ArrowUpDown, X, ChevronLeft, ChevronRight, Heart, Loader2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Cart } from '../components/Cart';

export function Catalog() {
  const { products, categories, addToCart } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Carousel Ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Simulate loading for skeleton effect
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name-asc' | 'name-desc'>('name-asc');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Latest products for carousel (last 10 added)
  const latestProducts = useMemo(() => {
    return [...products].reverse().slice(0, 10);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category
      if (selectedCategory && product.categoryId !== selectedCategory) return false;
      
      // Search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!product.name.toLowerCase().includes(query) && 
            !product.description.toLowerCase().includes(query)) {
          return false;
        }
      }

      // Price
      if (priceRange.min && product.price < Number(priceRange.min)) return false;
      if (priceRange.max && product.price > Number(priceRange.max)) return false;

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        default: return 0;
      }
    });
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange({ min: '', max: '' });
    setSortBy('name-asc');
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  const scrollCarousel = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount 
        : scrollContainerRef.current.scrollLeft + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  const activeFiltersCount = [
    selectedCategory,
    searchQuery,
    priceRange.min,
    priceRange.max,
    sortBy !== 'name-asc'
  ].filter(Boolean).length;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans selection:bg-amber-500 selection:text-zinc-950">
      {/* 1. Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-amber-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <Header onCartClick={() => setIsCartOpen(true)} />
      
      <main className="pt-48 pb-24 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          {/* 2. Parallax-like Header Effect */}
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-display text-4xl md:text-5xl font-bold text-zinc-900 mb-4"
          >
            Nosso Catálogo
          </motion.h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Confira nosso catálogo completo de produtos com os melhores preços do mercado para o seu negócio.
          </p>
        </motion.div>

        {/* Latest Products Carousel */}
        <div className="mb-16 relative group/carousel">
          <h2 className="text-2xl font-bold text-zinc-900 mb-6 flex items-center gap-2">
            <Star className="w-6 h-6 text-amber-500 fill-current" />
            Novidades
          </h2>
          
          <div className="relative">
            {/* 3. Carousel Navigation Arrows */}
            <button 
              onClick={() => scrollCarousel('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white/80 backdrop-blur shadow-lg p-3 rounded-full text-zinc-900 opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-white hover:scale-110 disabled:opacity-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden scrollbar-hide"
            >
              {isLoading ? (
                // 4. Skeleton Loading for Carousel
                Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="min-w-[280px] md:min-w-[320px] bg-white rounded-2xl p-4 border border-zinc-100 animate-pulse">
                    <div className="aspect-video bg-zinc-200 rounded-xl mb-4" />
                    <div className="h-6 bg-zinc-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-zinc-200 rounded w-1/2" />
                  </div>
                ))
              ) : (
                latestProducts.map((product) => (
                  <motion.div 
                    key={product.id}
                    whileHover={{ y: -5 }}
                    className="min-w-[280px] md:min-w-[320px] snap-center bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-zinc-100 flex flex-col group"
                  >
                    <Link to={`/produto/${product.id}`} className="block relative aspect-video overflow-hidden bg-zinc-100 group/image">
                      <motion.img 
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        src={product.images[0]} 
                        alt={product.name}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${product.video ? 'group-hover/image:opacity-0' : ''}`}
                      />
                      {product.video && (
                        <video 
                          src={product.video} 
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                          muted 
                          loop 
                          playsInline
                          onMouseEnter={(e) => e.currentTarget.play()}
                          onMouseLeave={(e) => {
                            e.currentTarget.pause();
                            e.currentTarget.currentTime = 0;
                          }}
                        />
                      )}
                      <div className="absolute top-3 right-3 bg-amber-500 text-zinc-900 text-xs font-bold px-2 py-1 rounded-full shadow-lg z-10">
                        Novo
                      </div>
                    </Link>
                    <div className="p-4 flex flex-col flex-1">
                      <Link to={`/produto/${product.id}`} className="block">
                        <h3 className="font-bold text-zinc-900 line-clamp-1 mb-1 hover:text-amber-600 transition-colors">{product.name}</h3>
                        <p className="text-zinc-500 text-sm line-clamp-2 mb-3 flex-1">{product.description}</p>
                      </Link>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="font-bold text-lg">R$ {product.price.toFixed(2)}</span>
                        <motion.button 
                          whileTap={{ scale: 0.9 }}
                          onClick={() => addToCart(product, 1)}
                          className="bg-zinc-900 text-white p-2 rounded-lg hover:bg-amber-500 hover:text-zinc-900 transition-colors"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <button 
              onClick={() => scrollCarousel('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white/80 backdrop-blur shadow-lg p-3 rounded-full text-zinc-900 opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-white hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search and Filter Controls */}
        {/* 5. Glassmorphism Filter Bar */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-sm border border-zinc-200 p-4 mb-8 z-40 transition-all">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all bg-white/50"
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-colors border ${
                showFilters || activeFiltersCount > 0
                  ? 'bg-zinc-900 text-white border-zinc-900' 
                  : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>Filtros</span>
              {activeFiltersCount > 0 && (
                <span className="bg-amber-500 text-zinc-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-6 border-t border-zinc-100 mt-4 grid md:grid-cols-3 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Faixa de Preço</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => { setPriceRange(prev => ({ ...prev, min: e.target.value })); setCurrentPage(1); }}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:border-amber-500 outline-none bg-white/50"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => { setPriceRange(prev => ({ ...prev, max: e.target.value })); setCurrentPage(1); }}
                        className="w-full px-3 py-2 rounded-lg border border-zinc-200 focus:border-amber-500 outline-none bg-white/50"
                      />
                    </div>
                  </div>

                  {/* Sort */}
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-2">Ordenar por</label>
                    <div className="relative">
                      <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <select
                        value={sortBy}
                        onChange={(e) => { setSortBy(e.target.value as any); setCurrentPage(1); }}
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-zinc-200 focus:border-amber-500 outline-none appearance-none bg-white/50"
                      >
                        <option value="name-asc">Nome (A-Z)</option>
                        <option value="name-desc">Nome (Z-A)</option>
                        <option value="price-asc">Menor Preço</option>
                        <option value="price-desc">Maior Preço</option>
                      </select>
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <div className="flex items-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={clearFilters}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Limpar Filtros
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Categories */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-hide">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => { setSelectedCategory(null); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === null 
                  ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/20' 
                  : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
              }`}
            >
              Todos
            </motion.button>
            {categories.map(category => (
              <motion.button
                key={category.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => { setSelectedCategory(category.id); setCurrentPage(1); }}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category.id 
                    ? 'bg-zinc-900 text-white shadow-lg shadow-zinc-900/20' 
                    : 'bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200'
                }`}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
          <span className="text-zinc-500 text-sm whitespace-nowrap">{filteredProducts.length} produtos mostrados</span>
        </div>

        {/* 6. Staggered Grid Animation */}
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {isLoading ? (
             // Skeleton for Grid
             Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 border border-zinc-100 animate-pulse">
                <div className="aspect-square bg-zinc-200 rounded-xl mb-4" />
                <div className="h-6 bg-zinc-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-zinc-200 rounded w-full mb-4" />
                <div className="flex justify-between mt-auto">
                  <div className="h-8 bg-zinc-200 rounded w-1/3" />
                  <div className="h-10 bg-zinc-200 rounded w-10" />
                </div>
              </div>
            ))
          ) : (
            paginatedProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-zinc-100 group flex flex-col h-full relative"
              >
                {/* 7. Micro-interaction: Heart Icon */}
                <button className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-zinc-400 hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                  <Heart className="w-5 h-5" />
                </button>

                <Link to={`/produto/${product.id}`} className="block relative aspect-square overflow-hidden bg-zinc-100 cursor-pointer group/image">
                  {/* 8. Image Zoom Effect */}
                  <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={product.images[0]} 
                    alt={product.name}
                    className={`w-full h-full object-cover transition-opacity duration-300 ${product.video ? 'group-hover/image:opacity-0' : ''}`}
                  />
                  {product.video && (
                    <video 
                      src={product.video} 
                      className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover/image:opacity-100 transition-opacity duration-300"
                      muted 
                      loop 
                      playsInline
                      onMouseEnter={(e) => e.currentTarget.play()}
                      onMouseLeave={(e) => {
                        e.currentTarget.pause();
                        e.currentTarget.currentTime = 0;
                      }}
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-zinc-900 shadow-sm z-10">
                    {categories.find(c => c.id === product.categoryId)?.name}
                  </div>
                </Link>
                
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={`/produto/${product.id}`} className="font-bold text-lg text-zinc-900 line-clamp-2 hover:text-amber-600 transition-colors">
                      {product.name}
                    </Link>
                  </div>
                  
                  <p className="text-zinc-500 text-sm mb-4 line-clamp-2 flex-1">{product.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100">
                    <div>
                      <span className="text-xs text-zinc-400 block">A partir de</span>
                      <span className="text-2xl font-bold text-zinc-900">R$ {product.price.toFixed(2)}</span>
                    </div>
                    {/* 9. Button Tap Effect */}
                    <motion.button 
                      whileTap={{ scale: 0.9 }}
                      onClick={() => addToCart(product, 1)}
                      className="bg-zinc-900 text-white p-3 rounded-xl hover:bg-amber-500 hover:text-zinc-900 transition-colors shadow-lg shadow-zinc-900/10"
                    >
                      <ShoppingBag className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mb-16">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-zinc-200 hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                whileTap={{ scale: 0.9 }}
                onClick={() => handlePageChange(page)}
                className={`w-10 h-10 rounded-lg font-bold transition-colors ${
                  currentPage === page
                    ? 'bg-zinc-900 text-white'
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                {page}
              </motion.button>
            ))}

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-zinc-200 hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        )}

        {filteredProducts.length === 0 && !isLoading && (
          <div className="text-center py-24">
            <div className="bg-zinc-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Nenhum produto encontrado</h3>
            <p className="text-zinc-500 mb-6">Tente ajustar seus filtros ou buscar por outro termo.</p>
            <button 
              onClick={clearFilters}
              className="text-amber-600 font-bold hover:underline"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}


      </main>

      <Footer />
      <WhatsAppButton />
      {/* 10. Floating Cart Button for Mobile */}
      <AnimatePresence>
        {isCartOpen === false && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsCartOpen(true)}
            className="fixed bottom-24 right-6 z-40 md:hidden bg-zinc-900 text-white p-4 rounded-full shadow-xl shadow-zinc-900/30"
          >
            <ShoppingBag className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-amber-500 text-zinc-900 text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
              {useStore().cart.length}
            </span>
          </motion.button>
        )}
      </AnimatePresence>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
