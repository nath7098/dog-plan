<template>
  <div>
    <div class="mb-6">
      <h2 class="text-4xl ">Anti-puces</h2>
      <p class="font-italic">{{ name }}</p>
    </div>
    <!-- <RangeCalendar
        class="rounded-xl border w-fit"
        v-model="dateRange"
        @custom:modelValue="handleDateSelectionStart"
        @custom:startValue="handleDateSelectionStart"
    /> -->
    <DRangeCalendar :rangeLength="30" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { DateRange, DateValue } from 'reka-ui';
import DRangeCalendar from '~/components/custom/DRangeCalendar.vue';

const props = defineProps(['name', 'weight']);
const calendarState = ref(false)

// Initialize date range state
const dateRange = ref<DateRange>({
  start: undefined,
  end: undefined
});


function handleDateSelectionStart(startDate: DateValue) {
  console.log(startDate);
  dateRange.value = {
    start: startDate,
    end: startDate.add({ days: 30 }),
  };
}
function handleDateSelectionModel(range: DateRange) {
  console.log(range);
  dateRange.value = {
    start: range.start,
    end: range.start!.add({ days: 30 }),
  };
}
</script>