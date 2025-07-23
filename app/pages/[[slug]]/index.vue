<template>
  <!-- Loading State -->
  <div v-if="!animal" class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <UIcon name="i-heroicons-arrow-path" class="animate-spin text-amber-500 text-4xl mb-4" />
      <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Chargement en cours...</h3>
      <p class="text-gray-500 dark:text-gray-400">Récupération des données {{name ? `de ${name}` : ''}}</p>
    </div>
  </div>

  <!-- Pet Profile Content -->
  <div v-else class="min-h-screen">
    <!-- Header Section with Hero Background -->
    <div class="relative bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black/20"></div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Back Button -->
        <UButton
          to="/"
          variant="ghost"
          color="white"
          class="mb-6 hover:bg-white/20"
        >
          <UIcon name="i-heroicons-arrow-left" class="mr-2"/>
          Retour
        </UButton>

        <!-- Pet Header Info -->
        <div class="flex flex-col md:flex-row items-center md:items-start gap-6">
          <!-- Avatar with Upload -->
          <div class="relative group">
            <UAvatar
              :src="animal.avatarDisplay"
              :alt="animal.name"
              class="w-32 h-32 ring-4 ring-white/50 shadow-2xl"
              :ui="{ 
                background: 'bg-gradient-to-br from-white/20 to-white/10',
                placeholder: 'flex items-center justify-center text-white text-4xl font-medium'
              }"
            />
            <UButton
              variant="solid"
              color="white"
              size="sm"
              class="absolute bottom-2 right-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
              @click="showAvatarSelector = true"
            >
              <UIcon name="i-heroicons-camera"/>
            </UButton>
          </div>

          <!-- Pet Info -->
          <div class="text-center md:text-left flex-1">
            <div class="flex items-center justify-center md:justify-start gap-3 mb-3">
              <h1 class="text-4xl md:text-5xl font-bold">{{ animal.name }}</h1>
              <UIcon
                :name="animal.gender === 'male' ? 'i-heroicons-user' : 'i-heroicons-user'"
                :class="animal.gender === 'male' ? 'text-blue-200' : 'text-pink-200'"
                class="text-2xl"
              />
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div class="text-2xl font-bold">{{ displayAge }}</div>
                <div class="text-sm text-white/80">Âge</div>
              </div>
              <div>
                <div class="text-2xl font-bold">{{ animal.weight }}kg</div>
                <div class="text-sm text-white/80">Poids</div>
              </div>
              <div>
                <div class="text-2xl font-bold">{{ animal.mealQuantity }}g</div>
                <div class="text-sm text-white/80">Ration/jour</div>
              </div>
              <div>
                <div class="text-2xl font-bold">{{ getHealthScore(animal) }}/100</div>
                <div class="text-sm text-white/80">Santé</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Health Status Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <UCard class="text-center">
          <div class="flex flex-col items-center">
            <UIcon 
              name="i-heroicons-bug-ant" 
              :class="getProtectionStatus(animal.fleaProtection)" 
              class="text-3xl mb-2"
            />
            <h3 class="font-semibold text-gray-900 dark:text-white">Anti-puces</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ getProtectionText(animal.fleaProtection) }}
            </p>
          </div>
        </UCard>
        
        <UCard class="text-center">
          <div class="flex flex-col items-center">
            <UIcon 
              name="i-heroicons-beaker" 
              :class="getProtectionStatus(animal.wormProtection)" 
              class="text-3xl mb-2"
            />
            <h3 class="font-semibold text-gray-900 dark:text-white">Vermifuge</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ getProtectionText(animal.wormProtection) }}
            </p>
          </div>
        </UCard>
        
        <UCard class="text-center">
          <div class="flex flex-col items-center">
            <UIcon 
              name="i-heroicons-cake" 
              :class="getFoodStatusClass(animal)" 
              class="text-3xl mb-2"
            />
            <h3 class="font-semibold text-gray-900 dark:text-white">Nourriture</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ getFoodStatusText(animal) }}
            </p>
          </div>
        </UCard>
        
        <UCard class="text-center">
          <div class="flex flex-col items-center">
            <UIcon 
              name="i-heroicons-chart-bar" 
              class="text-3xl mb-2 text-blue-500"
            />
            <h3 class="font-semibold text-gray-900 dark:text-white">Poids</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">Voir l'évolution</p>
          </div>
        </UCard>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Food & Actions -->
        <div class="space-y-6">
          <!-- Food Management -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-cake" class="text-amber-500"/>
                <h2 class="text-xl font-semibold">Gestion Nourriture</h2>
              </div>
            </template>
            
            <!-- Food content will be rendered by existing component -->
            <DProfileFood :name="animal.name" :food="food" :meal-quantity="animal.mealQuantity" />
          </UCard>

          <!-- Quick Actions -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-bolt" class="text-blue-500"/>
                <h2 class="text-xl font-semibold">Actions Rapides</h2>
              </div>
            </template>
            
            <div class="space-y-3">
              <UModal>
                <UButton block variant="soft" color="blue">
                  <UIcon name="i-heroicons-scale" class="mr-2"/>
                  Ajouter une pesée
                </UButton>
                
                <template #content>
                  <UCard class="max-w-4xl mx-auto">
                    <template #header>
                      <h3 class="text-xl font-semibold">Suivi du poids de {{ animal.name }}</h3>
                    </template>

                    <DWeightHistory
                      :pet-name="animal.name"
                      :current-weight="animal.weight"
                      :weight-history="animal.weightHistory"
                      @update:weight="updateWeight" 
                    />
                  </UCard>
                </template>
              </UModal>
              <UButton block variant="soft" color="green" @click="showFoodDialog = true">
                <UIcon name="i-heroicons-plus" class="mr-2"/>
                Ajouter nourriture
              </UButton>
              <UButton block variant="soft" color="amber" @click="showTreatmentDialog = true">
                <UIcon name="i-heroicons-heart" class="mr-2"/>
                Programmer traitement
              </UButton>
              <UModal>
                <UButton block variant="soft" color="red">
                  <UIcon name="i-heroicons-trash" class="mr-2"/>
                  Supprimer {{ animal.name }}
                </UButton>
                
                <template #content>
                  <UCard>
                    <template #header>
                      <h3 class="text-xl font-semibold text-red-600">Supprimer {{ animal.name }}</h3>
                    </template>
                    
                    <div class="text-center py-4">
                      <UIcon name="i-heroicons-exclamation-triangle" class="text-6xl text-red-500 mb-4"/>
                      <p class="text-lg mb-2">Êtes-vous sûr de vouloir supprimer {{ animal.name }} ?</p>
                      <p class="text-gray-600 dark:text-gray-400">Cette action est irréversible et supprimera toutes les données associées.</p>
                    </div>
                    
                    <template #footer>
                      <div class="flex gap-3 justify-end">
                        <UButton variant="ghost">Annuler</UButton>
                        <UButton color="red" @click="onDeleteAnimal">Supprimer définitivement</UButton>
                      </div>
                    </template>
                  </UCard>
                </template>
              </UModal>
            </div>
          </UCard>
        </div>

        <!-- Right Column - Treatments & Stats -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Health Treatments -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Flea Treatment -->
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-bug-ant" class="text-red-500"/>
                  <h3 class="text-lg font-semibold">Anti-puces</h3>
                </div>
              </template>
              <DProfileFlea :name="animal.name" :start="toDate(animal.fleaProtection?.start!)" @select:start="updateFleaProtection" />
            </UCard>

            <!-- Worm Treatment -->
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-beaker" class="text-purple-500"/>
                  <h3 class="text-lg font-semibold">Vermifuge</h3>
                </div>
              </template>
              <DProfileWorm :name="animal.name" :start="toDate(animal.wormProtection?.start!)" @select:start="updateWormProtection" />
            </UCard>
          </div>

          <!-- Weight Chart & History -->
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-chart-bar" class="text-blue-500"/>
                  <h3 class="text-lg font-semibold">Évolution du poids</h3>
                </div>
                <UModal>
                  <UButton variant="ghost" size="sm">
                    <UIcon name="i-heroicons-plus" class="mr-1"/>
                    Ajouter
                  </UButton>
                  
                  <template #content>
                    <UCard class="max-w-4xl mx-auto">
                      <template #header>
                        <h3 class="text-xl font-semibold">Suivi du poids de {{ animal.name }}</h3>
                      </template>

                      <DWeightHistory
                        :pet-name="animal.name"
                        :current-weight="animal.weight"
                        :weight-history="animal.weightHistory"
                        @update:weight="updateWeight" 
                      />
                    </UCard>
                  </template>
                </UModal>
              </div>
            </template>
            
            <div v-if="animal.weightHistory?.length" class="h-64">
              <DWeightChart :data="animal.weightHistory" :pet-name="animal.name" />
            </div>
            <div v-else class="text-center py-12">
              <UIcon name="i-heroicons-chart-bar" class="text-4xl text-gray-400 mb-4"/>
              <p class="text-gray-500 dark:text-gray-400">Aucune donnée de poids disponible</p>
              <UModal>
                <UButton variant="soft" class="mt-4">
                  Ajouter le premier poids
                </UButton>
                
                <template #content>
                  <UCard class="max-w-4xl mx-auto">
                    <template #header>
                      <h3 class="text-xl font-semibold">Suivi du poids de {{ animal.name }}</h3>
                    </template>

                    <DWeightHistory
                      :pet-name="animal.name"
                      :current-weight="animal.weight"
                      :weight-history="animal.weightHistory"
                      @update:weight="updateWeight" 
                    />
                  </UCard>
                </template>
              </UModal>
            </div>
          </UCard>
        </div>
      </div>
    </div>

    <!-- Weight History Modal - Hidden since we use inline modals now -->
    <!-- This modal is triggered by the card click and inline modals above -->

    <!-- Delete Confirmation Modal - Hidden since we use inline modals now -->
    <!-- This modal is now handled inline within the Quick Actions section -->
  </div>
