<template>
  <div class="min-h-screen p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Hero Header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center gap-3 mb-4">
          <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Calendrier Intelligent
          </h1>
        </div>
        <p class="text-neutral-600 dark:text-neutral-400 text-lg">
          Votre assistant personnel pour le bien-être de vos compagnons
        </p>
      </div>

      <!-- Loading State -->
      <div v-if="animalStore.loading" class="flex flex-col items-center justify-center py-20">
        <div class="relative">
          <div class="w-16 h-16 border-4 border-amber-200 rounded-full animate-spin border-t-amber-500"></div>
          <UIcon name="i-heroicons-heart" class="absolute inset-0 m-auto text-amber-500 text-xl"/>
        </div>
        <p class="mt-4 text-neutral-600 dark:text-neutral-400">Synchronisation en cours...</p>
      </div>

      <!-- Empty State -->
      <div v-else-if="!animalStore.animals.length" class="text-center py-20">
        <div
            class="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <UIcon name="i-fluent-animal-dog-16-regular" class="text-4xl text-amber-600"/>
        </div>
        <h2 class="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-3">
          Commencez votre aventure
        </h2>
        <p class="text-neutral-600 dark:text-neutral-400 mb-6 max-w-md mx-auto">
          Ajoutez vos compagnons pour découvrir un calendrier intelligent qui s'adapte à leurs besoins
        </p>
        <UButton to="/nouveau" size="lg" color="amber" class="shadow-lg">
          <UIcon name="i-heroicons-plus"/>
          Ajouter mon premier compagnon
        </UButton>
      </div>

      <div v-else class="space-y-6">
        <!-- Smart Alerts Banner -->
        <div v-if="criticalAlerts.length"
             class="relative overflow-hidden rounded-2xl ring-2 ring-red-500/80 bg-red-500/20 backdrop-blur-md p-6 text-white shadow-xl">
          <div class="absolute inset-0 bg-black/10"></div>
          <div class="relative">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <UIcon name="i-heroicons-exclamation-triangle" class="text-xl"/>
              </div>
              <h3 class="text-xl font-bold">Action requise</h3>
            </div>
            <div class="grid gap-2">
              <div v-for="alert in criticalAlerts.slice(0, 2)" :key="alert.id"
                   class="flex items-center gap-3 bg-white/10 rounded-lg p-3">
                <UAvatar :src="alert.animal.avatarDisplay" size="sm"/>
                <div class="flex-1">
                  <div class="font-medium">{{ alert.animal.name }}</div>
                  <div class="text-sm opacity-90">{{ alert.description }}</div>
                </div>
                <div class="text-sm font-medium">{{ alert.status }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline View -->
        <DCard class=" flex flex-col px-6 md:px-12 max-h-screen overflow-hidden">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl md:text-2xl font-bold text-neutral-800 dark:text-neutral-200">
              {{ selectedPeriodDisplay }}
            </h2>
            <div class="flex gap-2">
              <UButton
                  v-for="period in periods"
                  :key="period.value"
                  :variant="selectedPeriod === period.value ? 'link' : 'ghost'"
                  color="neutral"
                  :class="[selectedPeriod === period.value ? 'text-amber-500! dark:text-amber-400!' : 'text-neutral-900! dark:text-neutral-100!']"

                  size="sm"
                  @click="selectedPeriod = period.value"
              >
                {{ period.label }}
              </UButton>
            </div>
          </div>

          <!-- Timeline -->
          <div class="relative space-y-4 mb-6 px-6 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-neutral-100/50 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-amber-300/70 dark:[&::-webkit-scrollbar-track]:bg-neutral-700/50 dark:[&::-webkit-scrollbar-thumb]:bg-amber-500/70">
            <div v-for="day in timelineDays" :key="day.date"
                 class="relative group">
              <!-- Day Header -->
              <div class="flex items-center gap-4 mb-3">
                <div :class="[
                  'flex-shrink-0 w-12 h-12 rounded-full flex flex-col items-center justify-center text-sm font-medium transition-all',
                  day.isToday
                    ? 'bg-amber-400 text-white shadow-lg'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
                ]">
                  <div class="text-xs">{{ day.dayName }}</div>
                  <div class="font-bold">{{ day.dayNumber }}</div>
                </div>
                <USeparator :ui="{label: 'text-lg font-medium'}" :label="day.dayNumber === 1 ? formatMonthName(day.date) : undefined" />
                <div class="hidden md:block text-sm text-neutral-500">
                  {{ day.events.length }} événement{{ day.events.length !== 1 ? 's' : '' }}
                </div>
                <div class="md:hidden block shrink-0 text-sm text-neutral-500">
                  {{ day.events.length }} event{{ day.events.length !== 1 ? 's' : '' }}
                </div>
              </div>

              <!-- Events -->
              <div class="md:ml-16 space-y-2">
                <div v-if="!day.events.length"
                     class="text-neutral-400 dark:text-neutral-600 text-sm italic py-2">
                  Journée tranquille 🌿
                </div>
                <div v-for="event in day.events" :key="event.id"
                     :class="[
                       'flex items-center gap-2 md:gap-4 p-2 md:p-4 rounded-xl transition-all hover:shadow-md cursor-pointer group/event',
                       getEventBackground(event)
                     ]">
                  <!-- Animal Avatar -->
                  <div class="relative">
                    <UAvatar :src="event.animal.avatarDisplay" size="md"/>
                    <div :class="[
                      'absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs',
                      getEventIconBackground(event)
                    ]">
                      <UIcon :name="event.icon" class="text-xs"/>
                    </div>
                  </div>

                  <!-- Event Details -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                      <h4 class="font-medium text-neutral-800 dark:text-neutral-200 truncate">
                        {{ event.animal.name }}
                      </h4>
                      <div :class="[
                        'px-2 py-1 rounded-full text-xs font-medium',
                        getEventStatusColor(event)
                      ]">
                        {{ event.status }}
                      </div>
                    </div>
                    <p class="text-sm text-neutral-600 dark:text-neutral-400 truncate">
                      {{ event.description }}
                    </p>
                  </div>

                  <!-- Action Button -->
                  <UButton
                      size="sm"
                      variant="ghost"
                      color="gray"
                      class="opacity-0 group-hover/event:opacity-100 transition-opacity"
                  >
                    <UIcon name="i-heroicons-chevron-right"/>
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </DCard>

        <!-- Quick Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Total Animals -->
          <div
              class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-2xl p-6 border border-blue-200/50 dark:border-blue-800/50">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <UIcon name="i-fluent-animal-dog-16-regular" class="text-2xl text-white"/>
              </div>
              <div>
                <div class="text-2xl font-bold text-blue-800 dark:text-blue-300">
                  {{ animalStore.animals.length }}
                </div>
                <div class="text-sm text-blue-600 dark:text-blue-400">
                  Compagnon{{ animalStore.animals.length !== 1 ? 's' : '' }}
                </div>
              </div>
            </div>
          </div>

          <!-- Upcoming Events -->
          <div
              class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50 rounded-2xl p-6 border border-amber-200/50 dark:border-amber-800/50">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                <UIcon name="i-heroicons-calendar-days" class="text-2xl text-white"/>
              </div>
              <div>
                <div class="text-2xl font-bold text-amber-800 dark:text-amber-300">
                  {{ upcomingEventsCount }}
                </div>
                <div class="text-sm text-amber-600 dark:text-amber-400">
                  À venir
                </div>
              </div>
            </div>
          </div>

          <!-- Critical Items -->
          <div
              class="bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/50 dark:to-pink-950/50 rounded-2xl p-6 border border-red-200/50 dark:border-red-800/50">
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                <UIcon name="i-heroicons-exclamation-triangle" class="text-2xl text-white"/>
              </div>
              <div>
                <div class="text-2xl font-bold text-red-800 dark:text-red-300">
                  {{ criticalAlerts.length }}
                </div>
                <div class="text-sm text-red-600 dark:text-red-400">
                  Urgent{{ criticalAlerts.length !== 1 ? 's' : '' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Animals Quick Access -->
        <div
            class="bg-white dark:bg-neutral-900 rounded-2xl p-6 shadow-sm border border-neutral-200 dark:border-neutral-800">
          <h3 class="text-xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
            Vos compagnons
          </h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <NuxtLink
                v-for="animal in animalStore.animals"
                :key="animal.id"
                :to="`/${animal.name}`"
                class="group flex flex-col items-center p-4 rounded-xl hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-all"
            >
              <div class="relative mb-3">
                <UAvatar :src="animal.avatarDisplay" size="xl"/>
                <div v-if="getAnimalNextEvent(animal)"
                     :class="[
                       'absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-neutral-900',
                       getAnimalStatusColor(animal)
                     ]">
                </div>
              </div>
              <div class="text-center">
                <div
                    class="font-medium text-neutral-800 dark:text-neutral-200 group-hover:text-amber-600 transition-colors">
                  {{ animal.name }}
                </div>
                <div class="text-xs text-neutral-500 mt-1">
                  {{ animal.weight }}kg • {{ calculateAge(animal.birthDate) }}
                </div>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getLocalTimeZone, parseDate, today, CalendarDate, getDayOfWeek } from '@internationalized/date';
