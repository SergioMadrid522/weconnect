import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        register: resolve(__dirname, 'register.html'),
        recover: resolve(__dirname, 'recoverPassword.html'),
        chat: resolve(__dirname, 'chat.html')
      }
    }
  }
})
