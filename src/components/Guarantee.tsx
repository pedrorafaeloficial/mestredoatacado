import { motion } from 'motion/react';
import { ShieldAlert } from 'lucide-react';

export function Guarantee() {
  return (
    <section className="py-20 bg-zinc-50 relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="border-4 border-zinc-900 rounded-3xl p-8 md:p-12 text-center relative bg-white shadow-2xl shadow-zinc-900/10 transition-transform duration-300"
        >
          <motion.div 
            animate={{ rotateY: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-amber-500 w-20 h-20 rounded-full flex items-center justify-center border-4 border-white shadow-lg perspective-1000"
          >
            <ShieldAlert className="w-10 h-10" />
          </motion.div>
          
          <h2 className="font-display text-3xl md:text-4xl font-black text-zinc-900 mt-6 mb-4">
            Garantia Blindada de Qualidade
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Nosso compromisso é com o sucesso do seu negócio. Por isso, testamos rigorosamente todos os produtos antes do envio. Caso algum item apresente qualquer problema nos testes, ele será imediatamente retirado do seu pedido e o valor correspondente será estornado.
          </p>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-8 font-bold text-zinc-900 text-xl md:text-2xl bg-amber-100 inline-block px-6 py-2 rounded-full"
          >
            O risco é todo nosso. Você só tem a lucrar.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
