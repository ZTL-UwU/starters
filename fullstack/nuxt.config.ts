// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
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
