<template>
  <NuxtLink
      :to="to"
      class="relative flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all"
      :class="{ 'text-amber-600! dark:text-amber-400! bg-amber-50! dark:bg-amber-900/30! hover:bg-amber-100! dark:hover:bg-amber-900/50!': isActive }"
  >
    <UIcon :name="icon" class="h-5 w-5" />
    <span>{{ label }}</span>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  to: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
});

const route = useRoute();
const isActive = computed(() => {
  return route.path === props.to ||
      (props.to !== '/' && route.path.startsWith(props.to));
});
</script>

