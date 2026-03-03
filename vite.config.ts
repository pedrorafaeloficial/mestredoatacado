import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['assets/mestreB.png', 'assets/mestreA.png'],
        workbox: {
          navigateFallbackDenylist: [/^\/api/],
          runtimeCaching: [
            {
              urlPattern: /^\/api\//,
              handler: 'NetworkOnly',
            }
          ]
        },
        manifest: {
          name: 'Mestre do Atacado',
          short_name: 'MestreAtacado',
          description: 'O melhor atacado para o seu negócio',
          theme_color: '#f59e0b',
          background_color: '#ffffff',
          display: 'standalone',
          icons: [
            {
              src: '/assets/mestreB.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: '/assets/mestreB.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ]
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || ''),
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      host: '0.0.0.0',
      port: 3000,
    },
  };
});
