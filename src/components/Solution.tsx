import { motion } from 'motion/react';
import { Shirt, Smartphone, Gamepad2, Wrench, Sparkles, Coffee, CheckCircle2 } from 'lucide-react';

const categories = [
  { icon: Shirt, name: "Roupas e Moda", desc: "Tendências com alta rotatividade" },
  { icon: Smartphone, name: "Eletrônicos", desc: "Gadgets de alta demanda" },
  { icon: Gamepad2, name: "Brinquedos", desc: "Lançamentos e clássicos" },
  { icon: Wrench, name: "Ferramentas", desc: "Linha profissional e hobby" },
  { icon: Sparkles, name: "Maquiagem", desc: "Beleza e cuidados pessoais" },
  { icon: Coffee, name: "Utensílios", desc: "Casa e decoração" },
];

export function Solution() {
  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pattern/1920/1080')] opacity-5 mix-blend-overlay pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Conheça o <span className="text-amber-500">Mestre do Atacado</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            A sua nova central de abastecimento inteligente. Não somos apenas um fornecedor, somos o seu parceiro de crescimento. Temos tudo que sua loja precisa em um só lugar.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:bg-zinc-800/50 transition-colors group"
              >
                <div className="w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500/20 group-hover:text-amber-500 transition-colors">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                <p className="text-zinc-400">{cat.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-8 md:p-12 text-zinc-950 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl"
        >
          <div className="max-w-2xl">
            <h3 className="font-display text-2xl md:text-3xl font-black mb-4">
              Por que nossos preços são imbatíveis?
            </h3>
            <p className="text-amber-950 font-medium text-lg mb-6">
              Compramos em volumes gigantescos direto das fábricas para repassar o verdadeiro preço de atacado para você. Sem intermediários, sem taxas ocultas.
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {['Sem intermediários', 'Estoque no Brasil', 'Envio Imediato', 'Nota Fiscal'].map((item, i) => (
                <li key={i} className="flex items-center gap-2 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-zinc-950" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="shrink-0">
            <a href="#oferta" className="inline-block bg-zinc-950 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-zinc-800 transition-colors">
              Ver Tabela de Preços
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
