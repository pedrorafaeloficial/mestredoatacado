import { motion, useScroll, useTransform } from 'motion/react';
import { XCircle } from 'lucide-react';
import { useRef } from 'react';

const pains = [
  "Passar horas garimpando fornecedores confiáveis e acabar frustrado.",
  "Pedidos mínimos absurdos que descapitalizam o seu negócio.",
  "Fretes caros que inviabilizam a compra e engolem sua margem.",
  "Produtos de baixa qualidade que geram devoluções e clientes insatisfeitos.",
  "Concorrentes vendendo mais barato porque têm acesso a fontes secretas."
];

export function Problem() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="problema" ref={ref} className="py-24 bg-white relative overflow-hidden">
      {/* Subtle Background Effect */}
      <motion.div 
        style={{ y }}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-50/50 rounded-full blur-3xl -z-10 opacity-50 pointer-events-none"
      />

      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
            A Dura Realidade do Varejo (Que Ninguém te Conta)
          </h2>
          <p className="text-lg text-zinc-600 max-w-3xl mx-auto">
            Se você continuar comprando dos mesmos lugares, continuará tendo os mesmos resultados. O mercado mudou, e o modelo tradicional de compras está matando pequenas e médias empresas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative group perspective-1000"
          >
            <div className="absolute inset-0 bg-red-500/10 rounded-2xl transform translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6" />
            <img 
              src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1000&auto=format&fit=crop" 
              alt="Lojista conferindo estoque" 
              className="rounded-2xl shadow-xl grayscale group-hover:grayscale-0 transition-all duration-700 transform-gpu group-hover:scale-[1.02] group-hover:rotate-y-6"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-zinc-900 mb-4">Você se identifica com alguma destas situações?</h3>
            <ul className="space-y-4">
              {pains.map((pain, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1, type: "spring", bounce: 0.5 }}
                  whileHover={{ x: 10, color: "#ef4444" }}
                  className="flex items-start gap-3 group cursor-default"
                >
                  <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <span className="text-zinc-700 font-medium transition-colors">{pain}</span>
                </motion.li>
              ))}
            </ul>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="mt-8 p-6 bg-red-50 rounded-xl border border-red-100 shadow-sm transition-shadow hover:shadow-md"
            >
              <p className="text-red-800 font-semibold italic">
                "Enquanto você perde tempo e dinheiro com fornecedores ruins, seu concorrente está abastecendo o estoque pagando metade do preço."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
