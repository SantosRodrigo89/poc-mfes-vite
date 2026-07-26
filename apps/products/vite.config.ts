import { federation } from '@module-federation/vite'
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3001,
  },
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'products',
      filename: 'remoteEntry.js',
      exposes: {
        './ProductsRoutes': './src/routes/ProductsRoutes.tsx',
      },
      shared: {
        react: {
          singleton: true,
        },

        'react-dom': {
          singleton: true,
        },

        'react-router-dom': {
          singleton: true,
        },

        '@tanstack/react-query': {
          singleton: true,
        },
      },
      dts: false,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
})
