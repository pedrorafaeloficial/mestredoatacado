import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { ShoppingBag, UserCog } from 'lucide-react';
import { useStore } from '../context/StoreContext';

interface HeaderProps {
  onCartClick?: () => void;
}

export function Header({ onCartClick }: HeaderProps) {
  const location = useLocation();
  const { cart } = useStore();
  const isCatalog = location.pathname === '/catalogo';
  const isHome = location.pathname === '/';

  return (
    <header className={`absolute top-0 left-0 right-0 z-50 pt-8 pb-4 ${!isHome ? 'bg-white/80 backdrop-blur-md shadow-sm' : ''}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <Logo className="scale-75 md:scale-90 origin-left" variant={isHome ? "light" : "dark"} />
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

        <div className="flex items-center gap-4">
          {isCatalog && onCartClick ? (
            <button 
              onClick={onCartClick}
              className="inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-2.5 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg relative"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Carrinho</span>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-amber-500 text-zinc-900 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full border-2 border-zinc-50">
                  {cart.length}
                </span>
              )}
            </button>
          ) : (
            <Link 
              to="/catalogo" 
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 px-6 py-2.5 rounded-xl font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-amber-500/20"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Ver Catálogo</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
