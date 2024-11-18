<template>
  <div class="h-screen flex flex-col">
    <section class="my-auto mx-auto flex flex-col gap-4">
      <pre>{{ data?.greeting }}</pre>
      <pre>{{ store.someState }}</pre>
      <div class="text-lg text-muted-foreground">
        {{ count }}
      </div>
      <Button @click="count++">
        Count
      </Button>
    </section>
  </div>
</template>

<script setup lang="ts">
const { $trpc } = useNuxtApp();
const count = ref(0);

const { data, suspense } = useQuery({
  queryKey: ['test'],
  queryFn: () => $trpc.hello.query({ text: 'fullstack' }),
});
await suspense();

const store = useStore();
</script>
