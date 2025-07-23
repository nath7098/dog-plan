<template>
  <div class="min-h-screen">
    <!-- Header Section -->
    <div class="p-4 sm:p-6 lg:p-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-8">
          <h1 class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            <UIcon name="i-tabler-paw" class="inline-block text-amber-500 mr-3" />
            Mes Compagnons
          </h1>
          <p class="text-lg text-gray-600 dark:text-gray-300">Prenez soin de vos amis à quatre pattes</p>
        </div>

        <!-- Quick Stats Bar -->
        <div v-if="!animalStore.loading && animalStore.animals.length" class="mb-8">
          <UCard class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200/50 dark:border-amber-800/50">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">{{ animalStore.animals.length }}</div>
                <div class="text-sm text-amber-700 dark:text-amber-300">Compagnon{{ animalStore.animals.length > 1 ? 's' : '' }}</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-red-600 dark:text-red-400">{{ criticalAlerts }}</div>
                <div class="text-sm text-red-700 dark:text-red-300">Alerte{{ criticalAlerts > 1 ? 's' : '' }}</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-green-600 dark:text-green-400">{{ healthyPets }}</div>
                <div class="text-sm text-green-700 dark:text-green-300">En bonne santé</div>
              </div>
              <div>
                <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">{{ totalWeight.toFixed(1) }}kg</div>
                <div class="text-sm text-blue-700 dark:text-blue-300">Poids total</div>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Loading State -->
        <div v-if="animalStore.loading" class="text-center py-12">
          <UIcon name="i-heroicons-arrow-path" class="animate-spin text-amber-500 text-4xl mb-4" />
          <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">Chargement en cours...</h3>
          <p class="text-gray-500 dark:text-gray-400">Récupération de vos compagnons</p>
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

        <!-- Pets Grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <!-- Add New Pet Card -->
          <NuxtLink to="/nouveau" class="group">
            <UCard class="h-full transition-all duration-300 hover:scale-105 hover:shadow-xl border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-amber-400 dark:hover:border-amber-500">
              <div class="flex flex-col items-center justify-center py-12 text-center">
                <div class="w-16 h-16 mb-4 rounded-full bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center group-hover:bg-amber-200 dark:group-hover:bg-amber-800/30 transition-colors">
                  <UIcon name="i-heroicons-plus" class="text-2xl text-amber-600 dark:text-amber-400" />
                </div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Nouveau compagnon</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">Ajouter un ami à quatre pattes</p>
              </div>
            </UCard>
          </NuxtLink>

          <!-- Pet Cards -->
          <NuxtLink 
            v-for="animal in animalStore.animals" 
            :key="animal.id" 
            :to="`/${animal.name}`"
            class="group"
          >
            <UCard class="h-full transition-all duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden">
              <!-- Alert Badge -->
              <div v-if="getAnimalAlerts(animal).length" class="absolute top-3 right-3 z-10">
                <UBadge 
                  :color="getHighestAlertLevel(animal) === 'danger' ? 'red' : getHighestAlertLevel(animal) === 'warning' ? 'amber' : 'blue'"
                  variant="solid"
                  size="sm"
                >
                  {{ getAnimalAlerts(animal).length }}
                </UBadge>
              </div>

              <!-- Pet Avatar and Header -->
              <div class="text-center mb-4">
                <UAvatar
                  :src="animal.avatarDisplay"
                  :alt="animal.name"
                  size="xl"
                  class="mx-auto mb-3 ring-4 ring-white dark:ring-gray-800 shadow-lg"
                  :ui="{ 
                    wrapper: 'relative inline-flex items-center justify-center flex-shrink-0',
                    background: 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20'
                  }"
                />
                <div class="flex items-center justify-center gap-2 mb-2">
                  <h3 class="text-xl font-bold text-gray-900 dark:text-white">{{ animal.name }}</h3>
                  <UIcon
                    :name="animal.gender === 'male' ? 'i-heroicons-user' : 'i-heroicons-user'"
                    :class="animal.gender === 'male' ? 'text-blue-500' : 'text-pink-500'"
                  />
                </div>
                <div class="flex items-center justify-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                  <span class="flex items-center gap-1">
                    <UIcon name="i-heroicons-calendar-days" class="text-xs" />
                    {{ displayAge(age(animal.birthDate)) }}
                  </span>
                  <span class="flex items-center gap-1">
                    <UIcon name="i-heroicons-scale" class="text-xs" />
                    {{ animal.weight }}kg
                  </span>
                </div>
              </div>

              <!-- Health Status Grid -->
              <div class="grid grid-cols-2 gap-2 mb-4">
                <div class="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <UIcon 
                    name="i-heroicons-bug-ant" 
                    :class="getProtectionStatus(animal.fleaProtection)" 
                    size="sm"
                  />
                  <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Anti-puces</span>
                </div>
                <div class="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <UIcon 
                    name="i-heroicons-beaker" 
                    :class="getProtectionStatus(animal.wormProtection)" 
                    size="sm"
                  />
                  <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Vermifuge</span>
                </div>
                <div class="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <UIcon 
                    name="i-heroicons-cake" 
                    :class="getFoodStatusClass(animal)" 
                    size="sm"
                  />
                  <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Nourriture</span>
                </div>
                <div class="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                  <UIcon 
                    name="i-heroicons-heart" 
                    :class="getWeightStatusClass(animal)" 
                    size="sm"
                  />
                  <span class="text-xs font-medium text-gray-700 dark:text-gray-300">Poids</span>
                </div>
              </div>

              <!-- Quick Actions -->
              <div class="flex gap-2">
                <UButton 
                  size="sm" 
                  variant="soft" 
                  color="amber" 
                  block
                  class="group-hover:bg-amber-100 dark:group-hover:bg-amber-900/30"
                >
                  Voir détails
                </UButton>
              </div>
            </UCard>
          </NuxtLink>
        </div>

        <!-- Empty State -->
        <div v-if="!animalStore.loading && !animalStore.error && !animalStore.animals.length" class="text-center py-16">
          <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <UIcon name="i-tabler-paw" class="text-4xl text-gray-400" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Aucun compagnon pour le moment</h3>
          <p class="text-gray-500 dark:text-gray-400 mb-6">Commencez par ajouter votre premier ami à quatre pattes</p>
          <UButton to="/nouveau" size="lg" color="amber">
            <UIcon name="i-heroicons-plus" class="mr-2" />
            Ajouter un compagnon
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getLocalTimeZone, parseDate, today } from '@internationalized/date';

