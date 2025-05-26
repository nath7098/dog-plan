<template>
  <div class="min-h-screen p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold dark:text-neutral-50 text-neutral-800 mb-2">Statistiques</h1>
        <p class="dark:text-neutral-400 text-neutral-500">Suivez la santé et les habitudes de vos compagnons</p>
      </div>

      <!-- Loading and Error States -->
      <div v-if="animalStore.loading" class="text-center py-6">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin text-blue-500 text-2xl"/>
        <p class="mt-2 text-slate-600">Chargement des statistiques...</p>
      </div>

      <div v-else-if="animalStore.error" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
        <div class="flex items-center">
          <UIcon name="i-heroicons-exclamation-circle" class="text-red-500 mr-2"/>
          <p>Erreur: {{ animalStore.error }}</p>
        </div>
        <UButton
            class="mt-2"
            size="sm"
            color="red"
            variant="soft"
            @click="initializeStore"
        >
          Réessayer
        </UButton>
      </div>

      <div v-else-if="!animalStore.animals.length" class="text-center py-20">
        <UIcon name="i-tabler-paw-off" class="text-neutral-400 text-4xl mb-4"/>
        <h2 class="text-xl font-medium dark:text-neutral-200 text-neutral-700 mb-2">Pas encore d'animaux</h2>
        <p class="dark:text-neutral-400 text-neutral-600 mb-4">Ajoutez vos compagnons pour voir leurs statistiques</p>
        <UButton to="/nouveau" color="amber" variant="soft" icon="i-heroicons-plus">
          Ajouter un animal
        </UButton>
      </div>

      <div v-else>
        <UTabs :items="animalsItems"
               default-value="all"
               class="mb-8"
               :ui="{list: 'bg-neutral-200/30! dark:bg-neutral-700/30! backdrop-blur-sm!', indicator: 'bg-amber-500/90!', trigger: 'focus-visible:outline-amber-500!'}"
               @update:modelValue="(pet) => selectedPet = pet">
        </UTabs>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Weight Evolution Card -->
          <DCard>

            <div class="flex justify-between items-center">
              <h2 class="text-xl font-medium">Évolution du poids</h2>
              <UBadge v-if="selectedAnimal" color="amber" variant="subtle">{{ selectedAnimal.name }}</UBadge>
            </div>

            <div v-if="weightData.length" class="h-64">
              <DWeightChart :data="weightData" :pet-name="selectedAnimal?.name || 'Tous'"/>
            </div>
            <div v-else class="flex flex-col items-center justify-center h-64 text-neutral-500">
              <UIcon name="i-healthicons-weight-outline" class="text-3xl mb-2"/>
              <p>Pas assez de données pour afficher un graphique</p>
            </div>
          </DCard>

          <!-- Health Status Card -->
          <DCard>
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-medium">Statut de santé</h2>
              <UBadge v-if="selectedAnimal" color="amber" variant="subtle">{{ selectedAnimal.name }}</UBadge>
            </div>
            <div v-if="selectedAnimal">
              <div class="grid grid-cols-2 gap-4">
                <!-- Protection Status -->
                <div class="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <div class="flex items-center gap-2 mb-2">
                    <UIcon name="i-heroicons-bug-ant" class="text-red-500"/>
                    <h3 class="font-medium">Anti-puces & tiques</h3>
                  </div>
                  <div class="mb-2">
                    <DStatsProtectionProgress
                        :start-date="selectedAnimal.fleaProtection?.start"
                        :end-date="selectedAnimal.fleaProtection?.end"
                    />
                  </div>
                </div>

                <div class="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <div class="flex items-center gap-2 mb-2">
                    <UIcon name="i-fluent-emoji-high-contrast-worm" class="text-orange-500"/>
                    <h3 class="font-medium">Vermifuge</h3>
                  </div>
                  <div class="mb-2">
                    <DStatsProtectionProgress
                        :start-date="selectedAnimal.wormProtection?.start"
                        :end-date="selectedAnimal.wormProtection?.end"
                    />
                  </div>
                </div>

                <!-- Weight Trends -->
                <div class="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <div class="flex items-center gap-2 mb-2">
                    <UIcon name="i-healthicons-weight-outline" class="text-blue-500"/>
                    <h3 class="font-medium">Tendance poids</h3>
                  </div>
                  <div class="flex items-center gap-2">
                    <UIcon :name="weightTrend.icon" :class="weightTrend.color"/>
                    <span>{{ weightTrend.text }}</span>
                  </div>
                </div>

                <!-- Age Info -->
                <div class="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <div class="flex items-center gap-2 mb-2">
                    <UIcon name="i-heroicons-calendar" class="text-purple-500"/>
                    <h3 class="font-medium">Âge</h3>
                  </div>
                  <div class="text-lg font-medium">{{ displayAge(calculAge(selectedAnimal.birthDate)) }}</div>
                </div>
              </div>
            </div>
            <div v-else class="grid gap-4">
              <div v-for="animal in animalStore.animals" :key="animal.id"
                   class="flex items-center justify-between p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                <div class="flex items-center gap-2">
                  <UAvatar
                      :src="animal.avatarDisplay"
                      icon="i-fluent-animal-dog-16-regular"
                      :alt="animal.name"
                      size="sm"
                  />
                  <div>
                    <div class="font-medium">{{ animal.name }}</div>
                    <div class="text-xs text-neutral-500">{{ displayAge(calculAge(animal.birthDate)) }}</div>
                  </div>
                </div>
                <div class="flex gap-2">
                  <UBadge v-if="!isProtectionExpired(animal.fleaProtection)" color="green" variant="subtle">
                    <UIcon name="i-heroicons-bug-ant" class="mr-1"/>
                    Protégé
                  </UBadge>
                  <UBadge v-else color="red" variant="subtle">
                    <UIcon name="i-heroicons-bug-ant" class="mr-1"/>
                    Non protégé
                  </UBadge>

                  <UBadge v-if="!isProtectionExpired(animal.wormProtection)" color="green" variant="subtle">
                    <UIcon name="i-fluent-emoji-high-contrast-worm" class="mr-1"/>
                    Vermifugé
                  </UBadge>
                  <UBadge v-else color="red" variant="subtle">
                    <UIcon name="i-fluent-emoji-high-contrast-worm" class="mr-1"/>
                    Non vermifugé
                  </UBadge>
                </div>
              </div>
            </div>
          </DCard>

          <!-- Food Consumption Card -->
          <DCard>

            <div class="flex justify-between items-center">
              <h2 class="text-xl font-medium">Consommation de nourriture</h2>
            </div>

            <div v-if="selectedAnimal">
              <div class="space-y-4">
                <div class="flex justify-between items-center">
                  <div>
                    <div class="text-lg font-medium">{{ selectedAnimal.mealQuantity }}g</div>
                    <div class="text-sm text-neutral-500">par jour</div>
                  </div>
                  <div>
                    <div class="text-lg font-medium">{{ selectedAnimal.mealQuantity * 30 / 1000 }}kg</div>
                    <div class="text-sm text-neutral-500">par mois</div>
                  </div>
                  <div>
                    <div class="text-lg font-medium">{{ selectedAnimal.mealQuantity * 365 / 1000 }}kg</div>
                    <div class="text-sm text-neutral-500">par an</div>
                  </div>
                </div>

                <div v-if="selectedAnimal.food && selectedAnimal.food.length">
                  <h3 class="text-base font-medium mb-2">Stock actuel</h3>
                  <div class="space-y-2">
                    <div v-for="(item, index) in selectedAnimal.food.filter(f => f.state !== 'empty')" :key="index"
                         class="flex items-center justify-between p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                      <div class="flex items-center gap-2">
                        <UIcon :name="item.state === 'open' ? 'i-tabler-dog-bowl' : 'i-heroicons-archive-box'"
                               class="text-amber-500"/>
                        <div>
                          <div class="font-medium">{{ item.brand }}</div>
                          <div class="text-xs text-neutral-500">{{ item.quantity }}kg,
                            {{ item.state === 'open' ? 'Ouvert' : 'En stock' }}
                          </div>
                        </div>
                      </div>
                      <div v-if="item.state === 'open' && foodPercentage(item, selectedAnimal.mealQuantity)" class="w-24">
                        <UProgress :max="100" :model-value="Math.round(foodPercentage(item, selectedAnimal.mealQuantity).percentage)" color="primary"/>
                        <div class="text-xs text-center mt-1">
                          {{ Math.round((item.weight * (1 - foodPercentage(item, selectedAnimal.mealQuantity).percentage / 100)) * 10) / 10 }}kg
                          restant
                        </div>
                      </div>
                      <div v-else-if="item.state === 'stock'" class="text-sm font-medium text-amber-600">
                        {{ item.weight }} kg
                      </div>
                    </div>
                  </div>
                </div>
                <div v-else class="flex flex-col items-center justify-center py-4 text-neutral-500">
                  <UIcon name="i-tabler-dog-bowl" class="text-3xl mb-2"/>
                  <p>Aucune nourriture enregistrée</p>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="space-y-4">
                <div class="flex justify-between">
                  <div>
                    <div class="text-lg font-medium">{{ totalDailyFood }}g</div>
                    <div class="text-sm text-neutral-500">par jour (tous)</div>
                  </div>
                  <div>
                    <div class="text-lg font-medium">{{ totalDailyFood * 30 / 1000 }}kg</div>
                    <div class="text-sm text-neutral-500">par mois (tous)</div>
                  </div>
                  <div>
                    <div class="text-lg font-medium">{{ totalDailyFood * 365 / 1000 }}kg</div>
                    <div class="text-sm text-neutral-500">par an (tous)</div>
                  </div>
                </div>

                <h3 class="text-base font-medium">Répartition par animal</h3>
                <div class="space-y-2">
                  <div v-for="animal in animalStore.animals" :key="animal.id"
                       class="flex items-center justify-between p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                    <div class="flex items-center gap-2">
                      <UAvatar
                          :src="animal.avatarDisplay"
                          icon="i-fluent-animal-dog-16-regular"
                          :alt="animal.name"
                          size="sm"
                      />
                      <div>
                        <div class="font-medium">{{ animal.name }}</div>
                      </div>
                    </div>
                    <div class="text-amber-600 font-medium">
                      {{ animal.mealQuantity }}g / jour
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DCard>

          <!-- Next Treatments Card -->
          <DCard>
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-medium">Prochains traitements</h2>
            </div>
            <div class="space-y-2">
              <div v-for="treatment in upcomingTreatments" :key="treatment.id"
                   class="flex items-center justify-between p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800">
                <div class="flex items-center gap-2">
                  <UAvatar
                      :src="treatment.animal.avatarDisplay"
                      icon="i-fluent-animal-dog-16-regular"
                      :alt="treatment.animal.name"
                      size="sm"
                  />
                  <div>
                    <div class="font-medium">{{ treatment.animal.name }}</div>
                    <div class="text-xs text-neutral-500">{{ treatment.label }}</div>
                  </div>
                </div>
                <div :class="[treatment.urgent ? 'text-red-600' : 'text-amber-600']" class="font-medium">
                  {{ treatment.date }}
                </div>
              </div>
            </div>
            <div v-if="!upcomingTreatments.length"
                 class="flex flex-col items-center justify-center py-8 text-neutral-500">
              <UIcon name="i-heroicons-calendar-days" class="text-3xl mb-2"/>
              <p>Aucun traitement à venir</p>
            </div>
          </DCard>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getLocalTimeZone, parseDate, today, CalendarDate } from '@internationalized/date';
