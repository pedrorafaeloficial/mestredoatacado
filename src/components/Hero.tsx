import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, TrendingUp, ShieldCheck, Package } from 'lucide-react';
import { useRef } from 'react';

export function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section ref={ref} className="relative bg-zinc-950 text-white overflow-hidden pt-40 pb-32 lg:pt-48 lg:pb-40">
      {/* Background Elements with Parallax */}
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[100px]" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-2xl"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-amber-400 text-sm font-medium mb-6 backdrop-blur-sm">
              <TrendingUp className="w-4 h-4" />
              <span>Aumente suas margens em até 300%</span>
            </motion.div>
            
            <motion.h1 variants={itemVariants} className="font-display text-5xl lg:text-6xl xl:text-7xl leading-[1.1] font-black mb-6 tracking-tight">
              O Segredo dos Lojistas que <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Multiplicaram</span> Seus Lucros.
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-lg lg:text-xl text-zinc-400 mb-8 leading-relaxed">
              Você está cansado de fornecedores que atrasam, produtos de baixa qualidade e preços que engolem o seu lucro? Descubra como ter acesso direto aos produtos mais desejados do mercado.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <a href="#oferta" className="group relative inline-flex items-center justify-center gap-2 bg-amber-500 text-zinc-950 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)] overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  Ver Catálogo e Preços
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-amber-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </a>
              <a href="#problema" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all border border-white/10 hover:border-white/20">
                Entender como funciona
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="mt-10 flex items-center gap-6 text-sm text-zinc-500 font-medium">
              <div className="flex items-center gap-2 hover:text-amber-400 transition-colors cursor-default">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span>Compra Segura</span>
              </div>
              <div className="flex items-center gap-2 hover:text-amber-400 transition-colors cursor-default">
                <Package className="w-5 h-5 text-amber-500" />
                <span>Pronta Entrega</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden lg:block perspective-1000"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl transform-gpu hover:rotate-y-12 hover:rotate-x-12 transition-transform duration-700 ease-out">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.7 }}
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop" 
                alt="Estoque cheio de produtos" 
                className="w-full h-[600px] object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-4 shadow-xl"
              >
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-zinc-950 font-bold text-xl shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                  +5k
                </div>
                <div>
                  <p className="text-white font-bold">Lojistas Ativos</p>
                  <p className="text-zinc-400 text-sm">Comprando todos os meses</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
