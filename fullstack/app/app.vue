<template>
  <div class="h-screen flex flex-col">
    <section class="my-auto mx-auto text-center flex flex-col gap-4">
      <h1 class="text-6xl font-bold">
        {{ data?.greeting }}
      </h1>
      <div class="text-lg text-muted-foreground">
        {{ count }}
      </div>
      <Button class="mx-auto" @click="count++">
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
</script>
