// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    'shadcn-nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],

  future: {
    compatibilityVersion: 4,
  },

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 512,
    },
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: '.',
      },
    },
  },

  compatibilityDate: '2025-03-04',
});
