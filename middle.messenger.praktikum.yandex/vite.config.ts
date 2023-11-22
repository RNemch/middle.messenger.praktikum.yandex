import { defineConfig } from 'vite';
import vitePugPlugin from 'vite-plugin-pug-transformer';

const locals = {};

export default defineConfig({
  plugins: [vitePugPlugin({ pugLocals: locals })],
});
