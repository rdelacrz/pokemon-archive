import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ssr from 'vite-plugin-ssr/plugin';
import { resolve } from 'path';
import vercel from 'vite-plugin-vercel';
import vercelSsr from '@magne4000/vite-plugin-vercel-ssr';;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    ssr(),
    vercel(),
    vercelSsr(),
  ],
  build: {
    polyfillDynamicImport: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '~/styles/mixins';`,
      },
    }
  },
  resolve: {
    preserveSymlinks: true,
    alias: {
      '~': resolve(__dirname, 'src'),
    },
  },
});