definePageMeta({
  layout: 'authenticated'
})

type AnimalInfo = {
  level: 'info' | 'warning' | 'danger';
  icon?: string;
  text: string;
}

const animalStore = useAnimalStore();

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

// Computed properties for stats
const criticalAlerts = computed(() => {
  return animalStore.animals.reduce((count, animal) => {
    const alerts = getAnimalAlerts(animal);
    return count + alerts.filter(alert => alert.level === 'danger').length;
  }, 0);
});

const healthyPets = computed(() => {
  return animalStore.animals.filter(animal => {
    const alerts = getAnimalAlerts(animal);
    return alerts.filter(alert => alert.level === 'danger').length === 0;
  }).length;
});

const totalWeight = computed(() => {
  return animalStore.animals.reduce((total, animal) => {
    return total + (animal.weight || 0);
  }, 0);
});

// Helper functions
const age = (bd) => {
  return calculAge(bd);
};

const displayAge = (a) => {
  return ageToString(a);
};

const isProtectionExpired = (protection) => {
  if (!protection || !protection.end) return true;
  const td = today(getLocalTimeZone());
  try {
    return parseDate(protection.end).compare(td) <= 0;
  } catch (e) {
    console.error("Error checking protection expiration:", e);
    return true;
  }
};

const getProtectionStatus = (protection) => {
  if (isProtectionExpired(protection)) {
    return 'text-red-500';
  }
  return 'text-green-500';
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

const isWeightRecent = (animal) => {
  if (!animal.weight || !animal.weightHistory?.length) return false;
  const td = today(getLocalTimeZone());
  try {
    const sortedWeightHistory = [...animal.weightHistory]
        .map(entry => ({
          ...entry,
          parsedDate: typeof entry.date === 'string' ? parseDate(entry.date) : entry.date
        }))
        .sort((a, b) => {
          if (!a.parsedDate || !b.parsedDate) return 0;
          return a.parsedDate.compare(b.parsedDate) > 0 ? 1 : -1;
        });
    const lastWeight = sortedWeightHistory[sortedWeightHistory.length - 1];
    if (lastWeight && lastWeight.parsedDate) {
      return td.compare(lastWeight.parsedDate) < 60;
    }
  } catch (e) {
    console.error("Error processing weight history:", e);
  }
  return false;
};

const getWeightStatusClass = (animal) => {
  if (!animal.weight) return 'text-red-500';
  return isWeightRecent(animal) ? 'text-green-500' : 'text-amber-500';
};

const getHighestAlertLevel = (animal) => {
  const alerts = getAnimalAlerts(animal);
  if (alerts.some(alert => alert.level === 'danger')) return 'danger';
  if (alerts.some(alert => alert.level === 'warning')) return 'warning';
  return 'info';
};

const getAnimalAlerts = (animal) => {
  if (!animal) return [];
  const td = today(getLocalTimeZone());
  const alerts: AnimalInfo[] = [];

  // Food alerts
  if (!animal.food?.length) {
    alerts.push({level: 'danger', icon: 'i-heroicons-cake', text: `${animal.name} n'a plus de croquettes`});
  }

  if (animal.food) {
    const stockFood = animal.food.find(f => f.state === 'stock');
    const openFood = animal.food.find(f => f.state === 'open');
    if (!stockFood && openFood && foodPercentage(openFood)?.percentage >= 90) {
      alerts.push({level: 'warning', icon: 'i-heroicons-cake', text: `${animal.name} n'a bientôt plus de croquettes`});
    } else if (!stockFood && openFood && foodPercentage(openFood)?.percentage >= 70 && foodPercentage(openFood)?.percentage < 90) {
      alerts.push({level: 'info', icon: 'i-heroicons-cake', text: `Pensez à prévoir des croquettes pour ${animal.name}`});
    }
  }

  // Weight alerts
  if (!animal.weight) {
    alerts.push({level: 'danger', icon: 'i-heroicons-heart', text: `${animal.name} n'a pas de poids renseigné`});
  }

  // Weight history
  if (animal.weightHistory?.length) {
    try {
      const sortedWeightHistory = [...animal.weightHistory]
          .map(entry => ({
            ...entry,
            parsedDate: typeof entry.date === 'string' ? parseDate(entry.date) : entry.date
          }))
          .sort((a, b) => {
            if (!a.parsedDate || !b.parsedDate) return 0;
            return a.parsedDate.compare(b.parsedDate) > 0 ? 1 : -1;
          });
      const lastWeight = sortedWeightHistory[sortedWeightHistory.length - 1];
      if (lastWeight && lastWeight.parsedDate) {
        const compare = td.compare(lastWeight.parsedDate)
        if (compare >= 365) {
          alerts.push({level: 'danger', icon: 'i-heroicons-heart', text: `${animal.name} n'a pas de poids renseigné depuis plus de 1 an`});
        } else if (compare >= 187) {
          alerts.push({level: 'warning', icon: 'i-heroicons-heart', text: `${animal.name} n'a pas de poids renseigné depuis plus de 6 mois`});
        } else if (compare >= 60) {
          alerts.push({level: 'info', icon: 'i-heroicons-heart', text: `${animal.name} n'a pas de poids renseigné depuis plus de 2 mois`});
        }
      }
    } catch (e) {
      console.error("Error processing weight history:", e);
    }
  }

  // Protection alerts
  try {
    if (!animal.fleaProtection || !animal.fleaProtection.start ||
        !animal.fleaProtection.end ||
        parseDate(animal.fleaProtection.end).compare(td) <= 0) {
      alerts.push({level: 'danger', icon: 'i-heroicons-bug-ant', text: `${animal.name} n'est plus protégé contre les puces et les tiques`});
    } else if (parseDate(animal.fleaProtection.end).compare(td.add({days: 7})) <= 0) {
      alerts.push({level: 'warning', icon: 'i-heroicons-bug-ant', text: `${animal.name} ne sera bientôt plus protégé contre les puces et les tiques`});
    }
  } catch (e) {
    console.error("Error processing flea protection:", e);
  }

  try {
    if (!animal.wormProtection || !animal.wormProtection.start ||
        !animal.wormProtection.end ||
        parseDate(animal.wormProtection.end).compare(td) <= 0) {
      alerts.push({level: 'danger', icon: 'i-heroicons-beaker', text: `${animal.name} n'est plus vermifugé`});
    } else if (parseDate(animal.wormProtection.end).compare(td.add({days: 7})) <= 0) {
      alerts.push({level: 'warning', icon: 'i-heroicons-beaker', text: `${animal.name} ne sera bientôt plus vermifugé`});
    }
  } catch (e) {
    console.error("Error processing worm protection:", e);
  }

  return alerts;
};
</script>

<style>
/* Add any custom styles if needed */
</style>