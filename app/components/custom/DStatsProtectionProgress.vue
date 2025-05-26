<template>
  <div class="flex flex-col">
    <h3 class="text-sm font-medium mb-2">Protection</h3>
    <div v-if="startDate && endDate" class="mb-4">
      <div class="flex items-center justify-between mb-1 text-xs">
        <span>{{ formatDate(startDate) }}</span>
        <span>{{ formatDate(endDate) }}</span>
      </div>
      <div class="relative pt-1">
        <div class="flex mb-2 items-center justify-between">
          <div>
            <UProgress
                :value="protectionProgress"
                :color="progressColor"
                class="w-full"
            />
          </div>
        </div>
        <div class="text-center text-xs">
          <span v-if="daysRemaining > 0" :class="daysRemaining <= 7 ? 'text-orange-500' : ''">
            {{ daysRemaining }} jours restants
          </span>
          <span v-else class="text-red-500">
            Expiré depuis {{ Math.abs(daysRemaining) }} jours
          </span>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-red-500 text-sm py-2">
      Protection non active
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { getLocalTimeZone, parseDate, today } from '@internationalized/date';

const props = defineProps({
  startDate: {
    type: String,
    default: null
  },
  endDate: {
    type: String,
    default: null
  }
});

const startDateObj = computed(() => {
  if (!props.startDate) return null;
  try {
    return parseDate(props.startDate);
  } catch (e) {
    console.error("Error parsing start date:", e);
    return null;
  }
});

const endDateObj = computed(() => {
  if (!props.endDate) return null;
  try {
    return parseDate(props.endDate);
  } catch (e) {
    console.error("Error parsing end date:", e);
    return null;
  }
});

const currentDate = computed(() => {
  return today(getLocalTimeZone());
});

const totalDays = computed(() => {
  if (!startDateObj.value || !endDateObj.value) return 0;
  try {
    return endDateObj.value.compare(startDateObj.value);
  } catch (e) {
    console.error("Error calculating total days:", e);
    return 0;
  }
});

const daysRemaining = computed(() => {
  if (!endDateObj.value) return 0;
  try {
    return endDateObj.value.compare(currentDate.value);
  } catch (e) {
    console.error("Error calculating days remaining:", e);
    return 0;
  }
});

const daysElapsed = computed(() => {
  if (!startDateObj.value) return 0;
  try {
    return currentDate.value.compare(startDateObj.value);
  } catch (e) {
    console.error("Error calculating days elapsed:", e);
    return 0;
  }
});

const protectionProgress = computed(() => {
  if (totalDays.value <= 0) return 0;
  const progress = (daysElapsed.value / totalDays.value) * 100;
  return Math.min(Math.max(progress, 0), 100);
});

const progressColor = computed(() => {
  if (daysRemaining.value <= 0) return 'red';
  if (daysRemaining.value <= 7) return 'orange';
  return 'green';
});

const formatDate = (dateString) => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short'
    });
  } catch (e) {
    console.error("Error formatting date:", e);
    return dateString;
  }
};
</script>