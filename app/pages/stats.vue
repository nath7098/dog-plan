<template>
  <div class="min-h-screen">
    <!-- Header Section -->
    <div class="bg-gradient-to-br from-blue-400 via-purple-400 to-indigo-400 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div class="text-center">
          <div class="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
            <UIcon name="i-heroicons-chart-bar" class="text-4xl"/>
          </div>
          <h1 class="text-4xl font-bold mb-2">Statistiques</h1>
          <p class="text-xl text-white/90">Suivez la santé et les habitudes de vos compagnons</p>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="animalStore.loading" class="text-center py-12">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin text-blue-500 text-4xl mb-4"/>
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Chargement des statistiques...</h3>
        <p class="text-gray-500 dark:text-gray-400">Analyse des données de vos compagnons</p>
      </div>

      <!-- Error State -->
      <UAlert v-else-if="animalStore.error" 
        color="red" 
        variant="soft" 
        icon="i-heroicons-exclamation-triangle"
        :title="'Erreur de chargement'"
        :description="animalStore.error"
        class="mb-6"
      >
        <template #actions>
          <UButton color="red" variant="soft" size="sm" @click="initializeStore">
            Réessayer
          </UButton>
        </template>
      </UAlert>

      <!-- Empty State -->
      <div v-else-if="!animalStore.animals.length" class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          <UIcon name="i-heroicons-chart-bar-square" class="text-4xl text-gray-400"/>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Aucune donnée disponible</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6">Ajoutez vos compagnons pour voir leurs statistiques</p>
        <UButton to="/nouveau" size="lg" color="blue">
          <UIcon name="i-heroicons-plus" class="mr-2"/>
          Ajouter un compagnon
        </UButton>
      </div>

      <!-- Main Content -->
      <div v-else class="space-y-8">
        <!-- Pet Selector -->
        <div class="flex justify-center">
          <UTabs v-model="selectedPet" :items="animalsItems" class="w-full max-w-2xl" :content="false">
            <template #default="{ item }">
              <div class="flex items-center gap-2">
                <UAvatar 
                  v-if="item.value === 'all'"
                  icon="i-heroicons-users" 
                  size="xs"
                />
                <UAvatar 
                  v-else
                  :src="animalStore.animals.find(a => a.id === item.value)?.avatarDisplay" 
                  :alt="item.label"
                  size="xs"
                />
                <span>{{ item.label }}</span>
              </div>
            </template>
          </UTabs>
        </div>

        <!-- Summary Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <UCard>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <UIcon name="i-heroicons-heart" class="text-2xl text-blue-600 dark:text-blue-400"/>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ animalStore.animals.length }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Compagnon{{ animalStore.animals.length > 1 ? 's' : '' }}</div>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <UIcon name="i-heroicons-shield-check" class="text-2xl text-green-600 dark:text-green-400"/>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ protectedAnimals }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Protégés</div>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
                <UIcon name="i-heroicons-cake" class="text-2xl text-amber-600 dark:text-amber-400"/>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ totalDailyFood }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">g/jour</div>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
                <UIcon name="i-heroicons-exclamation-triangle" class="text-2xl text-red-600 dark:text-red-400"/>
              </div>
              <div>
                <div class="text-2xl font-bold text-gray-900 dark:text-white">{{ urgentTreatments }}</div>
                <div class="text-sm text-gray-600 dark:text-gray-400">Urgents</div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Main Dashboard Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Weight Evolution (Full Width) -->
          <div class="lg:col-span-2">
            <UCard>
              <template #header>
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <UIcon name="i-heroicons-chart-bar" class="text-blue-500"/>
                    <h2 class="text-xl font-semibold">Évolution du poids</h2>
                  </div>
                  <UBadge v-if="selectedAnimal" color="blue" variant="subtle">{{ selectedAnimal.name }}</UBadge>
                </div>
              </template>

              <div v-if="weightData.length" class="h-80">
                <DWeightChart :data="weightData" :pet-name="selectedAnimal?.name || 'Tous'"/>
              </div>
              <div v-else class="flex flex-col items-center justify-center h-80">
                <UIcon name="i-heroicons-chart-bar" class="text-6xl text-gray-300 dark:text-gray-600 mb-4"/>
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Pas assez de données</h3>
                <p class="text-gray-500 dark:text-gray-400 text-center">Il faut au moins 2 pesées pour afficher un graphique</p>
              </div>
            </UCard>
          </div>

          <!-- Health Summary -->
          <div class="space-y-6">
            <!-- Protection Status -->
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-shield-check" class="text-green-500"/>
                  <h3 class="text-lg font-semibold">Protection</h3>
                </div>
              </template>

              <div v-if="selectedAnimal" class="space-y-4">
                <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div class="flex items-center gap-3">
                    <UIcon name="i-heroicons-bug-ant" class="text-red-500"/>
                    <span class="font-medium">Anti-puces</span>
                  </div>
                  <UBadge :color="getProtectionStatus(selectedAnimal.fleaProtection) === 'text-green-500' ? 'green' : 'red'" variant="soft">
                    {{ getProtectionText(selectedAnimal.fleaProtection) }}
                  </UBadge>
                </div>
                
                <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div class="flex items-center gap-3">
                    <UIcon name="i-heroicons-beaker" class="text-purple-500"/>
                    <span class="font-medium">Vermifuge</span>
                  </div>
                  <UBadge :color="getProtectionStatus(selectedAnimal.wormProtection) === 'text-green-500' ? 'green' : 'red'" variant="soft">
                    {{ getProtectionText(selectedAnimal.wormProtection) }}
                  </UBadge>
                </div>

                <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div class="flex items-center gap-3">
                    <UIcon name="i-heroicons-scale" class="text-blue-500"/>
                    <span class="font-medium">Poids</span>
                  </div>
                  <div class="text-right">
                    <div class="font-semibold">{{ selectedAnimal.weight }}kg</div>
                    <div class="text-xs text-gray-500">{{ weightTrend.text }}</div>
                  </div>
                </div>
              </div>

              <div v-else class="space-y-3">
                <div v-for="animal in animalStore.animals" :key="animal.id" 
                     class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div class="flex items-center gap-3">
                    <UAvatar :src="animal.avatarDisplay" :alt="animal.name" size="sm"/>
                    <div>
                      <div class="font-medium">{{ animal.name }}</div>
                      <div class="text-xs text-gray-500">{{ displayAge(calculAge(animal.birthDate)) }}</div>
                    </div>
                  </div>
                  <div class="flex gap-1">
                    <UIcon :name="getProtectionStatus(animal.fleaProtection) === 'text-green-500' ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" 
                           :class="getProtectionStatus(animal.fleaProtection)" />
                    <UIcon :name="getProtectionStatus(animal.wormProtection) === 'text-green-500' ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'" 
                           :class="getProtectionStatus(animal.wormProtection)" />
                  </div>
                </div>
              </div>
            </UCard>

            <!-- Upcoming Treatments -->
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-heroicons-calendar-days" class="text-amber-500"/>
                  <h3 class="text-lg font-semibold">Prochains traitements</h3>
                </div>
              </template>

              <div v-if="upcomingTreatments.length" class="space-y-3">
                <div v-for="treatment in upcomingTreatments.slice(0, 5)" :key="treatment.id"
                     class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div class="flex items-center gap-3">
                    <UAvatar :src="treatment.animal.avatarDisplay" :alt="treatment.animal.name" size="sm"/>
                    <div>
                      <div class="font-medium">{{ treatment.animal.name }}</div>
                      <div class="text-xs text-gray-500">{{ treatment.label }}</div>
                    </div>
                  </div>
                  <UBadge :color="treatment.urgent ? 'red' : treatment.expired ? 'gray' : 'amber'" variant="soft">
                    {{ treatment.date }}
                  </UBadge>
                </div>
              </div>
              
              <div v-else class="text-center py-6">
                <UIcon name="i-heroicons-check-circle" class="text-4xl text-green-500 mb-2"/>
                <p class="text-sm text-gray-500">Tous les traitements sont à jour !</p>
              </div>
            </UCard>
          </div>
        </div>

        <!-- Food Consumption Analytics -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-cake" class="text-amber-500"/>
                <h3 class="text-lg font-semibold">Consommation de nourriture</h3>
              </div>
            </template>

            <div v-if="selectedAnimal" class="space-y-6">
              <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div class="text-2xl font-bold text-amber-600">{{ selectedAnimal.mealQuantity || 0 }}g</div>
                  <div class="text-sm text-gray-500">par jour</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-amber-600">{{ ((selectedAnimal.mealQuantity || 0) * 30 / 1000).toFixed(1) }}kg</div>
                  <div class="text-sm text-gray-500">par mois</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-amber-600">{{ ((selectedAnimal.mealQuantity || 0) * 365 / 1000).toFixed(1) }}kg</div>
                  <div class="text-sm text-gray-500">par an</div>
                </div>
              </div>

              <div v-if="selectedAnimal.food?.length">
                <h4 class="font-medium mb-3">Stock actuel</h4>
                <div class="space-y-3">
                  <div v-for="(item, index) in selectedAnimal.food.filter(f => f.state !== 'empty')" :key="index"
                       class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div class="flex items-center gap-3">
                      <UIcon :name="item.state === 'open' ? 'i-heroicons-cake' : 'i-heroicons-archive-box'"
                             class="text-amber-500"/>
                      <div>
                        <div class="font-medium">{{ item.brand }}</div>
                        <div class="text-xs text-gray-500">{{ item.weight }}kg - {{ item.state === 'open' ? 'Ouvert' : 'En stock' }}</div>
                      </div>
                    </div>
                    <div v-if="item.state === 'open'" class="text-right">
                      <div class="text-sm font-medium">{{ Math.round((1 - (foodPercentage(item, selectedAnimal.mealQuantity)?.percentage || 0) / 100) * item.weight * 10) / 10 }}kg</div>
                      <div class="text-xs text-gray-500">restant</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else class="space-y-6">
              <div class="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div class="text-2xl font-bold text-amber-600">{{ totalDailyFood }}g</div>
                  <div class="text-sm text-gray-500">par jour</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-amber-600">{{ (totalDailyFood * 30 / 1000).toFixed(1) }}kg</div>
                  <div class="text-sm text-gray-500">par mois</div>
                </div>
                <div>
                  <div class="text-2xl font-bold text-amber-600">{{ (totalDailyFood * 365 / 1000).toFixed(1) }}kg</div>
                  <div class="text-sm text-gray-500">par an</div>
                </div>
              </div>

              <div>
                <h4 class="font-medium mb-3">Répartition par animal</h4>
                <div class="space-y-2">
                  <div v-for="animal in animalStore.animals.filter(a => a.mealQuantity)" :key="animal.id"
                       class="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div class="flex items-center gap-3">
                      <UAvatar :src="animal.avatarDisplay" :alt="animal.name" size="sm"/>
                      <span class="font-medium">{{ animal.name }}</span>
                    </div>
                    <div class="text-amber-600 font-semibold">{{ animal.mealQuantity }}g</div>
                  </div>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Age and Growth Stats -->
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-calendar-days" class="text-purple-500"/>
                <h3 class="text-lg font-semibold">Âge et croissance</h3>
              </div>
            </template>

            <div v-if="selectedAnimal" class="space-y-4">
              <div class="text-center p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">
                  {{ displayAge(calculAge(selectedAnimal.birthDate)) }}
                </div>
                <div class="text-sm text-purple-600 dark:text-purple-400">Âge de {{ selectedAnimal.name }}</div>
              </div>

              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Poids actuel</span>
                  <span class="font-semibold">{{ selectedAnimal.weight || 'Non renseigné' }}{{ selectedAnimal.weight ? 'kg' : '' }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Tendance</span>
                  <div class="flex items-center gap-2">
                    <UIcon :name="weightTrend.icon" :class="weightTrend.color"/>
                    <span class="text-sm">{{ weightTrend.text }}</span>
                  </div>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400">Pesées enregistrées</span>
                  <span class="font-semibold">{{ selectedAnimal.weightHistory?.length || 0 }}</span>
                </div>
              </div>
            </div>

            <div v-else class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20">
                  <div class="text-xl font-bold text-purple-600 dark:text-purple-400">{{ averageAge.toFixed(1) }}</div>
                  <div class="text-xs text-purple-600 dark:text-purple-400">Âge moyen</div>
                </div>
                <div class="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
                  <div class="text-xl font-bold text-blue-600 dark:text-blue-400">{{ totalWeightEntries }}</div>
                  <div class="text-xs text-blue-600 dark:text-blue-400">Pesées totales</div>
                </div>
              </div>

              <div class="space-y-2">
                <div v-for="animal in animalStore.animals" :key="animal.id"
                     class="flex items-center justify-between p-2 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <div class="flex items-center gap-2">
                    <UAvatar :src="animal.avatarDisplay" :alt="animal.name" size="xs"/>
                    <span class="text-sm font-medium">{{ animal.name }}</span>
                  </div>
                  <div class="text-right">
                    <div class="text-sm font-semibold">{{ displayAge(calculAge(animal.birthDate)) }}</div>
                    <div class="text-xs text-gray-500">{{ animal.weight || 'N/A' }}{{ animal.weight ? 'kg' : '' }}</div>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getLocalTimeZone, parseDate, today, CalendarDate } from '@internationalized/date';
