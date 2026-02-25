import { motion, AnimatePresence } from 'motion/react';
import { X, Trash, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Cart({ isOpen, onClose }: CartProps) {
  const { cart, removeFromCart, updateCartQuantity, getCartTotal } = useStore();

  const handleCheckout = () => {
    const phoneNumber = "5511977957131";
    let message = "*Olá! Gostaria de fazer o seguinte pedido:*\n\n";
    
    // Sort cart items by SKU
    const sortedCart = [...cart].sort((a, b) => (a.sku || '').localeCompare(b.sku || ''));

    sortedCart.forEach(item => {
      message += `📦 *[${item.sku}] ${item.quantity}x ${item.name}*\n`;
      if (item.selectedVariations) {
        const variations = Object.entries(item.selectedVariations)
          .map(([key, value]) => `${key}: ${value}`)
          .join(' | ');
        message += `   _Obs: ${variations}_\n`;
      }
      message += `   Valor unit.: R$ ${item.price.toFixed(2)}\n`;
      message += `   Subtotal: R$ ${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    message += `💰 *Total do Pedido: R$ ${getCartTotal().toFixed(2)}*`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500 p-2 rounded-lg text-zinc-900">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-zinc-900">Seu Carrinho</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-zinc-200 rounded-full transition-colors">
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-400 text-center">
                  <ShoppingBag className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-lg font-medium">Seu carrinho está vazio</p>
                  <p className="text-sm">Adicione produtos para começar</p>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-zinc-100 rounded-xl overflow-hidden shrink-0">
                      <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-zinc-900 line-clamp-1">{item.name}</h3>
                      {item.selectedVariations && (
                        <div className="flex flex-wrap gap-1 mb-1">
                          {Object.entries(item.selectedVariations).map(([key, value]) => (
                            <span key={key} className="text-xs text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded">
                              {key}: {value}
                            </span>
                          ))}
                        </div>
                      )}
                      <p className="text-amber-600 font-bold mb-2">R$ {item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-zinc-100 rounded-lg p-1">
                          <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity - 1, item.selectedVariations)}
                            className="p-1 hover:bg-white rounded-md transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartQuantity(item.id, item.quantity + 1, item.selectedVariations)}
                            className="p-1 hover:bg-white rounded-md transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id, item.selectedVariations)}
                          className="text-zinc-400 hover:text-red-500 transition-colors p-2"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-zinc-100 bg-zinc-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-zinc-500 font-medium">Total do Pedido</span>
                  <span className="text-2xl font-black text-zinc-900">R$ {getCartTotal().toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-500/20"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Finalizar no WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
