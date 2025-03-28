import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // Ensures correct file paths
  build: {
    outDir: 'dist', // Default output directory
  }
});

