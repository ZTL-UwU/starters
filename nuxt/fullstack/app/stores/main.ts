import { defineStore } from 'pinia';

export const useStore = defineStore('main', () => {
  const count = ref(0);
  const message = ref('Welcome to the fullstack starter!');
  const userInput = ref('');

  const incrementCount = () => {
    count.value++;
  };

  const resetCount = () => {
    count.value = 0;
  };

  const setMessage = (newMessage: string) => {
    message.value = newMessage;
  };

  return {
    count,
    message,
    userInput,
    incrementCount,
    resetCount,
    setMessage,
  };
}, {
  persist: {
    storage: piniaPluginPersistedstate.cookies({
      maxAge: 30 * 24 * 60 * 60, // One month
    }),
  },
});
