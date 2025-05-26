<template>
  <div class="min-h-screen p-8">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8 text-center">
        <h1 class="text-3xl font-bold dark:text-neutral-50 text-neutral-800 mb-2">Paramètres</h1>
        <p class="dark:text-neutral-400 text-neutral-500">Gérez vos préférences d'utilisation</p>
      </div>

      <DCard class="flex flex-col min-h-[60vh] p-8">
        <DCard class="flex items-center">
          <div>Couleurs : {{colorMode.value}}</div>
          <UButton variant="link" class="text-amber-500! dark:hover:text-amber-400/80! hover:text-amber-700/80! cursor-pointer" :icon="colorMode.value === 'light' ? 'i-lucide-sun' : 'i-lucide-moon'" @click="switchColorMode" />
        </DCard>
      </DCard>
    </div>
  </div>
</template>

<script lang="ts" setup>

import DCard from '~/components/custom/DCard.vue';

definePageMeta({
  layout: 'authenticated',
});

const colorMode = useColorMode();

const switchColorMode = () => {
  colorMode.value = colorMode.value === 'light' ? 'dark' : 'light';
}
</script>