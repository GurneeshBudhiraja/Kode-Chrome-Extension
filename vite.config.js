import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { crx } from '@crxjs/vite-plugin';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import manifest from './manifest.json';

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
    viteStaticCopy({
      targets: [
        {
          src: './images/*',
          dest: 'images',
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
      },
    },
  },
});