</template>
<script lang="ts" setup>
import { getLocalTimeZone, parseDate, today } from '@internationalized/date';
import DWeightHistory from '~/components/custom/DWeightHistory.vue';
import DProfileFlea from '~/components/profile/DProfileFlea.vue';
import DProfileWorm from '~/components/profile/DProfileWorm.vue';
import DProfileFood from '~/components/profile/DProfileFood.vue';
import DWeightChart from '~/components/custom/DWeightChart.vue';
import type { CalendarDate } from '@internationalized/date';
import type Weight from '~~/types/weight';
import type Animal from '~~/types/animal';

definePageMeta({
  layout: 'authenticated'
})

const route = useRoute();
const animalStore = useAnimalStore();
const name = computed(() => route.params?.slug?.trim() ?? null);
const animal = ref<Animal | null>(null);
const showAvatarSelector = ref(false);
const showFoodDialog = ref(false);
const showTreatmentDialog = ref(false);

const food = computed(() => animal.value?.food);

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

// Helper functions for UI status
const getProtectionStatus = (protection) => {
  if (!protection || !protection.end) return 'text-red-500';
  const td = today(getLocalTimeZone());
  try {
    const isExpired = parseDate(protection.end).compare(td) <= 0;
    return isExpired ? 'text-red-500' : 'text-green-500';
  } catch (e) {
    return 'text-red-500';
  }
};

