<template>
  <div>
    <div class="mb-6">
      <h2 class="text-4xl ">Anti-puces</h2>
      <p class="font-italic">{{ name }}</p>
    </div>
    <RangeCalendar
        class="rounded-xl border w-fit"
        v-model="dateRange"
        @custom:modelValue="handleDateSelectionStart"
        @custom:startValue="handleDateSelectionStart"
    />
  </div>
</template>

<script setup lang="ts">
import { RangeCalendar } from '~/components/ui/range-calendar';
import { ref } from 'vue';
import type { DateRange, DateValue } from 'reka-ui';

const props = defineProps(['name', 'weight']);
const calendarState = ref(false)

// Initialize date range state
const dateRange = ref<DateRange>({
  start: undefined,
  end: undefined
});


function handleDateSelectionStart(range: DateRange) {
    dateRange.value = {
      start: range.start,
      end: range.start.add({days: 30}),
    };
}
</script>