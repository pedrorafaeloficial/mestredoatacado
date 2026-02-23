import { motion } from 'motion/react';
import { XCircle } from 'lucide-react';

const pains = [
  "Passar horas garimpando fornecedores confiáveis e acabar frustrado.",
  "Pedidos mínimos absurdos que descapitalizam o seu negócio.",
  "Fretes caros que inviabilizam a compra e engolem sua margem.",
  "Produtos de baixa qualidade que geram devoluções e clientes insatisfeitos.",
  "Concorrentes vendendo mais barato porque têm acesso a fontes secretas."
];

export function Problem() {
  return (
    <section id="problema" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1000&auto=format&fit=crop" 
              alt="Lojista conferindo estoque" 
              className="rounded-2xl shadow-xl grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-zinc-900 mb-4">Você se identifica com alguma destas situações?</h3>
            <ul className="space-y-4">
              {pains.map((pain, index) => (
                <motion.li 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                  <span className="text-zinc-700 font-medium">{pain}</span>
                </motion.li>
              ))}
            </ul>
            
            <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-100">
              <p className="text-red-800 font-semibold italic">
                "Enquanto você perde tempo e dinheiro com fornecedores ruins, seu concorrente está abastecendo o estoque pagando metade do preço."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
