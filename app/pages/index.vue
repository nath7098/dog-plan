<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-slate-800 mb-2">Mes Compagnons</h1>
        <p class="text-slate-500">Gérez vos amis à quatre pattes</p>
      </div>

      <!-- Loading and Error States -->
      <div v-if="animalStore.loading" class="text-center py-6">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin text-blue-500 text-2xl" />
        <p class="mt-2 text-slate-600">Chargement de vos animaux...</p>
      </div>

      <div v-else-if="animalStore.error" class="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
        <div class="flex items-center">
          <UIcon name="i-heroicons-exclamation-circle" class="text-red-500 mr-2" />
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

      <!-- Cards Container with Grid Layout -->
      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- New Pet Card -->
        <UButton variant="ghost" to="nouveau" class="group h-full">
          <div class="bg-white w-full rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden h-full p-6">
            <div class="flex items-center gap-6">
              <div class="bg-blue-50 rounded-full p-6 group-hover:bg-blue-100 transition-colors">
                <UIcon name="i-heroicons-plus" class="text-blue-500 text-3xl" />
              </div>
              <div>
                <h3 class="text-xl font-medium text-slate-700">Ajouter un animal</h3>
                <p class="text-slate-500 text-sm">Enregistrer un nouveau compagnon</p>
              </div>
            </div>
          </div>
        </UButton>

        <!-- Animal Cards -->
        <UButton 
          v-for="animal in animalStore.animals" 
          :key="animal.name" 
          :to="animal.name" 
          variant="ghost" 
          class="group h-full"
        >
          <div class="bg-white w-full rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-200 transition-all duration-300 overflow-hidden h-full">
            <div class="relative">
              <!-- Banner Background - Dog/Cat/Pet themed background -->
              <div class="h-24 bg-gradient-to-r from-blue-200 to-indigo-100"></div>

              <!-- Avatar, positioned to overlay the banner -->
              <div class="absolute -bottom-10 left-6">
                <UAvatar
                    :src="animal.avatar"
                    icon="i-fluent-animal-dog-16-regular"
                    :alt="animal.name"
                    size="2xl"
                    class="ring-4 ring-white shadow-md"
                />
              </div>
            </div>

            <!-- Content -->
            <div class="mt-12 p-6">
              <div class="flex justify-between items-start">
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="text-xl font-medium text-slate-800">{{ animal.name }}</h3>
                    <UIcon
                        :name="animal.gender === 'male' ? 'i-ic-baseline-male' : 'i-ic-baseline-female'"
                        :class="[animal.gender === 'male' ? 'text-blue-500' : 'text-pink-500']"
                    />
                  </div>
                  <div class="text-slate-500 mt-1 flex items-center gap-4">
                    <span class="flex items-center">
                      <UIcon name="i-heroicons-calendar" class="mr-1 text-slate-400" size="sm" />
                      {{ displayAge(age(animal.birthDate)) }}
                    </span>
                    <span class="flex items-center">
                      <UIcon name="i-heroicons-scale" class="mr-1 text-slate-400" size="sm" />
                      {{ animal.weight }} kg
                    </span>
                  </div>
                </div>

                <!-- Alerts -->
                <div v-if="getAnimalAlerts(animal).length" class="flex flex-wrap gap-2 justify-end">
                  <UBadge
                      v-for="(alerte, idx) in getAnimalAlerts(animal)"
                      :key="`${animal.name}-alert-${idx}`"
                      :color="alerte.level === 'danger' ? 'error' : (alerte.level === 'warning' ? 'warning' : 'info')"
                      variant="subtle"
                      class="cursor-help"
                  >
                    <UTooltip :text="alerte.text">
                      <div class="flex items-center">
                        <UIcon
                            :name="alerte.icon ?? 'i-heroicons-exclamation-triangle'"
                            class="mr-1"
                            size="sm"
                        />
                        <span class="hidden sm:inline">{{ alerte.level === 'danger' ? 'Urgent' : (alerte.level === 'warning' ? 'Attention' : 'Info') }}</span>
                      </div>
                    </UTooltip>
                  </UBadge>
                </div>
              </div>

              <!-- Health Status Indicators -->
              <div class="mt-4 grid grid-cols-2 gap-2">
                <!-- Flea Protection -->
                <div class="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                  <UIcon name="i-heroicons-bug-ant" size="sm" :class="[
                    !animal.fleaProtection || !animal.fleaProtection.end ||
                    isProtectionExpired(animal.fleaProtection) ? 'text-red-500' : 'text-green-500'
                  ]" />
                  <span class="text-xs text-slate-600">Protection anti-puces</span>
                </div>

                <!-- Worm Protection -->
                <div class="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                  <UIcon name="i-fluent-emoji-high-contrast-worm" size="sm" :class="[
                    !animal.wormProtection || !animal.wormProtection.end ||
                    isProtectionExpired(animal.wormProtection) ? 'text-red-500' : 'text-green-500'
                  ]" />
                  <span class="text-xs text-slate-600">Vermifuge</span>
                </div>

                <!-- Food Status -->
                <div class="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                  <UIcon name="i-tabler-dog-bowl" size="sm" :class="[
                    !animal.food?.length ? 'text-red-500' :
                    getFoodStatus(animal) === 'low' ? 'text-amber-500' : 'text-green-500'
                  ]" />
                  <span class="text-xs text-slate-600">Nourriture</span>
                </div>

                <!-- Weight Status -->
                <div class="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                  <UIcon name="i-healthicons-weight-outline" size="sm" :class="[
                    !animal.weight ? 'text-red-500' :
                    isWeightRecent(animal) ? 'text-green-500' : 'text-amber-500'
                  ]" />
                  <span class="text-xs text-slate-600">Poids</span>
                </div>
              </div>
            </div>
          </div>
        </UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getLocalTimeZone, parseDate, today } from '@internationalized/date';

