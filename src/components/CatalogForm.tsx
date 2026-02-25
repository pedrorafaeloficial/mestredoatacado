import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Download, Lock, CheckCircle2, Loader2 } from 'lucide-react';

export function CatalogForm() {
  const [formData, setFormData] = useState({
    nome: '',
    whatsapp: '',
    email: '',
    tipoNegocio: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://automacao.agenciafoxon.com.br/webhook/mestredoatacado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Nome: formData.nome,
          Whatsapp: formData.whatsapp,
          Email: formData.email,
          'Tipo de Negócio': formData.tipoNegocio
        }),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ nome: '', whatsapp: '', email: '', tipoNegocio: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
    }
  };

  return (
    <section id="catalogo" className="py-24 bg-amber-500 relative overflow-hidden">
      <motion.div 
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute inset-0 bg-[url('https://picsum.photos/seed/pattern2/1920/1080')] opacity-10 mix-blend-multiply pointer-events-none" 
      />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
          <div className="bg-zinc-950 text-white p-10 md:w-2/5 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-display text-3xl font-bold mb-4 relative z-10"
            >
              Receba Ofertas Imperdíveis!
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-zinc-400 mb-8 relative z-10"
            >
              Preencha os dados ao lado para receber imediatamente nossas melhores ofertas e o catálogo completo com preços no seu WhatsApp.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex items-center gap-3 text-sm text-zinc-500 relative z-10"
            >
              <Lock className="w-4 h-4 text-amber-500" />
              <span>Seus dados estão 100% seguros.</span>
            </motion.div>
          </div>
          
          <div className="p-10 md:w-3/5">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"
                >
                  <CheckCircle2 className="w-8 h-8" />
                </motion.div>
                <h4 className="text-2xl font-bold text-zinc-900">Catálogo Liberado!</h4>
                <p className="text-zinc-600">
                  Verifique seu WhatsApp. Enviamos o link de acesso ao catálogo completo para você.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-amber-600 font-medium hover:text-amber-700 transition-colors"
                >
                  Baixar novamente
                </button>
              </motion.div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Nome Completo</label>
                  <input 
                    type="text" 
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all hover:border-amber-300"
                    placeholder="Seu nome"
                    required
                    disabled={status === 'loading'}
                  />
                </motion.div>
                
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-medium text-zinc-700 mb-1">WhatsApp</label>
                    <input 
                      type="tel" 
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all hover:border-amber-300"
                      placeholder="(00) 00000-0000"
                      required
                      disabled={status === 'loading'}
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-medium text-zinc-700 mb-1">E-mail</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all hover:border-amber-300"
                      placeholder="seu@email.com"
                      required
                      disabled={status === 'loading'}
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Tipo de Negócio</label>
                  <select 
                    value={formData.tipoNegocio}
                    onChange={(e) => setFormData({...formData, tipoNegocio: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white hover:border-amber-300" 
                    required
                    disabled={status === 'loading'}
                  >
                    <option value="">Selecione...</option>
                    <option value="Loja Física">Loja Física</option>
                    <option value="E-commerce / Loja Virtual">E-commerce / Loja Virtual</option>
                    <option value="Revendedor(a) Autônomo(a)">Revendedor(a) Autônomo(a)</option>
                    <option value="Quero começar a vender">Quero começar a vender</option>
                  </select>
                </motion.div>

                {status === 'error' && (
                  <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm font-medium"
                  >
                    Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.
                  </motion.p>
                )}

                <motion.button 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-70 shadow-lg hover:shadow-xl"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Receber Ofertas Agora
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
