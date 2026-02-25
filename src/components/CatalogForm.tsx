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
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pattern2/1920/1080')] opacity-10 mix-blend-multiply pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
          <div className="bg-zinc-950 text-white p-10 md:w-2/5 flex flex-col justify-center">
            <h3 className="font-display text-3xl font-bold mb-4">
              Receba Ofertas Imperdíveis!
            </h3>
            <p className="text-zinc-400 mb-8">
              Preencha os dados ao lado para receber imediatamente nossas melhores ofertas e o catálogo completo com preços no seu WhatsApp.
            </p>
            <div className="flex items-center gap-3 text-sm text-zinc-500">
              <Lock className="w-4 h-4" />
              <span>Seus dados estão 100% seguros.</span>
            </div>
          </div>
          
          <div className="p-10 md:w-3/5">
            {status === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-bold text-zinc-900">Catálogo Liberado!</h4>
                <p className="text-zinc-600">
                  Verifique seu WhatsApp. Enviamos o link de acesso ao catálogo completo para você.
                </p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-amber-600 font-medium hover:text-amber-700"
                >
                  Baixar novamente
                </button>
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Nome Completo</label>
                  <input 
                    type="text" 
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                    placeholder="Seu nome"
                    required
                    disabled={status === 'loading'}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">WhatsApp</label>
                    <input 
                      type="tel" 
                      value={formData.whatsapp}
                      onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      placeholder="(00) 00000-0000"
                      required
                      disabled={status === 'loading'}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 mb-1">E-mail</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all"
                      placeholder="seu@email.com"
                      required
                      disabled={status === 'loading'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1">Tipo de Negócio</label>
                  <select 
                    value={formData.tipoNegocio}
                    onChange={(e) => setFormData({...formData, tipoNegocio: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all bg-white" 
                    required
                    disabled={status === 'loading'}
                  >
                    <option value="">Selecione...</option>
                    <option value="Loja Física">Loja Física</option>
                    <option value="E-commerce / Loja Virtual">E-commerce / Loja Virtual</option>
                    <option value="Revendedor(a) Autônomo(a)">Revendedor(a) Autônomo(a)</option>
                    <option value="Quero começar a vender">Quero começar a vender</option>
                  </select>
                </div>

                {status === 'error' && (
                  <p className="text-red-500 text-sm font-medium">
                    Ocorreu um erro ao enviar seus dados. Por favor, tente novamente.
                  </p>
                )}

                <button 
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all disabled:opacity-70"
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
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
