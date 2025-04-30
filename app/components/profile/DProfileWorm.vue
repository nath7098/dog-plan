<template>
  <div>
    <div class="mb-6">
      <h2 class="text-4xl flex align-center gap-2"><UIcon name="i-fluent-emoji-high-contrast-worm" /> Vermifuge</h2>
    </div>
    <DRangeCalendar :start="start" :rangeLength="90" @select:date="onSelectRange" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { CalendarDate } from '@internationalized/date'
import DRangeCalendar from '~/components/custom/DRangeCalendar.vue';

const props = defineProps(['name', 'start']);
const emits = defineEmits(['select:start'])

// Initialize date range state
const start = toRef(props.start!);


const onSelectRange = (range) => {
  emits('select:start', range)
}
</script>