import { motion } from 'motion/react';
import { ArrowRight, TrendingUp, ShieldCheck, Package } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-zinc-950 text-white overflow-hidden pt-64 pb-32 lg:pt-72 lg:pb-40">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-amber-500/10 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-amber-400 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4" />
              <span>Aumente suas margens em até 300%</span>
            </div>
            
            <h1 className="font-display text-5xl lg:text-6xl xl:text-7xl leading-[1.1] font-black mb-6 tracking-tight">
              O Segredo dos Lojistas que <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-600">Multiplicaram</span> Seus Lucros.
            </h1>
            
            <p className="text-lg lg:text-xl text-zinc-400 mb-8 leading-relaxed">
              Você está cansado de fornecedores que atrasam, produtos de baixa qualidade e preços que engolem o seu lucro? Descubra como ter acesso direto aos produtos mais desejados do mercado.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#oferta" className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-zinc-950 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)]">
                Ver Catálogo e Preços
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#problema" className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all border border-white/10">
                Entender como funciona
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-sm text-zinc-500 font-medium">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span>Compra Segura</span>
              </div>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-500" />
                <span>Pronta Entrega</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/atacado/800/1000" 
                alt="Estoque cheio de produtos" 
                className="w-full h-auto object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-10 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-4"
              >
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center text-zinc-950 font-bold text-xl">
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
