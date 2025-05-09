<template>
  <div class="relative">
    <slot></slot>
    <span
        v-if="count > 0"
        class="absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full px-1.5 animate-pulse"
    >
      {{ count > 99 ? '99+' : count }}
    </span>
  </div>
</template>

<script setup>
defineProps({
  count: {
    type: Number,
    default: 0
  }
});
</script>

<!-- Usage Example -->
<!--
<template>
  <nav>
    <!-- Other navigation elements -->
<!-- <NotificationBadge :count="notifications.length">
  <UButton icon="i-heroicons-bell" variant="ghost" />
</NotificationBadge>
</nav>
</template>
-->