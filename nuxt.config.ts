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
  ],
  css: ['~/assets/css/main.css'],
  shadcn: {
    prefix: 'D',
    componentDir: './components/ui'
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