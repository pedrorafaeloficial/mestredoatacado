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
    a: "Apenas Pix nos primeiros 5 pedidos, Próximos pedidos aceitamos cartão de Credito em 1x."
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
    a: "Sim! Todos os produtos possuem garantia de 30 Dias contra defeitos de fabricação. Caso algum item apresente problema, nossa equipe de suporte resolverá rapidamente. Devoluções apenas por defeitos."
  },
  {
    q: "Vocês trabalham com Dropshipping?",
    a: "No momento, nosso foco é o atacado tradicional (estoque próprio). Acreditamos que ter o produto à pronta entrega é o segredo para fidelizar seus clientes e aumentar sua margem de lucro."
  },
  {
    q: "Possuem loja física para retirada?",
    a: "Operamos 100% online para reduzir custos operacionais e repassar essa economia para você nos preços dos produtos. Todo o nosso estoque fica em um centro de distribuição fechado ao público."
  },
  {
    q: "Com que frequência chegam novidades?",
    a: "Recebemos novos contêineres e cargas de fábricas nacionais toda semana. Cadastre-se na nossa lista VIP para receber alertas de reposição e lançamentos em primeira mão."
  },
  {
    q: "Como rastreio meu pedido?",
    a: "Assim que seu pedido for despachado, você receberá o código de rastreio automaticamente no seu e-mail e WhatsApp cadastrados. Você pode acompanhar cada etapa da entrega."
  },
  {
    q: "E se eu me arrepender da compra?",
    a: "Você tem 7 dias corridos após o recebimento para solicitar a devolução por arrependimento, conforme o Código de Defesa do Consumidor. O produto deve estar lacrado e sem uso."
  },
  {
    q: "Existe desconto para grandes volumes?",
    a: "Sim! Para pedidos acima de R$ 5.000,00, entre em contato com nossa equipe comercial no WhatsApp para negociar condições especiais de pagamento e frete."
  },
  {
    q: "Os produtos são originais?",
    a: "Trabalhamos com Produtos de alta qualidade e variedade mas não trabalhamos com falsificados. talvez encontre marcas que você não conheça mas todas de qualidade."
  },
  {
    q: "O produto acabou, quando volta?",
    a: "Nossa rotatividade é alta. Se um produto esgotou, recomendamos clicar em 'Avise-me quando chegar' na página do produto para ser notificado assim que houver reposição."
  },
  {
    q: "Como entro em contato com o suporte?",
    a: "Nosso atendimento funciona de segunda a sexta, das 08h às 18h, via WhatsApp, E-mail e Chat no site. Nossa equipe é treinada para resolver qualquer dúvida rapidamente."
  },
  {
    q: "Posso reservar produtos no carrinho?",
    a: "Não. Os produtos no carrinho não estão reservados. A reserva do estoque só acontece após a confirmação do pagamento do pedido."
  },
  {
    q: "Posso escolher cores e tamanhos variados?",
    a: "Na maioria dos produtos, sim! Vendemos kits fechados (grade padrão) e também unidades avulsas onde você pode montar sua própria grade de acordo com a preferência do seu público."
  },
  {
    q: "O frete é grátis?",
    a: "Oferecemos frete grátis para Sul e Sudeste em compras acima de R$ 1.500,00. Para demais regiões, temos parcerias com transportadoras que garantem valores reduzidos."
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
