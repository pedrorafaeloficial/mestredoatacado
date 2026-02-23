export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <img 
        src="/mestreB.png" 
        alt="Mestre do Atacado" 
        className="w-auto h-auto max-h-[140px] object-contain"
      />
    </div>
  );
}