import DCard from '@/components/custom/DCard.vue'
import { capitalize } from '@vue/shared';

definePageMeta({
  layout: 'authenticated'
})

const animalStore = useAnimalStore();
const selectedPeriod = ref('week');

const periods = [
  {label: '7j', value: 'week', fullLabel: 'Prochains 7 jours'},
  {label: '30j', value: 'month', fullLabel: 'Prochains 30 jours'},
  {label: 'Tout', value: 'all', fullLabel: 'Tout'}
];

const selectedPeriodDisplay = computed(() => periods.find(p => p.value === selectedPeriod.value)?.fullLabel!);

onMounted(async () => {
  if (!animalStore.animals.length) {
    await animalStore.fetchAnimals();
  }
});

// Generate all events
const allEvents = computed(() => {
  const events = [];
  const td = today(getLocalTimeZone());

  for (const animal of animalStore.animals) {
    // Flea protection
    if (animal.fleaProtection?.end) {
      try {
        const endDate = parseDate(animal.fleaProtection.end);
        const daysDiff = endDate.compare(td);

        events.push({
          id: `flea-${animal.id}`,
          date: endDate,
          animal: animal,
          type: 'flea-protection',
          title: 'Anti-puces',
          description: 'Protection anti-puces expire',
          icon: 'i-heroicons-bug-ant',
          isOverdue: daysDiff < 0,
          isUrgent: daysDiff >= 0 && daysDiff <= 3,
          isUpcoming: daysDiff > 3 && daysDiff <= 14,
          status: daysDiff < 0 ? 'Expiré' : daysDiff === 0 ? 'Aujourd\'hui' : `J-${daysDiff}`,
          priority: daysDiff < 0 ? 1 : daysDiff <= 3 ? 2 : 3,
          sortValue: daysDiff
        });
      } catch (e) {
        console.error('Error processing flea date:', e);
      }
    }

    // Worm protection
    if (animal.wormProtection?.end) {
      try {
        const endDate = parseDate(animal.wormProtection.end);
        const daysDiff = endDate.compare(td);

        events.push({
          id: `worm-${animal.id}`,
          date: endDate,
          animal: animal,
          type: 'worm-protection',
          title: 'Vermifuge',
          description: 'Protection vermifuge expire',
          icon: 'i-fluent-emoji-high-contrast-worm',
          isOverdue: daysDiff < 0,
          isUrgent: daysDiff >= 0 && daysDiff <= 3,
          isUpcoming: daysDiff > 3 && daysDiff <= 14,
          status: daysDiff < 0 ? 'Expiré' : daysDiff === 0 ? 'Aujourd\'hui' : `J-${daysDiff}`,
          priority: daysDiff < 0 ? 1 : daysDiff <= 3 ? 2 : 3,
          sortValue: daysDiff
        });
      } catch (e) {
        console.error('Error processing worm date:', e);
      }
    }

    // Food management
    const openFood = animal.food?.find(f => f.state === 'open');
    if (openFood) {
      try {
        const estimateDays = Math.floor(openFood.weight * 1000 / animal.mealQuantity);
        const estimateEnd = parseDate(openFood.openDate).add({days: estimateDays});
        const daysDiff = estimateEnd.compare(td);

        events.push({
          id: `food-${animal.id}`,
          date: estimateEnd,
          animal: animal,
          type: 'food',
          title: 'Croquettes',
          description: 'Stock de croquettes épuisé',
          icon: 'i-tabler-dog-bowl',
          isOverdue: daysDiff < 0,
          isUrgent: daysDiff >= 0 && daysDiff <= 2,
          isUpcoming: daysDiff > 2 && daysDiff <= 7,
          status: daysDiff < 0 ? 'Épuisé' : daysDiff === 0 ? 'Aujourd\'hui' : `J-${daysDiff}`,
          priority: daysDiff < 0 ? 1 : daysDiff <= 2 ? 2 : 3,
          sortValue: daysDiff
        });
      } catch (e) {
        console.error('Error processing food date:', e);
      }
    }
  }

  return events.sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return a.date.compare(b.date);
  });
});