definePageMeta({
  middleware: 'auth'
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

const age = (bd) => {
  return calculAge(bd);
};

const displayAge = (a) => {
  return ageToString(a);
};

// Helper functions for the new UI
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

const getFoodStatus = (animal) => {
  if (!animal.food?.length) return 'empty';

  const stockFood = animal.food.find(f => f.state === 'stock');
  const openFood = animal.food.find(f => f.state === 'open');

  if (!stockFood && openFood && foodPercentage(openFood)?.percentage >= 70) {
    return 'low';
  }

  return 'ok';
};

const isWeightRecent = (animal) => {
  if (!animal.weight || !animal.weightHistory?.length) return false;

  const td = today(getLocalTimeZone());

  try {
    // Create a copy of the array before sorting to avoid modifying the original
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

const getAnimalAlerts = (animal) => {
  if (!animal) {
    return [];
  }

  const td = today(getLocalTimeZone());
  const alerts: AnimalInfo[] = [];

  // Food alerts
  if (!animal.food?.length) {
    alerts.push({level: 'danger', icon: 'i-tabler-dog-bowl', text: `${animal.name} n'a plus de croquettes`});
  }

  if (animal.food) {
    const stockFood = animal.food.find(f => f.state === 'stock');
    const openFood = animal.food.find(f => f.state === 'open');

    if (!stockFood && openFood && foodPercentage(openFood)?.percentage >= 90) {
      alerts.push({level: 'warning', icon: 'i-tabler-dog-bowl', text: `${animal.name} n'a bientôt plus de croquettes`});
    } else if (!stockFood && openFood && foodPercentage(openFood)?.percentage >= 70 && foodPercentage(openFood)?.percentage < 90) {
      alerts.push({level: 'info', icon: 'i-tabler-dog-bowl', text: `Pensez a prévoire des croquettes pour ${animal.name}`});
    }
  }

  // Weight alerts
  if (!animal.weight) {
    alerts.push({level: 'danger', icon: 'i-healthicons-weight-outline', text: `${animal.name} n'a pas de poids renseigné`});
  }

  // Weight history
  if (animal.weightHistory?.length) {
    try {
      // Create a copy of the array before sorting to avoid modifying the original
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
          alerts.push({level: 'danger', icon: 'i-healthicons-weight-outline', text: `${animal.name} n'a pas de poids renseigné depuis plus de 1 an`});
        } else if (compare >= 187) {
          alerts.push({level: 'warning', icon: 'i-healthicons-weight-outline', text: `${animal.name} n'a pas de poids renseigné depuis plus de 6 mois`});
        } else if (compare >= 60) {
          alerts.push({level: 'info', icon: 'i-healthicons-weight-outline', text: `${animal.name} n'a pas de poids renseigné depuis plus de 2 mois`});
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
      alerts.push({level: 'danger', icon: 'i-fluent-emoji-high-contrast-worm', text: `${animal.name} n'est plus vermifugé`});
    } else if (parseDate(animal.wormProtection.end).compare(td.add({days: 7})) <= 0) {
      alerts.push({level: 'warning', icon: 'i-fluent-emoji-high-contrast-worm', text: `${animal.name} ne sera bientôt plus vermifugé`});
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