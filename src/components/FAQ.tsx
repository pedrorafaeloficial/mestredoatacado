import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "Qual o valor do pedido mínimo?",
    a: "Nosso pedido mínimo é de apenas R$ 500,00. Um valor acessível pensado para não descapitalizar o seu negócio e permitir que você teste a qualidade dos nossos produtos."
  },
  {
    q: "Quais são as formas de pagamento?",
    a: "Aceitamos Pix (com aprovação imediata), Boleto Bancário e Cartão de Crédito em até 12x."
  },
  {
    q: "Preciso ter CNPJ para comprar?",
    a: "Não! Entendemos que muitos empreendedores estão começando. Por isso, liberamos compras tanto para CNPJ quanto para CPF (revendedores autônomos)."
  },
  {
    q: "Qual o prazo de entrega?",
    a: "Despachamos seu pedido em até 24 horas úteis após a confirmação do pagamento. Enviamos via Correios, Loggi e Jadlog para o Brasil todo! O prazo de chegada varia de acordo com o seu CEP e a transportadora escolhida."
  },
  {
    q: "Os produtos têm garantia?",
    a: "Sim! Todos os produtos são rigorosamente testados antes do envio. Caso algum item apresente problema durante os testes, ele é imediatamente retirado do pedido e o valor é estornado para você."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-zinc-900">Perguntas Frequentes</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-zinc-200 rounded-2xl overflow-hidden bg-zinc-50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between font-bold text-zinc-900 hover:bg-zinc-100 transition-colors"
              >
                {faq.q}
                <ChevronDown 
                  className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-5 text-zinc-600">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
