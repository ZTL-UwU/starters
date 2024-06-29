// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/icon',
  ],
  future: {
    compatibilityVersion: 4,
  },
});
