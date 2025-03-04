<template>
  <div class="flex h-screen flex-col">
    <section class="m-auto flex flex-col gap-4 text-center">
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
