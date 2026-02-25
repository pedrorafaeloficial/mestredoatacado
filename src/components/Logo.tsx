export function Logo({ className = "", variant = "light" }: { className?: string; variant?: "light" | "dark" }) {
  const logoSrc = variant === "light" ? "/assets/mestreB.png" : "/assets/mestreA.png";
  
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <img 
        src={logoSrc} 
        alt="Mestre do Atacado" 
        className="w-auto h-auto max-h-[140px] object-contain"
      />
    </div>
  );
}
