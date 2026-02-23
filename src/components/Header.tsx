import { Logo } from './Logo';

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 pt-8 pb-4">
      <div className="container mx-auto px-6 flex justify-center">
        <Logo className="scale-75 md:scale-90 origin-top" />
      </div>
    </header>
  );
}