import DCard from '~/components/custom/DCard.vue';
import DStatsProtectionProgress from '~/components/custom/DStatsProtectionProgress.vue';
import DWeightChart from '~/components/custom/DWeightChart.vue';
import type { TabsItem } from '#ui/components/Tabs.vue';

definePageMeta({
  layout: 'authenticated'
})

const animalStore = useAnimalStore();
const selectedPet = ref('all');

const animalsItems = computed(() => [
  ...animalStore.animals.map(a => ({
    label: a.name,
    avatar: {src: a.avatarDisplay, icon: 'i-fluent-animal-dog-16-regular', size: 'sm'},
    value: a.id
  } as TabsItem)),
  {
    label: 'Tous les animaux',
    avatar: {icon: 'i-solar-users-group-rounded-bold', size: 'sm'},
    value:  'all'
  } as TabsItem])

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

// Weight data for charts
const weightData = computed(() => {
  if (selectedAnimal.value) {
    if (!selectedAnimal.value.weightHistory || selectedAnimal.value.weightHistory.length < 2) {
      return [];
    }

    return selectedAnimal.value.weightHistory
        .map(entry => ({
          date: typeof entry.date === 'string' ? entry.date : entry.date.toString(),
          weight: entry.weight,
          name: selectedAnimal.value.name
        }))
        .sort((a, b) => {
          try {
            const dateA = parseDate(a.date);
            const dateB = parseDate(b.date);
            return dateA.compare(dateB);
          } catch (e) {
            return 0;
          }
        });
  } else {
    // Combine weight data from all animals
    const allWeightData = [];
    for (const animal of animalStore.animals) {
      if (animal.weightHistory && animal.weightHistory.length) {
        const animalData = animal.weightHistory
            .map(entry => ({
              date: typeof entry.date === 'string' ? entry.date : entry.date.toString(),
              weight: entry.weight,
              name: animal.name
            }))
            .sort((a, b) => {
              try {
                const dateA = parseDate(a.date);
                const dateB = parseDate(b.date);
                return dateA.compare(dateB);
              } catch (e) {
                return 0;
              }
            });
        allWeightData.push(...animalData);
      }
    }
    return allWeightData;
  }
});

