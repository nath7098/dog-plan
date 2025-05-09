<template>
  <NuxtLink
      :to="to"
      :class="[
      'flex flex-col items-center justify-center space-y-1 px-3 py-1 text-xs transition-all',
      isActive ? 'text-amber-600 dark:text-amber-400' : 'text-gray-700 dark:text-gray-300'
    ]"
      :style="className ? {} : {}"
  >
    <UIcon :name="icon" class="h-6 w-6" />
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
  },
  class: {
    type: String,
    default: ''
  }
});

const route = useRoute();
const isActive = computed(() => {
  return route.path === props.to ||
      (props.to !== '/' && route.path.startsWith(props.to));
});

const className = computed(() => props.class);
</script>