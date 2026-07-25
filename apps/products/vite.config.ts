import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'

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
        './App': './src/app/App.tsx',
      },

      shared: ['react', 'react-dom', '@tanstack/react-query'],
    }),
  ],
})
