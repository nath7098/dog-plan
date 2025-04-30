<template>
  <div class="p-6 max-w-6xl mx-auto space-y-6">
    <UButton variant="outline" color="neutral" size="xl" class="p-6 rounded-full" to="nouveau">
      <div class="flex gap-6 w-6xl">
        <UAvatar
            icon="i-heroicons-plus-16-solid" :ui="{root: 'size-25 text-7xl'}" />
        <div class="flex flex-col justify-center text-neutral-400">
          <div class="text-xl">Petit nouveau</div>
        </div>
      </div>
    </UButton>
    <UButton v-for="animal in animals" :to="animal.name" variant="outline" color="neutral" size="xl" class="p-6  rounded-full">
      <div class="flex gap-6 align-center w-6xl">
        <UAvatar
            :src="animal.avatar"
            icon="i-fluent-animal-dog-16-regular" :ui="{root: 'size-25 text-7xl'}" />
        <div class="flex flex-col justify-center text-neutral-400">
          <div class="text-xl">{{animal.name}} <UIcon :name="animal.gender === 'male' ? 'i-ic-baseline-male' : 'i-ic-baseline-female'" :class="[animal.gender === 'male' ? 'text-blue-500' : 'text-pink-500']" /></div>
          <div class="space-x-6">
            <span>{{displayAge(age(animal.birthDate))}}</span>
            <span>
            {{animal.weight}} kg
          </span>
          </div>
        </div>
        <div class="space-x-3">
          <UTooltip v-for="(alerte, idx) in getAnimalAlerts(animal)" :text="alerte.text" :key="`${animal.name}-alert-${idx}`">

            <UIcon :name="alerte.icon ?? 'i-heroicons-exclamation-triangle-16-solid'"
                   size="lg"
                   :class="[{'text-red-500': alerte.level === 'danger', 'text-amber-500': alerte.level === 'warning', 'text-neutral-500': alerte.level === 'info'}]" />
          </UTooltip>
        </div>
      </div>
    </UButton>
  </div>
</template>
<script lang="ts" setup>

import { getLocalTimeZone, parseDate, today } from '@internationalized/date';

type AnimalInfo = {
  level: 'info' | 'warning' | 'danger';
  icon?: string;
  text: string;
}

const animalStore = useAnimalStore();
const animals = ref(animalStore.animals);

const age = (bd) => {
  return calculAge(bd);
};

const displayAge = (a) => {
  return ageToString(a);
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

    if (!foodPercentage(stockFood) && foodPercentage(openFood)?.percentage >= 90) {
      alerts.push({level: 'warning', icon: 'i-tabler-dog-bowl', text: `${animal.name} n'a bientôt plus de croquettes`});
    } else if (!foodPercentage(stockFood) && foodPercentage(openFood)?.percentage >= 70 && foodPercentage(openFood)?.percentage < 90) {
      alerts.push({level: 'info', icon: 'i-tabler-dog-bowl', text: `Pensez a prévoire des croquettes pour ${animal.name}`});
    }
  }

  // Weight alerts
  if (!animal.weight) {
    alerts.push({level: 'danger', icon: 'i-healthicons-weight-outline-24px', text: `${animal.name} n'a pas de poids renseigné`});
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
        if (animal.weight && td.add({years: -1}).compare(lastWeight.parsedDate) < 0) {
          alerts.push({level: 'danger', icon: 'i-healthicons-weight-outline-24px', text: `${animal.name} n'a pas de poids renseigné depuis plus de 1 an`});
        } else if (animal.weight && td.add({months: -6}).compare(lastWeight.parsedDate) < 0) {
          alerts.push({level: 'warning', icon: 'i-healthicons-weight-outline-24px', text: `${animal.name} n'a pas de poids renseigné depuis plus de 6 mois`});
        } else if (animal.weight && td.add({months: -2}).compare(lastWeight.parsedDate) < 0) {
          alerts.push({level: 'info', icon: 'i-healthicons-weight-outline-24px', text: `${animal.name} n'a pas de poids renseigné depuis plus de 2 mois`});
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