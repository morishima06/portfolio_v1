import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        location: resolve(import.meta.dirname, 'works/location.html'),
        portfolio: resolve(import.meta.dirname, 'works/portfolio.html'),
        search: resolve(import.meta.dirname, 'works/search.html'),
      },
    },
  },
});
