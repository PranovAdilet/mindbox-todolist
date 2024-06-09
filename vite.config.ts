import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/shared/scss/base/_vars.scss";',
      },
    },
  },
})
