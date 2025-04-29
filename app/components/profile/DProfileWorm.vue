<template>
  <div>
    <div class="mb-6">
      <h2 class="text-4xl ">Vermifuge</h2>
      <p class="font-italic">{{ name }}</p>
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