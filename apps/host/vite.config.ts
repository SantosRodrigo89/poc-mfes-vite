import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { federation } from '@module-federation/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'host',
      remotes: {
        products: {
          type: 'module',
          name: 'products',
          entry: 'http://localhost:4173/remoteEntry.js',
        },
      },
      shared: ['react', 'react-dom', '@tanstack/react-query'],
    }),
  ],
})
