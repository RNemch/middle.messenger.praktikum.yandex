import { defineConfig } from 'vite';
import pugPlugin from 'vite-plugin-pug';

const { resolve } = require('path');

export default defineConfig({
  plugins: [pugPlugin()],

  css: {
    preprocessorOptions: {
      less: {
        math: 'always',
        relativeUrls: true,
        javascriptEnabled: true,
      },
    },
  },

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'src/pages/login.html'),
        chats: resolve(__dirname, 'src/pages/chats.html'),
        profile: resolve(__dirname, 'src/pages/profile.html'),
        page404: resolve(__dirname, 'src/pages/404.html'),
        page500: resolve(__dirname, 'src/pages/500.html'),
      },
    },
  },
});
