import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { Cart } from '../components/Cart';
import { ShoppingBag, Star, ChevronLeft, Minus, Plus, Share2, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, categories, addToCart } = useStore();
  const product = products.find(p => p.id === id);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});

  // ... (existing checks)

  const handleAddToCart = () => {
    // Validate variations
    if (product?.variations && product.variations.length > 0) {
      const missingVariations = product.variations.filter(v => !selectedVariations[v.name]);
      if (missingVariations.length > 0) {
        toast.error(`Por favor, selecione: ${missingVariations.map(v => v.name).join(', ')}`);
        return;
      }
    }

    if (product) {
      addToCart(product, quantity, selectedVariations);
      setIsCartOpen(true);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Produto não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8 pt-24">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-8 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          Voltar
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery & Video */}
          <div className="space-y-4">
            <div className={`grid gap-4 ${product.video ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
              <div className="aspect-square bg-zinc-100 rounded-2xl overflow-hidden relative">
                <motion.img 
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {product.video && (
                <div className="aspect-square bg-zinc-100 rounded-2xl overflow-hidden relative">
                  <video 
                    src={product.video} 
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                      selectedImage === index ? 'border-zinc-900' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl font-bold text-zinc-900 mb-2">{product.name}</h1>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-zinc-900">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="text-xl text-zinc-400 line-through">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="space-y-4">
                {/* Variations Selection */}
                {product.variations && product.variations.length > 0 && (
                  <div className="space-y-4 border-b border-zinc-100 pb-4">
                    {product.variations.map(variation => (
                      <div key={variation.id}>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                          {variation.name}: <span className="text-zinc-900 font-bold">{selectedVariations[variation.name]}</span>
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {variation.options.map(option => (
                            <button
                              key={option}
                              onClick={() => setSelectedVariations(prev => ({ ...prev, [variation.name]: option }))}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                                selectedVariations[variation.name] === option
                                  ? 'bg-zinc-900 text-white border-zinc-900'
                                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300'
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-zinc-200 rounded-xl bg-zinc-50">
                    <button 
                      onClick={() => setQuantity(Math.max(product.minQuantity, quantity - 1))}
                      className="p-3 hover:bg-zinc-200 rounded-l-xl transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-3 hover:bg-zinc-200 rounded-r-xl transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-sm text-zinc-500">
                    Mínimo: <span className="font-bold text-zinc-900">{product.minQuantity} unidades</span>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-zinc-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-amber-500 hover:text-zinc-900 transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Adicionar ao Carrinho
                </button>
                
                {product.stock > 0 ? (
                  <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                    <Check className="w-4 h-4" />
                    Em estoque ({product.stock} disponíveis)
                  </div>
                ) : (
                  <div className="text-red-500 text-sm font-medium">
                    Produto indisponível
                  </div>
                )}
              </div>
            

            <div className="space-y-8">
              <section>
                <h3 className="text-xl font-bold text-zinc-900 mb-4">Descrição</h3>
                <div className="prose prose-zinc max-w-none text-zinc-600">
                  <p>{product.description}</p>
                </div>
              </section>

              {product.specifications && Object.keys(product.specifications).length > 0 && (
                <section>
                  <h3 className="text-xl font-bold text-zinc-900 mb-4">Especificações</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b border-zinc-100 pb-2">
                        <span className="text-zinc-500">{key}</span>
                        <span className="font-medium text-zinc-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="border-t border-zinc-200 pt-16">
          <h2 className="text-2xl font-bold text-zinc-900 mb-8">Avaliações dos Clientes</h2>
          
          {product.reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.reviews.map((review) => (
                <div key={review.id} className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-bold text-zinc-900">{review.userName}</div>
                    <span className="text-xs text-zinc-400">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-1 text-amber-500 mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-zinc-200'}`} 
                      />
                    ))}
                  </div>
                  <p className="text-zinc-600 text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
              <Star className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
              <p className="text-zinc-500">Este produto ainda não possui avaliações.</p>
            </div>
          )}
        </section>
      </main>

      <Footer />
      <WhatsAppButton />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
