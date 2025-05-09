<template>
  <div v-if="!animal" class="text-center py-6">
    <UIcon name="i-heroicons-arrow-path" class="animate-spin text-blue-500 text-2xl" />
    <p class="mt-2 text-slate-600">Récupération des données {{name.value ? `de ${name.value}` : ''}}...</p>
  </div>
  <div v-else class="p-6 max-w-6xl mx-auto">
    <DCard>
      <DProfileHeader
          :avatar="animal.avatar"
          :name="animal.name"
          :gender="animal.gender"
          :birth-date="animal.birthDate"
          :weight="animal.weight"
          @open:weight="toggleWeightHistory" />
    </DCard>

    <!-- Cards Grid Layout -->
    <div class="grid md:grid-cols-2 gap-6 mt-6">
      <!-- Food Management Card -->
      <DCard>
        <DProfileFood :name="animal.name" :food="food" :meal-quantity="animal.mealQuantity" />
      </DCard>

      <!-- Health Management Section -->
      <div class="space-y-6">
        <!-- Flea Treatment Card -->
        <DCard>
          <DProfileFlea :name="animal.name" :start="toDate(animal.fleaProtection?.start!)" @select:start="updateFleaProtection" />
        </DCard>

        <!-- Deworming Card -->
        <DCard>
          <DProfileWorm :name="animal.name" :start="toDate(animal.wormProtection?.start!)" @select:start="updateWormProtection" />
        </DCard>
      </div>
    </div>

    <!-- Pet Stats Section -->
    <DCard class="mt-6">
      <h2 class="text-2xl mb-4 font-medium">Statistiques</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 rounded-lg bg-green-900/20 border border-green-600/50 dark:border-green-800">
          <div class="text-xl font-medium text-green-800 dark:text-green-300">{{ animal.mealQuantity }}g</div>
          <div class="text-sm text-green-600 dark:text-green-400">Croquettes par jour</div>
        </div>
        <div class="p-4 rounded-lg bg-blue-900/20 border border-blue-600/50 dark:border-blue-800 cursor-pointer" @click="toggleWeightHistory">
          <div class="text-xl font-medium text-blue-800 dark:text-blue-300 flex items-center">
            {{ animal.weight }} kg
            <UIcon name="i-lucide-trending-up" class="ml-2" />
          </div>
          <div class="text-sm text-blue-600 dark:text-blue-400">Poids actuel</div>
        </div>
        <div class="p-4 rounded-lg bg-purple-900/20 border border-purple-600/50 dark:border-purple-800">
          <div class="text-xl font-medium text-purple-800 dark:text-purple-300">{{ displayAge }}</div>
          <div class="text-sm text-purple-600 dark:text-purple-400">Âge</div>
        </div>
      </div>
    </DCard>

    <!-- Quick Actions Section -->
    <DCard class="mt-6">
      <h2 class="text-2xl mb-4 font-medium">Actions rapides</h2>
      <div class="flex flex-wrap gap-3">
        <UButton icon="i-lucide-activity" variant="ghost" color="warning" @click="toggleWeightHistory">Ajouter un poids</UButton>
        <UButton icon="i-lucide-trash-2" variant="ghost" color="error" @click="onDeleteAnimal">Supprimer</UButton>
      </div>
    </DCard>

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
</template>
<script lang="ts" setup>
import DWeightHistory from '~/components/custom/DWeightHistory.vue';
import DProfileFlea from '~/components/profile/DProfileFlea.vue';
import DProfileWorm from '~/components/profile/DProfileWorm.vue';
import DProfileHeader from '~/components/profile/DProfileHeader.vue';
import DProfileFood from '~/components/profile/DProfileFood.vue';
import DCard from '~/components/custom/DCard.vue';
import type { CalendarDate } from '@internationalized/date';
import type Weight from '~~/types/weight';

definePageMeta({
  layout: 'authenticated'
})

const reloaded = ref(false);
const route = useRoute();
const animalStore = useAnimalStore();
const name = computed(() => route.params?.slug?.trim() ?? null);
const animal = ref<Animal>(null);
const showWeightHistory = ref(false);
const food = computed(() => animal?.food);

onMounted(async () => {
  animal.value = animalStore.animalByName(name.value);
  if (!animal.value) {
    await animalStore.fetchAnimals();
    animal.value = animalStore.animalByName(name.value);
    if (!animal.value) {
      navigateTo('/');
    }
  }
})

// Calculate pet age for stats section
const age = computed(() => {
  return calculAge(animal.value?.birthDate);
});

const displayAge = computed(() => {
  return ageToString(age.value!);
});

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

const onDeleteAnimal = async () => {
  await animalStore.removeAnimal(animal.value.id);
  navigateTo('/');
}
</script>

<style scoped>
/* Optional animation for hover states */
.transition-all {
  transition: all 0.3s ease;
}
</style>