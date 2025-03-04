// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
  ],

  future: {
    compatibilityVersion: 4,
  },

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 512,
    },
  },

  imports: {
    presets: [
      {
        from: '@tanstack/vue-query',
        imports: ['useMutation', 'useQuery', 'useQueryClient', 'skipToken'],
      },
    ],
  },

  shadcn: {
    prefix: '',
    componentDir: './app/components/ui',
  },

  build: {
    transpile: ['trpc-nuxt'],
  },

  compatibilityDate: '2024-10-03',
});