// Timeline days
const timelineDays = computed(() => {
  const td = today(getLocalTimeZone());
  const days = [];
  const daysToShow = selectedPeriod.value === 'week' ? 7 : selectedPeriod.value === 'month' ? 30 : 90;

  for (let i = 0; i < daysToShow; i++) {
    const date = td.add({days: i});
    const dayEvents = allEvents.value.filter(event => event.date.compare(date) === 0);

    days.push({
      date: date.toString(),
      dayName: formatDayName(date),
      dayNumber: date.day,
      isToday: i === 0,
      events: dayEvents
    });
  }

  return days;
});

// Critical alerts
const criticalAlerts = computed(() => {
  return allEvents.value.filter(event => event.isOverdue || event.isUrgent);
});

// Upcoming events count
const upcomingEventsCount = computed(() => {
  return allEvents.value.filter(event => event.isUpcoming || event.isUrgent).length;
});

// Helper functions
const formatDayName = (date: CalendarDate) => {
  return date.toDate(getLocalTimeZone()).toLocaleDateString('fr-FR', {weekday: 'short'})
};

const formatMonthName = (date: string) => {
  return capitalize(parseDate(date).toDate(getLocalTimeZone()).toLocaleDateString('fr-FR', {month: 'long', day: undefined, year: undefined}));
}

