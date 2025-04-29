<template>
  <div>
    <div class="mb-6">
      <h2 class="text-4xl flex align-center gap-2"><UIcon name="i-heroicons-bug-ant" /> Anti-puces</h2>
    </div>
    <DRangeCalendar :start="start" :rangeLength="30" @select:date="onSelectRange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CalendarDate } from '@internationalized/date'
import DRangeCalendar from '~/components/custom/DRangeCalendar.vue';

const props = defineProps(['name', 'weight']);

// Initialize date range state
const start = ref(new CalendarDate(2025, 4, 5))


const onSelectRange = (range) => {
  console.log(range);
}
</script>