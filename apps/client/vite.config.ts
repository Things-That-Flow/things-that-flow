import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: [{ find: '@client', replacement: resolve(__dirname, './src') }]
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'ranteamgen-[name].js',
        assetFileNames: 'assets/ranteamgen-[name]-[hash].[ext]',
        chunkFileNames: 'ranteamgen-[name]-[hash].js'
      }
    }
  }
})
