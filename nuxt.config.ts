// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: {
        enabled: false
    },
    modules: [
        '@nuxt/ui',
        '@nuxt/eslint',
        'shadcn-nuxt',
        '@pinia/nuxt',
        '@nuxtjs/supabase',
        '@vite-pwa/nuxt',
    ],
    css: ['~/assets/css/main.css'],
    app: {
        head: {
            title: 'Paw Data',
            htmlAttrs: 'fr',
            meta: [
                {name: 'viewport', content: 'initial-scale=1, viewport-fit=cover, width=device-width'},
                {name: 'apple-mobile-web-app-capable', content: 'yes'},
                {name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent'}
            ]
        }
    },
    shadcn: {
        prefix: 'D',
        componentDir: './components/ui'
    },
    pwa: {
        manifest: {
            name: 'Paw Data',
            short_name: 'Paw Data',
            description: 'Manage data for you pets !',
            orientation: 'portrait',
            theme_color: '#ffc300',
            icons: [
                {src: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png'},
                {src: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png'}
            ],
            screenshots: [
                {src: "/wide.png", sizes: '1896x939', type: 'image/png', form_factor: 'wide', label: 'Application'},
                {src: "/small.png", sizes: '394x855', type: 'image/png', label: 'Application'},
            ]
        },
        workbox: {
            navigateFallback: '/'
        },
        devOptions: {
            enabled: true,
            type: 'module'
        }
    },
    supabase: {
        redirectOptions: {
            exclude: ['/landing', '/signup'],
            login: '/signin'
        }
    },
    runtimeConfig: {
        public: {
            url: process.env.URL || 'http://localhost:3000'
        }
    },
    future: {
        compatibilityVersion: 4
    },
    compatibilityDate: '2024-11-27',
})