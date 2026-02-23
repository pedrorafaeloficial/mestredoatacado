import { motion } from 'motion/react';
import { Zap } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-24 bg-zinc-950 text-white text-center px-6">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-6xl font-black mb-6">
            Chegou a Hora de <span className="text-amber-500">Mudar o Jogo</span>
          </h2>
          <p className="text-xl text-zinc-400 mb-10">
            Pare de deixar dinheiro na mesa. Tenha acesso aos melhores produtos com as melhores margens agora mesmo.
          </p>
          
          <a href="#catalogo" className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 px-10 py-5 rounded-2xl font-black text-2xl transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_-10px_rgba(245,158,11,0.6)]">
            <Zap className="w-6 h-6 fill-current" />
            Quero Multiplicar Meus Lucros
          </a>

          <div className="mt-16 text-left bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800">
            <p className="text-zinc-300">
              <span className="font-bold text-amber-500">P.S.:</span> O mercado não espera. Enquanto você hesita, seu concorrente pode estar abastecendo o estoque com nossos produtos e pagando metade do que você paga hoje. Dê o primeiro passo com apenas R$ 500 e veja a diferença no seu caixa no fim do mês.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
