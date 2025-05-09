<template>
  <NuxtLink
      :to="to"
      class="relative flex items-center gap-2 px-4 py-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100/20 dark:hover:bg-neutral-500/20 transition-all"
      :class="{ 'text-amber-600! dark:text-amber-400! font-extrabold hover:bg-amber-100/20! dark:hover:bg-amber-900/40!': isActive }"
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

