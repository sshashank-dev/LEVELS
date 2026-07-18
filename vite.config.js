// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'
// import tailwindcss from '@tailwindcss/vite'

// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//   ],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'https://saavn.sumit.co',
//         changeOrigin: true,
//         secure: false,
//       }
//     }
//   }
// })






import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({

  plugins: [

    react(),

    tailwindcss(),

    VitePWA({

      registerType: 'autoUpdate',

      manifest: {

        name: 'LEVELS',

        short_name: 'LEVELS',

        description:
          'Immersive music streaming experience',

        theme_color: '#000000',

        background_color: '#000000',

        display: 'standalone',

        start_url: '/',

        icons: [

          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },

          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }

        ]

      }

    })

  ],


  server: {

    proxy: {

      '/api': {

        target: 'https://saavn.sumit.co',

        changeOrigin: true,

        secure: false,

      }

    }

  }

})