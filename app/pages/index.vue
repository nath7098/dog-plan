<template>
  <div class="p-6 max-w-6xl mx-auto space-y-6">
    <UButton variant="outline" color="neutral" size="xl" class="p-6 rounded-full" to="nouveau">
      <div class="flex justify-between w-6xl">
        <UAvatar
            icon="i-heroicons-plus-16-solid" :ui="{root: 'size-25 text-7xl'}" />
        <div class="flex flex-col justify-center text-neutral-400">
          <div class="text-xl">Petit nouveau</div>
        </div>
      </div>
    </UButton>
    <UButton v-for="animal in animals" :to="animal.name" variant="outline" color="neutral" size="xl" class="p-6  rounded-full">
      <div class="flex justify-between w-6xl">
        <UAvatar
            :src="animal.avatar"
            icon="i-fluent-animal-dog-16-regular" :ui="{root: 'size-25 text-7xl'}" />
        <div class="flex flex-col justify-center text-neutral-400">
          <div v-if="animal.gender" class="text-xl">{{animal.name}} <UIcon :name="animal.gender === 'male' ? 'i-ic-baseline-male' : 'i-ic-baseline-female'" :class="[animal.gender === 'male' ? 'text-blue-500' : 'text-pink-500']" /></div>
          <div class="space-x-6">
            <span v-if="displayAge">{{displayAge(age(animal.birthDate))}}</span>
            <span>
            {{animal.weight}} kg
          </span>
          </div>
        </div>
      </div>
    </UButton>
  </div>
</template>
<script lang="ts" setup>
import { ageToString, calculAge } from '~/utils/dates';

const animalStore = useAnimalStore();
const animals = animalStore.animals;

const age = (bd) => {
  return calculAge(bd);
};

const displayAge = (a) => {
  return ageToString(a);
};
</script>