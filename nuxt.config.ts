// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  modules: ['@nuxt/ui', '@nuxt/eslint', 'shadcn-nuxt'],
  css: ['~/assets/css/main.css'],
  shadcn: {
    prefix: 'D',
    componentDir: './components/ui'
  },
  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2024-11-27',
})