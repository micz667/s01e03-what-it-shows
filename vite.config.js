import { svelte } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    svelte({
      compilerOptions: { dev: false, css: 'injected' },
      extensions: ['.svelte', '.svx'],
      preprocess: [
        mdsvex({
          extensions: ['.svx'],
          layout: {
            runbook: './src/lib/layouts/runbook.svelte',
          },
        }),
      ],
    }),
  ],
  resolve: {
    alias: {
      '#lib': new URL('./src/lib', import.meta.url).pathname,
    },
  },
});