import DWeightChart from '~/components/custom/DWeightChart.vue';

definePageMeta({
  layout: 'authenticated'
})

const animalStore = useAnimalStore();
const selectedPet = ref('all');

const animalsItems = computed(() => [
  {
    label: 'Tous les animaux',
    value: 'all'
  },
  ...animalStore.animals.map(a => ({
    label: a.name,
    value: a.id
  }))
]);

// Initialize the store
async function initializeStore() {
  try {
    await animalStore.fetchAnimals();
  } catch (error) {
    console.error('Failed to initialize animal store:', error);
  }
}

// Call initialization on component mount
onMounted(() => {
  initializeStore();
});

// Get the selected animal or null if "all" is selected
const selectedAnimal = computed(() => {
  if (selectedPet.value === 'all') {
    return null;
  }
  return animalStore.animals.find(animal => animal.id === selectedPet.value);
});

// New computed properties for summary cards
const protectedAnimals = computed(() => {
  return animalStore.animals.filter(animal => {
    const fleaProtected = !isProtectionExpired(animal.fleaProtection);
    const wormProtected = !isProtectionExpired(animal.wormProtection);
    return fleaProtected && wormProtected;
  }).length;
});

const urgentTreatments = computed(() => {
  return upcomingTreatments.value.filter(t => t.urgent || t.expired).length;
});

