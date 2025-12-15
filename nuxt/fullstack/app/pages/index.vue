<template>
  <UPage>
    <UHeader title="Nuxt Fullstack Starter">
      <template #right>
        <UColorModeButton />

        <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
          <UButton
            color="neutral"
            variant="ghost"
            to="https://github.com/ZTL-UwU/starters/tree/main/nuxt/fullstack"
            target="_blank"
            icon="i-simple-icons-github"
            aria-label="GitHub"
          />
        </UTooltip>
      </template>
    </UHeader>

    <UPageHero
      title="Nuxt Fullstack Starter"
      description="A fullstack starter template for Nuxt 4 with Pinia, tRPC, Nuxt UI, and more."
    />

    <UPageSection title="Feature Showcases" headline="Features" :features="features">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Pinia Store Section -->
        <UCard variant="subtle">
          <template #header>
            <div class="flex items-center gap-2 text-lg font-bold">
              <Icon name="lucide-lab:palmtree-island-sun" />
              <span>
                Pinia Store
              </span>
            </div>
          </template>
          <div class="space-y-4">
            <UPageCard title="Message (Persistent)">
              {{ store.message }}
            </UPageCard>
            <UPageCard title="Counter State">
              <span class="text-3xl font-bold font-mono">
                {{ store.count }}
              </span>
              <div class="flex gap-2">
                <UButton color="neutral" @click="store.incrementCount">
                  <Icon name="lucide:plus" />
                  Increment
                </UButton>
                <UButton color="neutral" variant="outline" @click="store.resetCount">
                  <Icon name="lucide:refresh-ccw" />
                  Reset
                </UButton>
              </div>
            </UPageCard>
          </div>
        </UCard>

        <div>
          <UCard variant="subtle">
            <template #header>
              <div class="flex items-center gap-2 text-lg font-bold">
                <Icon name="lucide:server" />
                <span>
                  Data Fetching (tRPC)
                </span>
              </div>
            </template>
            <div class="space-y-4">
              <div v-if="usersLoading" class="text-center py-8">
                <Icon name="mdi:loading" class="animate-spin mx-auto mb-2" size="32" />
                <p class="text-sm">
                  Loading users...
                </p>
              </div>
              <div v-else-if="usersError">
                <UAlert title="Error" icon="lucide:circle-alert" color="error" variant="subtle">
                  Failed to load users
                </UAlert>
              </div>
              <div v-else-if="users && users.length > 0" class="space-y-3">
                <UCard v-for="user in users" :key="user.id" variant="outline">
                  <div class="flex justify-between items-center">
                    <div>
                      <p class="font-semibold">
                        {{ user.name }}
                      </p>
                      <p class="text-sm text-neutral-400">
                        {{ user.email }}
                      </p>
                    </div>
                    <UBadge variant="soft" color="neutral">
                      {{ user.age }} years
                    </UBadge>
                  </div>
                </UCard>
              </div>
              <div v-else class="text-center py-6">
                <Icon name="lucide:archive-x" size="32" class="mx-auto mb-2 opacity-50" />
                <p class="text-sm">
                  No users in database yet
                </p>
              </div>
            </div>
          </UCard>
          <UCard variant="subtle" class="mt-8">
            <template #header>
              <div class="flex items-center gap-2 text-lg font-bold">
                <Icon name="lucide:user" />
                <span>
                  Add User (Database Mutation)
                </span>
              </div>
            </template>
            <div class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <UInput
                  v-model="newUser.name"
                  placeholder="Full name"
                  :disabled="addingUser"
                  @keyup.enter="handleAddUser"
                />
                <UInput
                  v-model="newUser.email"
                  type="email"
                  placeholder="email@example.com"
                  :disabled="addingUser"
                  @keyup.enter="handleAddUser"
                />
                <UInput
                  v-model.number="newUser.age"
                  type="number"
                  placeholder="Age"
                  :disabled="addingUser"
                  @keyup.enter="handleAddUser"
                />
              </div>
              <div class="flex gap-2">
                <UButton
                  :loading="addingUser"
                  color="neutral"
                  @click="handleAddUser"
                >
                  <Icon name="lucide:user-plus" />
                  Add User
                </UButton>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UPageSection>
  </UPage>
</template>

<script setup lang="ts">
import { useMutation } from '@pinia/colada';
import { computed } from 'vue';

const { $trpc } = useNuxtApp();
const store = useStore();

const features = ref([
  {
    title: 'Pinia Store',
    description: 'State management with Pinia, including persistent state and actions.',
    icon: 'lucide-lab:palmtree-island-sun',
  },
  {
    title: 'tRPC',
    description: 'Type-safe data fetching from the server using tRPC.',
    icon: 'simple-icons:trpc',
  },
  {
    title: 'Nuxt UI',
    description: 'UI components and theming with Nuxt UI for rapid development.',
    icon: 'lucide:layout-dashboard',
  },
  {
    title: 'Pinia Colada',
    description: 'Enhanced Pinia with Colada for simplified mutations and async operations.',
    icon: 'lucide-lab:cocktail',
  },
  {
    title: 'Drizzle ORM',
    description: 'Database interactions using Drizzle ORM with type safety and migrations.',
    icon: 'lucide:database',
  },
  {
    title: 'Nuxt 4',
    description: 'Built on the latest Nuxt 4 framework for modern web development.',
    icon: 'simple-icons:nuxt',
  },
]);

// Fetch users from database via tRPC
const {
  data: users,
  isLoading: usersLoading,
  error: usersError,
} = useQuery({
  key: ['users'],
  query: () => $trpc.getUsers.query(),
});

const queryCache = useQueryCache();

// Form state for adding new user
const newUser = ref({
  name: '',
  email: '',
  age: null as number | null,
});

const toast = useToast();

const {
  mutate: addUserMutate,
  asyncStatus: addUserAsyncStatus,
} = useMutation({
  mutation: $trpc.addUser.mutate,
  onSuccess: (result) => {
    if (result) {
      toast.add({
        title: 'User added',
        description: `Added ${result.name}!`,
        icon: 'lucide:check',
        color: 'success',
      });
    }
    newUser.value = { name: '', email: '', age: null };
    // Refetch users list
    queryCache.invalidateQueries({ key: ['users'] });
  },
  onError: (error: any) => {
    toast.add({
      title: 'Error',
      description: error?.message || 'Failed to add user',
      icon: 'lucide:x',
      color: 'error',
    });
  },
});

const addingUser = computed(() => addUserAsyncStatus.value === 'loading');

function handleAddUser() {
  if (!newUser.value.name || !newUser.value.email || !newUser.value.age) {
    toast.add({
      title: 'Missing fields',
      description: 'Please fill in all fields',
      icon: 'i-lucide-alert-circle',
      color: 'error',
    });
    return;
  }

  addUserMutate({
    name: newUser.value.name,
    email: newUser.value.email,
    age: newUser.value.age,
  });
}
</script>