// Weight trend calculation
const weightTrend = computed(() => {
  if (!selectedAnimal.value || !selectedAnimal.value.weightHistory || selectedAnimal.value.weightHistory.length < 2) {
    return {icon: 'i-heroicons-minus', color: 'text-neutral-500', text: 'Pas assez de données'};
  }

  try {
    // Sort weight history by date
    const sortedWeights = [...selectedAnimal.value.weightHistory]
        .map(entry => ({
          ...entry,
          parsedDate: typeof entry.date === 'string' ? parseDate(entry.date) : entry.date
        }))
        .sort((a, b) => {
          if (!a.parsedDate || !b.parsedDate) {
            return 0;
          }
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
        text: `+${difference.toFixed(1)}kg (+${percentChange.toFixed(1)}%)`
      };
    } else {
      return {
        icon: 'i-heroicons-arrow-trending-down',
        color: 'text-green-500',
        text: `${difference.toFixed(1)}kg (${percentChange.toFixed(1)}%)`
      };
    }
  } catch (e) {
    console.error('Error calculating weight trend:', e);
    return {icon: 'i-heroicons-exclamation-triangle', color: 'text-amber-500', text: 'Erreur de calcul'};
  }
});

// Total daily food consumption (all animals)
const totalDailyFood = computed(() => {
  return animalStore.animals.reduce((sum, animal) => sum + (animal.mealQuantity || 0), 0);
});

// Check if protection is expired
const isProtectionExpired = (protection) => {
  if (!protection || !protection.end) {
    return true;
  }

  const td = today(getLocalTimeZone());
  try {
    return parseDate(protection.end).compare(td) <= 0;
  } catch (e) {
    console.error('Error checking protection expiration:', e);
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
    if (a.expired && !b.expired) {
      return -1;
    }
    if (!a.expired && b.expired) {
      return 1;
    }
    return a.sortValue - b.sortValue;
  });
});

const displayAge = (a) => {
  return ageToString(a);
};
</script>