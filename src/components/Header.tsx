import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { ShoppingBag, UserCog, Menu, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onCartClick?: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const location = useLocation();
  const { cart } = useStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isCatalog = location.pathname === '/catalogo';
  const isHome = location.pathname === '/';

  return (
    <header className={`absolute top-0 left-0 right-0 z-50 pt-2 pb-2 ${!isHome ? 'bg-white/80 backdrop-blur-md shadow-sm' : ''}`}>
      <div className="container mx-auto px-6 flex justify-between items-center relative">
        <Link to="/" className="hover:opacity-80 transition-opacity z-50">
          <Logo className="scale-50 md:scale-75 origin-left" variant={isHome && !isMobileMenuOpen ? "light" : "dark"} />
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={`${isHome ? 'text-white/80 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'} font-medium transition-colors`}>Início</Link>
          <a href="/#problema" className={`${isHome ? 'text-white/80 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'} font-medium transition-colors`}>Sobre</a>
          <a href="/#faq" className={`${isHome ? 'text-white/80 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'} font-medium transition-colors`}>Dúvidas</a>
          <Link to="/admin" className={`${isHome ? 'text-white/80 hover:text-amber-500' : 'text-zinc-600 hover:text-amber-600'} font-medium transition-colors flex items-center gap-1`}>
            <UserCog className="w-4 h-4" />
            Área Admin
          </Link>
        </nav>

        <div className="flex items-center gap-4 z-50">
          {isCatalog && onCartClick ? (
            <button 
              onClick={onCartClick}
              className="inline-flex items-center gap-2 bg-zinc-900 text-white px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg relative text-sm md:text-base"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Carrinho</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-zinc-900 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-zinc-50">
                  {cart.length}
                </span>
              )}
            </button>
          ) : (
            <Link 
              to="/catalogo" 
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20 text-sm md:text-base"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Ver Catálogo</span>
            </Link>
          )}
          
          <button 
            className={`md:hidden p-2 rounded-lg ${isHome && !isMobileMenuOpen ? 'text-white hover:bg-white/10' : 'text-zinc-900 hover:bg-zinc-100'}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 bg-white shadow-xl rounded-b-3xl pt-24 pb-8 px-6 flex flex-col gap-6 md:hidden z-40"
          >
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-bold text-zinc-900 border-b border-zinc-100 pb-4"
            >
              Início
            </Link>
            <a 
              href="/#problema" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-bold text-zinc-900 border-b border-zinc-100 pb-4"
            >
              Sobre
            </a>
            <a 
              href="/#faq" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-bold text-zinc-900 border-b border-zinc-100 pb-4"
            >
              Dúvidas
            </a>
            <Link 
              to="/admin" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-xl font-bold text-amber-600 flex items-center gap-2"
            >
              <UserCog className="w-5 h-5" />
              Área Admin
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
