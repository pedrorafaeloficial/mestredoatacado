import { motion } from 'motion/react';
import { Star } from 'lucide-react';

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
    <section className="py-24 bg-zinc-50 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
            Quem Compra, <span className="text-amber-500">Lucra e Recomenda</span>
          </h2>
          <p className="text-lg text-zinc-600">
            Junte-se a milhares de lojistas que já transformaram seus negócios.
          </p>
        </div>

        {/* CSS Marquee for reviews */}
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee flex gap-6 py-4 whitespace-nowrap group-hover:[animation-play-state:paused]">
            {reviews.map((review, index) => (
              <div 
                key={index} 
                className="w-80 shrink-0 bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 whitespace-normal"
              >
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-zinc-700 mb-6 italic">"{review.text}"</p>
                <div>
                  <p className="font-bold text-zinc-900">{review.name}</p>
                  <p className="text-sm text-zinc-500">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="animate-marquee flex gap-6 py-4 whitespace-nowrap absolute top-0 group-hover:[animation-play-state:paused]" style={{ left: '100%' }}>
            {reviews.map((review, index) => (
              <div 
                key={`dup-${index}`} 
                className="w-80 shrink-0 bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 whitespace-normal"
              >
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-zinc-700 mb-6 italic">"{review.text}"</p>
                <div>
                  <p className="font-bold text-zinc-900">{review.name}</p>
                  <p className="text-sm text-zinc-500">{review.role}</p>
                </div>
              </div>
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
      `}</style>
    </section>
  );
}