const getProtectionText = (protection) => {
  if (!protection || !protection.end) return 'Non protégé';
  const td = today(getLocalTimeZone());
  try {
    const isExpired = parseDate(protection.end).compare(td) <= 0;
    if (isExpired) return 'Expiré';
    const daysLeft = parseDate(protection.end).compare(td);
    if (daysLeft <= 7) return `Expire dans ${daysLeft} jour${daysLeft > 1 ? 's' : ''}`;
    return 'Protégé';
  } catch (e) {
    return 'Erreur';
  }
};

const getFoodStatus = (animal) => {
  if (!animal.food?.length) return 'empty';
  const stockFood = animal.food.find(f => f.state === 'stock');
  const openFood = animal.food.find(f => f.state === 'open');
  if (!stockFood && openFood && foodPercentage(openFood)?.percentage >= 70) {
    return 'low';
  }
  return 'ok';
};

const getFoodStatusClass = (animal) => {
  const status = getFoodStatus(animal);
  switch (status) {
    case 'empty': return 'text-red-500';
    case 'low': return 'text-amber-500';
    default: return 'text-green-500';
  }
};

const getFoodStatusText = (animal) => {
  const status = getFoodStatus(animal);
  switch (status) {
    case 'empty': return 'Stock vide';
    case 'low': return 'Stock faible';
    default: return 'Stock OK';
  }
};

const getHealthScore = (animal) => {
  let score = 100;
  
  // Check protections
  if (!animal.fleaProtection || !animal.fleaProtection.end || 
      parseDate(animal.fleaProtection.end).compare(today(getLocalTimeZone())) <= 0) {
    score -= 25;
  }
  
  if (!animal.wormProtection || !animal.wormProtection.end || 
      parseDate(animal.wormProtection.end).compare(today(getLocalTimeZone())) <= 0) {
    score -= 25;
  }
  
  // Check food status
  const foodStatus = getFoodStatus(animal);
  if (foodStatus === 'empty') score -= 30;
  else if (foodStatus === 'low') score -= 15;
  
  // Check weight tracking
  if (!animal.weight) score -= 20;
  
  return Math.max(0, score);
};

// Event handlers

const onChangeAvatar = async (newAvatar: {fileURL: string, file: File}) => {
  animal.value = await animalStore.updateAnimalAvatar(animal.value, newAvatar);
}

const updateWeight = async (newWeight: Weight) => {
  animal.value = await animalStore.addWeightHistory(animal.value.id, newWeight);
};

const updateFleaProtection = async (range: {start: CalendarDate | null, end: CalendarDate | null}) => {
  animal.value = await animalStore.updateFleaProtection({
    animalId: animal.value.id, 
    start: range.start?.toString(), 
    end: range.end?.toString()
  });
}

const updateWormProtection = async (range: {start: CalendarDate | null, end: CalendarDate | null}) => {
  animal.value = await animalStore.updateWormProtection({
    animalId: animal.value.id, 
    start: range.start?.toString(), 
    end: range.end?.toString()
  });
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