const averageAge = computed(() => {
  if (!animalStore.animals.length) return 0;
  const totalAgeInDays = animalStore.animals.reduce((sum, animal) => {
    const age = calculAge(animal.birthDate);
    return sum + (age?.years || 0) * 365 + (age?.months || 0) * 30 + (age?.days || 0);
  }, 0);
  return totalAgeInDays / animalStore.animals.length / 365;
});

const totalWeightEntries = computed(() => {
  return animalStore.animals.reduce((sum, animal) => {
    return sum + (animal.weightHistory?.length || 0);
  }, 0);
});

// Weight data for charts
const weightData = computed(() => {
  if (selectedAnimal.value) {
    if (!selectedAnimal.value.weightHistory || selectedAnimal.value.weightHistory.length < 2) {
      return [];
    }
    return selectedAnimal.value.weightHistory;
  } else {
    // Combine weight data from all animals for multi-series chart
    const allWeightData = [];
    for (const animal of animalStore.animals) {
      if (animal.weightHistory && animal.weightHistory.length >= 2) {
        allWeightData.push(...animal.weightHistory);
      }
    }
    return allWeightData;
  }
});

// Weight trend calculation
const weightTrend = computed(() => {
  if (!selectedAnimal.value || !selectedAnimal.value.weightHistory || selectedAnimal.value.weightHistory.length < 2) {
    return {icon: 'i-heroicons-minus', color: 'text-gray-500', text: 'Pas assez de données'};
  }

  try {
    // Sort weight history by date
    const sortedWeights = [...selectedAnimal.value.weightHistory]
        .map(entry => ({
          ...entry,
          parsedDate: typeof entry.date === 'string' ? parseDate(entry.date) : entry.date
        }))
        .sort((a, b) => {
          if (!a.parsedDate || !b.parsedDate) return 0;
          return a.parsedDate.compare(b.parsedDate);
        });

    // Get the two most recent weights
    const mostRecent = sortedWeights[sortedWeights.length - 1];
    const previousWeight = sortedWeights[sortedWeights.length - 2];

    const difference = mostRecent.weight - previousWeight.weight;
    const percentChange = (difference / previousWeight.weight) * 100;

    if (Math.abs(percentChange) < 1) {
      return {icon: 'i-heroicons-minus', color: 'text-blue-500', text: 'Stable'};
    } else if (percentChange > 0) {
      return {
        icon: 'i-heroicons-arrow-trending-up',
        color: 'text-red-500',
        text: `+${difference.toFixed(1)}kg`
      };
    } else {
      return {
        icon: 'i-heroicons-arrow-trending-down',
        color: 'text-green-500',
        text: `${difference.toFixed(1)}kg`
      };
    }
  } catch (e) {
    console.error('Error calculating weight trend:', e);
    return {icon: 'i-heroicons-exclamation-triangle', color: 'text-amber-500', text: 'Erreur'};
  }
});

