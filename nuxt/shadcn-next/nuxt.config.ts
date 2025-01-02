// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'shadcn-nuxt',
  ],

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  tailwindcss: {
    cssPath: ['./app/global.css', { injectPosition: 'first' }],
  },

  future: {
    compatibilityVersion: 4,
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

  compatibilityDate: '2024-10-03',
});
