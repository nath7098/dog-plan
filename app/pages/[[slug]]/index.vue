<template>
  <div v-if="animal" class="p-6 max-w-6xl mx-auto">
    <!-- Profile Header Section with Background -->
    <UButton variant="link" icon="i-lucide-arrow-left" to="/" />

    <div class="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-6 shadow-sm">
      <DProfileHeader
          :avatar="animal.avatar"
          :name="animal.name"
          :gender="animal.gender"
          :birth-date="animal.birthDate"
          :weight="animal.weight"
          @open:weight="toggleWeightHistory" />
    </div>

    <!-- Cards Grid Layout -->
    <div class="grid md:grid-cols-2 gap-6 mt-6">
      <!-- Food Management Card -->
      <div class="rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-sm border border-neutral-200 dark:border-neutral-800 transition-all hover:shadow-md">
        <DProfileFood :name="animal.name" :food="animal.food" :meal-quantity="animal.mealQuantity" @update:meal="onMealUpdated" @add:food="onAddFood" @open:food="onOpenFood" @finish:food="onFinishFood" />
      </div>

      <!-- Health Management Section -->
      <div class="space-y-6">
        <!-- Flea Treatment Card -->
        <div class="rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-sm border border-neutral-200 dark:border-neutral-800 transition-all hover:shadow-md">
          <DProfileFlea :name="animal.name" :start="animal.fleaProtection?.start!" @select:start="updateFleaProtection" />
        </div>

        <!-- Deworming Card -->
        <div class="rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-sm border border-neutral-200 dark:border-neutral-800 transition-all hover:shadow-md">
          <DProfileWorm :name="animal.name" :start="animal.wormProtection?.start!" @select:start="updateWormProtection" />
        </div>
      </div>
    </div>

    <!-- Pet Stats Section -->
    <div class="mt-6 rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
      <h2 class="text-2xl mb-4 font-medium">Statistiques</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
          <div class="text-xl font-medium text-green-800 dark:text-green-300">{{ animal.mealQuantity }}g</div>
          <div class="text-sm text-green-600 dark:text-green-400">Croquettes par jour</div>
        </div>
        <div class="p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 cursor-pointer" @click="toggleWeightHistory">
          <div class="text-xl font-medium text-blue-800 dark:text-blue-300 flex items-center">
            {{ animal.weight }} kg
            <UIcon name="i-lucide-trending-up" class="ml-2" />
          </div>
          <div class="text-sm text-blue-600 dark:text-blue-400">Poids actuel</div>
        </div>
        <div class="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
          <div class="text-xl font-medium text-purple-800 dark:text-purple-300">{{ displayAge }}</div>
          <div class="text-sm text-purple-600 dark:text-purple-400">Âge</div>
        </div>
      </div>
    </div>

    <!-- Quick Actions Section -->
    <div class="mt-6 rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
      <h2 class="text-2xl mb-4 font-medium">Actions rapides</h2>
      <div class="flex flex-wrap gap-3">
        <UButton icon="i-lucide-package-plus" color="green">Nouveau sac</UButton>
        <UButton icon="i-lucide-calendar" color="blue">Prochain RDV véto</UButton>
        <UButton icon="i-lucide-activity" color="amber" @click="openWeightHistory">Ajouter un poids</UButton>
        <UButton icon="i-lucide-medal" color="purple">Ajouter un événement</UButton>
      </div>
    </div>

    <!-- Weight History Modal -->
    <UModal v-model:open="showWeightHistory" :ui="{content: 'max-w-7xl'}">
      <template #content>
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-xl font-medium">Suivi du poids de {{ animal.name }}</h3>
              <UButton color="gray" variant="ghost" icon="i-lucide-x" @click="showWeightHistory = false" />
            </div>
          </template>

          <DWeightHistory
              :pet-name="animal.name"
              :current-weight="animal.weight"
              :weight-history="animal.weightHistory"
              @update:weight="updateWeight" />
        </UCard>
      </template>
    </UModal>
  </div>
  <div v-else>loading {{ name }}</div>
</template>
<script lang="ts" setup>
import DWeightHistory from '~/components/custom/DWeightHistory.vue';
import DProfileFlea from '~/components/profile/DProfileFlea.vue';
import DProfileWorm from '~/components/profile/DProfileWorm.vue';
import DProfileHeader from '~/components/profile/DProfileHeader.vue';
import DProfileFood from '~/components/profile/DProfileFood.vue';
import { ref } from 'vue';
import type { CalendarDate } from '@internationalized/date';

const avatar = ref('https://images.unsplash.com/photo-1678818546240-2702b53da4da?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');

const route = useRoute();
const animalStore = useAnimalStore();
const name = computed(() => route.params?.slug?.trim() ?? null);
const animal = ref<Animal>(null);
const showWeightHistory = ref(false);

onMounted(() => {
  animal.value = animalStore.animalByName(name.value);
})

// Calculate pet age for stats section
const age = computed(() => {
  return calculAge(animal.value?.birthDate);
});

const displayAge = computed(() => {
  return ageToString(age.value);
});

const onMealUpdated = (meal) => {
  animal.value.mealQuantity = Number(meal.value);
  animal.value = animalStore.updateAnimal(animal.value);
};

const toggleWeightHistory = () => {
  showWeightHistory.value = !showWeightHistory.value;
};

const updateWeight = (newWeight: Weight) => {
  animal.value.weight = newWeight.weight;
  animal.value.weightHistory.push(newWeight);
  animal.value = animalStore.updateAnimal(animal.value);
};

const updateFleaProtection = (range: {start: CalendarDate | null, end: CalendarDate | null}) => {
  animal.value.fleaProtection = {start: range.start?.toString(), end: range.end?.toString()};
  animal.value = animalStore.updateAnimal(animal.value);
}

const updateWormProtection = (range: {start: CalendarDate | null, end: CalendarDate | null}) => {
  animal.value.wormProtection = {start: range.start?.toString(), end: range.end?.toString()};
  animal.value = animalStore.updateAnimal(animal.value);
}

const onAddFood = (food: Food) => {
  if (!animal.value.food) {
    animal.value.food = [food];
  } else {
    animal.value.food.push(food);
  }
  animal.value = animalStore.updateAnimal(animal.value);
}

const onOpenFood = () => {
  for (const f of animal.value.food) {
    if (f.state === 'stock') {
      f.openDate = new Date();
      f.state = 'open';
      animal.value = animalStore.updateAnimal(animal.value);
      break;
    }
  }

}

const onFinishFood = () => {
  if (animal.value.food.find(f => f.state === 'open')) {
    animal.value.food.find(f => f.state === 'open').state = 'empty';
    animal.value = animalStore.updateAnimal(animal.value);
  }
}
</script>

<style scoped>
/* Optional animation for hover states */
.transition-all {
  transition: all 0.3s ease;
}
</style>