const calculateAge = (birthDate: string) => {
  if (!birthDate) {
    return 'N/A';
  }
  const birth = parseDate(birthDate);
  const now = today(getLocalTimeZone());
  const years = now.year - birth.year;
  const months = now.month - birth.month;

  if (years > 1) {
    return `${years} ans`;
  }
  if (years === 1) {
    return '1 an';
  }
  if (months > 1) {
    return `${months} mois`;
  }
  return 'Bébé';
};

const getAnimalNextEvent = (animal) => {
  return allEvents.value.find(event => event.animal.id === animal.id);
};

const getAnimalStatusColor = (animal) => {
  const nextEvent = getAnimalNextEvent(animal);
  if (!nextEvent) {
    return 'bg-green-500';
  }
  if (nextEvent.isOverdue) {
    return 'bg-red-500';
  }
  if (nextEvent.isUrgent) {
    return 'bg-orange-500';
  }
  return 'bg-yellow-500';
};

const getEventBackground = (event) => {
  if (event.isOverdue) {
    return 'bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50';
  }
  if (event.isUrgent) {
    return 'bg-orange-50 dark:bg-orange-950/30 border border-orange-200 dark:border-orange-800/50';
  }
  if (event.isUpcoming) {
    return 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50';
  }
  return 'bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700';
};

const getEventIconBackground = (event) => {
  if (event.isOverdue) {
    return 'bg-red-500 text-white';
  }
  if (event.isUrgent) {
    return 'bg-orange-500 text-white';
  }
  if (event.isUpcoming) {
    return 'bg-amber-500 text-white';
  }
  return 'bg-neutral-500 text-white';
};

const getEventStatusColor = (event) => {
  if (event.isOverdue) {
    return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
  }
  if (event.isUrgent) {
    return 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300';
  }
  if (event.isUpcoming) {
    return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
  }
  return 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-300';
};
</script>