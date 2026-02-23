import { motion } from 'motion/react';
import { Check, ShoppingCart } from 'lucide-react';

export function Offer() {
  return (
    <section id="oferta" className="py-24 bg-zinc-900 text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-black mb-6 leading-tight">
              Faça seu Pedido <br/>
              <span className="text-amber-500">Direto pelo WhatsApp</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-8">
              Você não precisa descapitalizar sua empresa para ter preço de atacado. Criamos uma condição perfeita para você testar nossos produtos com atendimento personalizado.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "Acesso a mais de 5.000 produtos",
                "Preços reais de fábrica",
                "Enviamos via Correios, Loggi e Jadlog para o Brasil todo!",
                "Suporte dedicado via WhatsApp",
                "Compra com CPF ou CNPJ"
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-amber-500" />
                  </div>
                  <span className="text-zinc-300 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 text-zinc-900 shadow-2xl relative"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
              Condição Especial
            </div>
            
            <div className="text-center mb-8 mt-4">
              <p className="text-zinc-500 font-medium uppercase tracking-widest mb-2">Pedido Mínimo</p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-2xl font-bold text-zinc-400">R$</span>
                <span className="font-display text-6xl font-black text-zinc-900">500</span>
                <span className="text-2xl font-bold text-zinc-400">,00</span>
              </div>
              <p className="text-zinc-500 mt-2">Apenas R$ 500 para começar a lucrar</p>
            </div>

            <div className="bg-zinc-50 rounded-2xl p-6 mb-8 border border-zinc-100">
              <p className="text-center text-zinc-700 font-medium">
                "O valor que você gasta em um jantar, agora pode ser o investimento inicial para dobrar o faturamento da sua loja."
              </p>
            </div>

            <a href="#catalogo" className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white px-8 py-4 rounded-xl font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-lg">
              <ShoppingCart className="w-6 h-6" />
              Comprar via WhatsApp
            </a>
            
            <p className="text-center text-sm text-zinc-400 mt-4">
              Pagamento seguro via Pix, Boleto ou Cartão em até 12x.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
