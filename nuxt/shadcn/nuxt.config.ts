import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
    'shadcn-nuxt',
  ],

  css: ['~/assets/css/tailwind.css'],

  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 512,
    },
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  shadcn: {
    prefix: 'Ui',
    componentDir: '@/components/ui',
  },

  compatibilityDate: '2025-12-14',
});
