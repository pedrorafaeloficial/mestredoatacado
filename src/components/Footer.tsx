import { motion } from 'motion/react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-500 py-16 border-t border-zinc-900 text-center text-sm relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-32 bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 flex flex-col items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="flex flex-col items-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Logo className="scale-75 origin-center mb-8" />
          </motion.div>
          <p className="mb-6 text-lg text-zinc-400">A parceira oficial do crescimento da sua loja.</p>
          <p>&copy; {new Date().getFullYear()} Mestre do Atacado. Todos os direitos reservados.</p>
        </motion.div>
      </div>
    </footer>
  );
}