// Total daily food consumption (all animals)
const totalDailyFood = computed(() => {
  return animalStore.animals.reduce((sum, animal) => sum + (animal.mealQuantity || 0), 0);
});

// Helper functions
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
    if (daysLeft <= 7) return `${daysLeft}j restant${daysLeft > 1 ? 's' : ''}`;
    return 'Protégé';
  } catch (e) {
    return 'Erreur';
  }
};

// Check if protection is expired
const isProtectionExpired = (protection) => {
  if (!protection || !protection.end) return true;
  const td = today(getLocalTimeZone());
  try {
    return parseDate(protection.end).compare(td) <= 0;
  } catch (e) {
    return true;
  }
};

// Get upcoming treatments
const upcomingTreatments = computed(() => {
  const td = today(getLocalTimeZone());
  const treatments = [];

  for (const animal of animalStore.animals) {
    // Only include this animal's treatments if it's selected or if all pets are selected
    if (selectedPet.value !== 'all' && animal.id !== selectedPet.value) {
      continue;
    }

    // Check flea protection
    if (animal.fleaProtection && animal.fleaProtection.end) {
      try {
        const endDate = parseDate(animal.fleaProtection.end);
        const daysDiff = endDate.compare(td);

        if (daysDiff > -14) { // Include if not expired for more than 14 days
          treatments.push({
            id: `flea-${animal.id}`,
            animal: animal,
            label: 'Anti-puces & tiques',
            date: daysDiff <= 0 ? 'Expiré' : `J-${daysDiff}`,
            urgent: daysDiff <= 7 && daysDiff > 0,
            expired: daysDiff <= 0,
            sortValue: daysDiff
          });
        }
      } catch (e) {
        console.error('Error processing flea protection date:', e);
      }
    }

    // Check worm protection
    if (animal.wormProtection && animal.wormProtection.end) {
      try {
        const endDate = parseDate(animal.wormProtection.end);
        const daysDiff = endDate.compare(td);

        if (daysDiff > -14) { // Include if not expired for more than 14 days
          treatments.push({
            id: `worm-${animal.id}`,
            animal: animal,
            label: 'Vermifuge',
            date: daysDiff <= 0 ? 'Expiré' : `J-${daysDiff}`,
            urgent: daysDiff <= 7 && daysDiff > 0,
            expired: daysDiff <= 0,
            sortValue: daysDiff
          });
        }
      } catch (e) {
        console.error('Error processing worm protection date:', e);
      }
    }
  }

  // Sort treatments: first by expiration status, then by days remaining
  return treatments.sort((a, b) => {
    if (a.expired && !b.expired) return -1;
    if (!a.expired && b.expired) return 1;
    return a.sortValue - b.sortValue;
  });
});

const displayAge = (a) => {
  return ageToString(a);
};
</script>