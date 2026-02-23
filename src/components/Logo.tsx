import logoImg from '../assets/mestreB.png';

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <img 
        src={logoImg} 
        alt="Mestre do Atacado" 
        className="w-auto h-auto max-h-[140px] object-contain"
      />
    </div>
  );
}
