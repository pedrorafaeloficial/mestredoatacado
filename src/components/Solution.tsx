import { motion, useScroll, useTransform } from 'motion/react';
import { Shirt, Smartphone, Gamepad2, Wrench, Sparkles, Coffee, CheckCircle2 } from 'lucide-react';
import { useRef } from 'react';

const categories = [
  { icon: Shirt, name: "Roupas e Moda", desc: "Tendências com alta rotatividade" },
  { icon: Smartphone, name: "Eletrônicos", desc: "Gadgets de alta demanda" },
  { icon: Gamepad2, name: "Brinquedos", desc: "Lançamentos e clássicos" },
  { icon: Wrench, name: "Ferramentas", desc: "Linha profissional e hobby" },
  { icon: Sparkles, name: "Maquiagem", desc: "Beleza e cuidados pessoais" },
  { icon: Coffee, name: "Utensílios", desc: "Casa e decoração" },
];

export function Solution() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <section ref={ref} className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      <motion.div 
        style={{ y }}
        className="absolute inset-0 bg-[url('https://picsum.photos/seed/pattern/1920/1080')] opacity-5 mix-blend-overlay pointer-events-none" 
      />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
            Conheça o <span className="text-amber-500 inline-block hover:scale-105 transition-transform cursor-default">Mestre do Atacado</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto">
            A sua nova central de abastecimento inteligente. Não somos apenas um fornecedor, somos o seu parceiro de crescimento. Temos tudo que sua loja precisa em um só lugar.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:bg-zinc-800/80 transition-all group cursor-pointer shadow-lg hover:shadow-amber-500/10"
              >
                <div className="w-14 h-14 bg-zinc-800 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-500/20 group-hover:text-amber-500 transition-colors duration-300">
                  <Icon className="w-7 h-7 transform group-hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-amber-400 transition-colors">{cat.name}</h3>
                <p className="text-zinc-400 group-hover:text-zinc-300 transition-colors">{cat.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-3xl p-8 md:p-12 text-zinc-950 flex flex-col md:flex-row items-center justify-between gap-8 shadow-[0_20px_50px_-12px_rgba(245,158,11,0.5)] border border-amber-400/50"
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
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2 font-bold"
                >
                  <CheckCircle2 className="w-5 h-5 text-zinc-950" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="shrink-0">
            <a href="#oferta" className="inline-block bg-zinc-950 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-zinc-800 transition-all hover:scale-105 active:scale-95 shadow-xl hover:shadow-2xl">
              Ver Tabela de Preços
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
