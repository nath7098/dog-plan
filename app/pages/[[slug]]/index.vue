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
        <DProfileFood :name="animal.name" :food="food" :meal-quantity="animal.mealQuantity" @update:meal="onMealUpdated" @add:food="onAddFood" @open:food="onOpenFood" @finish:food="onFinishFood" />
      </div>

      <!-- Health Management Section -->
      <div class="space-y-6">
        <!-- Flea Treatment Card -->
        <div class="rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-sm border border-neutral-200 dark:border-neutral-800 transition-all hover:shadow-md">
          <DProfileFlea :name="animal.name" :start="toDate(animal.fleaProtection?.start!)" @select:start="updateFleaProtection" />
        </div>

        <!-- Deworming Card -->
        <div class="rounded-xl bg-white dark:bg-neutral-900 p-6 shadow-sm border border-neutral-200 dark:border-neutral-800 transition-all hover:shadow-md">
          <DProfileWorm :name="animal.name" :start="toDate(animal.wormProtection?.start!)" @select:start="updateWormProtection" />
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
import type Food from '~~/types/food';

const route = useRoute();
const animalStore = useAnimalStore();
const name = computed(() => route.params?.slug?.trim() ?? null);
const animal = ref<Animal>(null);
const showWeightHistory = ref(false);
const food = computed(() => animal?.food);

onMounted(() => {
  animal.value = animalStore.animalByName(name.value);
})

// Calculate pet age for stats section
const age = computed(() => {
  return calculAge(animal.value?.birthDate);
});

const displayAge = computed(() => {
  return ageToString(age.value!);
});

const onMealUpdated = (meal) => {
  animal.value = animalStore.updateAnimal(animal.value.id, {mealQuantity: Number(meal.value)});
};

const toggleWeightHistory = () => {
  showWeightHistory.value = !showWeightHistory.value;
};

const updateWeight = async (newWeight: Weight) => {
  animal.value = await animalStore.addWeightHistory(animal.value.id, newWeight);
};

const updateFleaProtection = async (range: {start: CalendarDate | null, end: CalendarDate | null}) => {
  animal.value = await animalStore.updateFleaProtection({animalId: animal.value.id, start: range.start?.toString(), end: range.end?.toString()});
}

const updateWormProtection = async (range: {start: CalendarDate | null, end: CalendarDate | null}) => {
  animal.value = await animalStore.updateWormProtection({animalId: animal.value.id, start: range.start?.toString(), end: range.end?.toString()});

}

const onAddFood = async (food: Food) => {
  animal.value = await animalStore.addFood(food);
}

const onOpenFood = async () => {
  animal.value = await animalStore.openFood(animal.value.id);
}

const onFinishFood = async () => {
  animal.value = await animalStore.finishFood(animal.value.id);
}
</script>

<style scoped>
/* Optional animation for hover states */
.transition-all {
  transition: all 0.3s ease;
}
</style>