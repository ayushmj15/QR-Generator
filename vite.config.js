import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Qubic - Magic QR',
        short_name: 'Qubic',
        description: 'Generate stunning, high-fidelity QR codes instantly.',
        theme_color: '#ff007f',
        background_color: '#0a0a0f',
        display: 'standalone',
        icons: [
          {
            src: 'icon.jpg',
            sizes: '512x512',
            type: 'image/jpeg',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
