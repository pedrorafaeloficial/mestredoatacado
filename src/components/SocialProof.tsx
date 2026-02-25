import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  { name: "Carlos Silva", role: "Dono de Loja de Eletrônicos", text: "Minha margem de lucro dobrou depois que comecei a comprar os acessórios de celular com eles. Entrega super rápida." },
  { name: "Amanda Costa", role: "Revendedora de Roupas", text: "As peças têm uma qualidade absurda. Minhas clientes amaram e não tive nenhuma devolução até agora." },
  { name: "Roberto Alves", role: "Lojista de Variedades", text: "O pedido mínimo de R$500 salvou meu fluxo de caixa. Consigo repor o estoque toda semana sem sufoco." },
  { name: "Juliana Mendes", role: "Dona de Perfumaria", text: "A linha de maquiagem vende igual água. Preço imbatível, recomendo de olhos fechados." },
  { name: "Marcos Paulo", role: "E-commerce de Ferramentas", text: "Agilidade no despacho é o forte deles. Compro num dia, no outro já está a caminho." },
  { name: "Fernanda Lima", role: "Boutique Infantil", text: "Os brinquedos são originais e com certificação. Meus clientes confiam e eu lucro mais." },
  { name: "Ricardo Gomes", role: "Mercadinho de Bairro", text: "Sempre encontro as utilidades domésticas que mais saem. O catálogo é gigante." },
  { name: "Patrícia Souza", role: "Revendedora Autônoma", text: "Comprar com CPF foi o diferencial pra mim. Comecei pequeno e hoje já estou abrindo minha lojinha." },
  { name: "Eduardo Martins", role: "Loja de Informática", text: "Os cabos e carregadores são de primeira linha. Zero dor de cabeça com garantia." },
  { name: "Camila Rocha", role: "Loja de Presentes", text: "As novidades chegam primeiro aqui. Sempre saio na frente da concorrência." },
  { name: "Thiago Oliveira", role: "Vendedor de Marketplace", text: "Com a margem que eles oferecem, consigo cobrir o preço da concorrência e ainda lucrar bem." },
  { name: "Vanessa Dias", role: "Loja de Cosméticos", text: "Atendimento nota 10. Tive uma dúvida no pedido e resolveram na hora pelo WhatsApp." },
  { name: "Lucas Ferreira", role: "Armarinho", text: "Variedade incrível. Não preciso mais comprar de 5 fornecedores diferentes, acho tudo aqui." },
  { name: "Beatriz Santos", role: "Loja de Acessórios", text: "Embalagem super caprichada, os produtos chegam intactos. Muito profissionalismo." },
  { name: "André Luiz", role: "Empreendedor", text: "A melhor descoberta do ano pro meu negócio. O Mestre do Atacado faz jus ao nome." },
];

export function SocialProof() {
  return (
    <section className="py-24 bg-zinc-50 overflow-hidden relative">
      {/* Decorative background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            Quem Compra, <span className="text-amber-500">Lucra e Recomenda</span>
          </h2>
          <p className="text-lg text-zinc-600">
            Junte-se a milhares de lojistas que já transformaram seus negócios.
          </p>
        </motion.div>

        {/* CSS Marquee for reviews with gradient mask */}
        <div className="relative flex overflow-x-hidden group mask-edges">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-zinc-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-zinc-50 to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee flex gap-6 py-8 whitespace-nowrap group-hover:[animation-play-state:paused]">
            {reviews.map((review, index) => (
              <motion.div 
                key={index} 
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-80 shrink-0 bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-zinc-100 whitespace-normal relative transition-shadow duration-300"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-zinc-100 rotate-180" />
                <div className="flex gap-1 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="w-5 h-5 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <p className="text-zinc-700 mb-8 leading-relaxed relative z-10">"{review.text}"</p>
                <div className="flex items-center gap-4 border-t border-zinc-100 pt-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900">{review.name}</p>
                    <p className="text-sm text-zinc-500">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="animate-marquee flex gap-6 py-8 whitespace-nowrap absolute top-0 group-hover:[animation-play-state:paused]" style={{ left: '100%' }}>
            {reviews.map((review, index) => (
              <motion.div 
                key={`dup-${index}`} 
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="w-80 shrink-0 bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl border border-zinc-100 whitespace-normal relative transition-shadow duration-300"
              >
                <Quote className="absolute top-6 right-6 w-8 h-8 text-zinc-100 rotate-180" />
                <div className="flex gap-1 text-amber-500 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-zinc-700 mb-8 leading-relaxed relative z-10">"{review.text}"</p>
                <div className="flex items-center gap-4 border-t border-zinc-100 pt-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-zinc-900">{review.name}</p>
                    <p className="text-sm text-zinc-500">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  );
}
