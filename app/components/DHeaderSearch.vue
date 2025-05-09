<template>
  <div class="relative">
    <!-- Search input -->
    <div class="relative">
      <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          placeholder="Rechercher un animal..."
          class="w-full md:w-64 text-sm rounded-full"
          @keyup.enter="performSearch"
          @focus="isFocused = true"
          @blur="setTimeout(() => { isFocused = false }, 200)"
      />
    </div>

    <!-- Search results dropdown -->
    <div
        v-if="isFocused && searchQuery.length > 1 && filteredResults.length > 0"
        class="absolute top-full mt-1 left-0 w-full bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700 z-50 max-h-60 overflow-y-auto"
    >
      <div
          v-for="result in filteredResults"
          :key="result.id"
          class="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-neutral-700 cursor-pointer transition-colors"
          @click="navigateTo(result)"
      >
        <UAvatar
            :src="result.avatar"
            icon="i-fluent-animal-dog-16-regular"
            :alt="result.name"
            size="sm"
        />
        <div>
          <div class="font-medium text-gray-900 dark:text-white">{{ result.name }}</div>
          <div class="text-xs text-gray-500 dark:text-gray-400">{{ result.breed || 'Animal de compagnie' }}</div>
        </div>
      </div>
    </div>

    <!-- No results -->
    <div
        v-if="isFocused && searchQuery.length > 1 && filteredResults.length === 0"
        class="absolute top-full mt-1 left-0 w-full bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-gray-200 dark:border-neutral-700 z-50 p-4 text-center"
    >
      <p class="text-gray-500 dark:text-gray-400">Aucun résultat trouvé</p>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const animalStore = useAnimalStore();

const searchQuery = ref('');
const isFocused = ref(false);

// Filter animals based on search query
const filteredResults = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) return [];

  const query = searchQuery.value.toLowerCase();

  return animalStore.animals.filter(animal =>
      animal.name.toLowerCase().includes(query) ||
      (animal.breed && animal.breed.toLowerCase().includes(query))
  );
});

// Navigate to animal page
const navigateTo = (animal) => {
  router.push(`/${animal.name}`);
  searchQuery.value = '';
};

// Handle search
const performSearch = () => {
  if (filteredResults.value.length > 0) {
    navigateTo(filteredResults.value[0]);
  }
};
</script>