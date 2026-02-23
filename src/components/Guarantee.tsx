import { motion } from 'motion/react';
import { ShieldAlert } from 'lucide-react';

export function Guarantee() {
  return (
    <section className="py-20 bg-zinc-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="border-4 border-zinc-900 rounded-3xl p-8 md:p-12 text-center relative bg-white"
        >
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-amber-500 w-20 h-20 rounded-full flex items-center justify-center border-4 border-white">
            <ShieldAlert className="w-10 h-10" />
          </div>
          
          <h2 className="font-display text-3xl font-black text-zinc-900 mt-6 mb-4">
            Garantia Blindada
          </h2>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Testamos todos os Produtos antes do Envio. Os produtos que dão problema serão retirados e Estornados.
          </p>
          <p className="mt-6 font-bold text-zinc-900">
            O risco é todo nosso. Você só tem a lucrar.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
