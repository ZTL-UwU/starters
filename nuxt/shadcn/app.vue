<template>
  <div class="h-screen flex flex-col">
    <section class="my-auto mx-auto text-center flex flex-col gap-4">
      <h1 class="text-6xl font-bold">
        Hello from shadcn starter
      </h1>
      <div class="text-lg text-muted-foreground">
        {{ count }}
      </div>
      <Button class="mx-auto" variant="outline" @click="count++">
        Count
      </Button>
    </section>
  </div>
</template>

<script setup lang="ts">
const count = ref(0);
</script>
