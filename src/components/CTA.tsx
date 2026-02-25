import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24 bg-zinc-950 text-white text-center px-6 relative overflow-hidden">
      {/* Dynamic background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/20 rounded-full blur-[120px]" 
        />
      </div>

      <div className="container mx-auto max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="font-display text-4xl md:text-6xl font-black mb-6">
              Chegou a Hora de <span className="text-amber-500 inline-block hover:scale-110 transition-transform cursor-default">Mudar o Jogo</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xl text-zinc-400 mb-10 leading-relaxed"
          >
            Pare de deixar dinheiro na mesa. Tenha acesso aos melhores produtos com as melhores margens agora mesmo.
          </motion.p>
          
          <motion.a 
            href="#catalogo" 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group inline-flex items-center justify-center gap-2 bg-amber-500 text-zinc-950 px-10 py-5 rounded-2xl font-black text-2xl transition-all shadow-[0_0_50px_-10px_rgba(245,158,11,0.6)] overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Zap className="w-6 h-6 fill-current group-hover:animate-pulse" />
              Quero Multiplicar Meus Lucros
            </span>
            <div className="absolute inset-0 bg-amber-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
          </motion.a>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            className="mt-16 text-left bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 backdrop-blur-sm shadow-2xl transition-all hover:border-zinc-700"
          >
            <p className="text-zinc-300 leading-relaxed text-lg">
              <span className="font-bold text-amber-500 text-xl block mb-2">P.S.:</span> O mercado não espera. Enquanto você hesita, seu concorrente pode estar abastecendo o estoque com nossos produtos e pagando metade do que você paga hoje. Dê o primeiro passo com apenas R$ 500 e veja a diferença no seu caixa no fim do mês.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
