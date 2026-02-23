export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <img 
        src="https://drive.google.com/uc?export=view&id=17gMvQN5JOFA0uEmoYRFKEsedurymYnZ5" 
        alt="Mestre do Atacado" 
        className="w-auto h-auto max-h-[140px] object-contain"
      />
    </div>
  );
}
