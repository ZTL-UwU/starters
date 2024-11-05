import { defineStore } from 'pinia';

export const useStore = defineStore('main', () => {
  const someState = ref('hello pinia');

  return {
    someState,
  };
}, {
  persist: {
    storage: piniaPluginPersistedstate.cookies({
      maxAge: 30 * 24 * 60 * 60, // One month
    }),
  },
});
