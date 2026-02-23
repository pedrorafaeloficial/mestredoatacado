import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-500 py-16 border-t border-zinc-900 text-center text-sm">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <Logo className="scale-50 origin-center mb-8" />
        <p className="mb-6 text-lg">A parceira oficial do crescimento da sua loja.</p>
        <p>&copy; {new Date().getFullYear()} Mestre do Atacado. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
