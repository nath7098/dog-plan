<template>
  <div
      class="range-calendar flex flex-col items-center w-fit m-x-auto p-2 border-1 border-neutral-600/50 rounded-xl overflow-hidden">
    <!-- Calendar Header -->
    <div class="flex justify-between items-center w-full p-2">
      <UButton variant="outline" size="sm" color="neutral" icon="i-heroicons-chevron-left" @click="prevMonth"/>
      <h3 class="text-md dark:text-neutral-100 text-neutral-900 font-weight-semibold">{{ monthName }}</h3>
      <UButton variant="outline" size="sm" color="neutral" icon="i-heroicons-chevron-right" @click="nextMonth"/>
    </div>

    <!-- Calendar Days Header -->
    <div class="grid grid-cols-(--calendar-cols) text-center text-sm dark:text-neutral-100 text-neutral-900">
      <div v-for="day in weekDays" :key="day" class="py-2">{{ day }}</div>
    </div>

    <!-- Calendar Grid -->
    <div class="grid grid-cols-(--calendar-cols) gap-y-1">
      <div
          v-for="(day, index) in calendarDays"
          :key="index"
          :class="['calendar-day',
           {
            'other-month text-foreground/40!': !isCurrentMonth(day),
            'today *:rounded-full *:dark:bg-primary-200/45 *:bg-primary-300/45': isTodayDay(day),
            '*:rounded-full dark:bg-neutral-700 *:dark:neutral-50 bg-neutral-400 *:bg-neutral-950 dark:*:text-foreground *:text-neutral-50': isRangeStart(day) || isRangeEnd(day),
            'range-start rounded-l-full': isRangeStart(day),
            'range-end rounded-r-full': isRangeEnd(day),
            'in-range dark:bg-neutral-700 bg-neutral-400': isInRange(day) && !isRangeStart(day) && !isRangeEnd(day),
            'text-foreground/80': !isInRange(day),
            'rounded-l-full': isStartRow(index),
            'rounded-r-full': isEndRow(index),
          }]"
          @click="handleDateClick(day)"
      >
        <div class="h-full w-full">{{ day.day }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CalendarDate, isSameDay, isSameMonth, isToday, today, endOfMonth } from '@internationalized/date'

const props = defineProps({
  rangeLength: {
    type: Number,
    default: 7,
    required: true
  },
  start : {
    type: CalendarDate,
    default: null,
    required: false
  }
});
const emits = defineEmits(['select:date']);

const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const currentMonth = ref(today());
const startRef = toRef(props.start);
const lengthRef = toRef(props.rangeLength);
const selectedRange = ref({
  start: startRef.value ?? null,
  end: startRef.value?.add({days: lengthRef.value}) ?? null
});

// Calculate month name
const monthName = computed(() => {
  return currentMonth.value.toDate().toLocaleString('default', {month: 'long', year: 'numeric'});
});

// Navigate to previous month
const prevMonth = () => {
  currentMonth.value = new CalendarDate(
      currentMonth.value.year,
      currentMonth.value.month - 1,
      1
  );
};

// Navigate to next month
const nextMonth = () => {
  currentMonth.value = new CalendarDate(
      currentMonth.value.year,
      currentMonth.value.month + 1,
      1
  );
};

// Handle date selection
const handleDateClick = (date: CalendarDate) => {
  // If clicking on the start date, clear the selection
  if (selectedRange.value.start && isSameDay(date, selectedRange.value.start)) {
    selectedRange.value = {start: null, end: null};
    emits('select:date', selectedRange.value);
    return;
  }

  // Calculate end date based on range length
  const endDate = date.add({days: props.rangeLength - 1})

  selectedRange.value = {
    start: date,
    end: endDate
  };
  emits('select:date', selectedRange.value);
};

const isStartRow = (index: number) => {
  return index % 7 === 0;
}

const isEndRow = (index: number) => {
  return index % 7 === 6;
}

// Check if a date is within the selected range
const isInRange = (date: CalendarDate) => {
  if (!selectedRange.value.start || !selectedRange.value.end) {
    return false;
  }

  return date.compare(selectedRange.value.start) >= 0 && date.compare(selectedRange.value.end) <= 0;
};

// Check if a date is the start of the selected range
const isRangeStart = (date: CalendarDate) => {
  if (!selectedRange.value.start) {
    return false;
  }
  return isSameDay(date, selectedRange.value.start);
};

// Check if a date is the end of the selected range
const isRangeEnd = (date) => {
  if (!selectedRange.value.end) {
    return false;
  }
  return isSameDay(date, selectedRange.value.end);
};

const isCurrentMonth = (day) => {
  return isSameMonth(today(), day);
}

const isTodayDay = (day) => {
  return isToday(day);
}

// Generate calendar days for current month view
const calendarDays = computed(() => {
  const year = currentMonth.value.year;
  const month = currentMonth.value.month;

  // Last day of the month
  const lastDay = endOfMonth(today()).day;

  // Get starting day of week (0 = Sunday, 1 = Monday, etc.)
  const daysFromPrevMonth = 1;

  // Calculate total days to render (6 weeks)
  const totalDays = 42; // 6 rows of 7 days

  const days: Array<CalendarDate> = [];

  // Previous month days
  const prevMonthLastDay = endOfMonth(today().add({months: -1})).day;
  for (let i = prevMonthLastDay - daysFromPrevMonth + 1; i <= prevMonthLastDay; i++) {
    days.push(new CalendarDate(year, month - 1, i));
  }

  // Current month days
  for (let i = 1; i <= lastDay; i++) {
    days.push(new CalendarDate(year, month, i));
  }

  // Next month days
  const remainingDays = totalDays - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push(new CalendarDate(year, month + 1, i));
  }

  return days;
});
</script>

<style scoped>
.range-calendar {
  --cell-size: 2.25rem;
  --calendar-cols: repeat(7, var(--cell-size));
}

.calendar-day {
  height: var(--cell-size);
  width: var(--cell-size);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition-property: background-color, color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;

  & div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.calendar-day:not(.other-month):hover:not(.range-start):not(.range-end):not(.in-range):not(.today) div {
  border-radius: .5rem;
  background-color: color-mix(in srgb, var(--ui-color-neutral-400) 66%, transparent);
}
.dark .calendar-day:not(.other-month):hover:not(.range-start):not(.range-end):not(.in-range):not(.today) div {
  border-radius: .5rem;
  background-color: color-mix(in srgb, var(--ui-color-neutral-600) 66%, transparent);
}

.calendar-day.other-month:hover:not(.range-start):not(.range-end):not(.in-range):not(.today) div {
  border-radius: .5rem;
  background-color: color-mix(in srgb, var(--ui-color-neutral-400) 33%, transparent);
}
.dark .calendar-day.other-month:hover:not(.range-start):not(.range-end):not(.in-range):not(.today) div {
  border-radius: .5rem;
  background-color: color-mix(in srgb, var(--ui-color-neutral-600) 33%, transparent);
}
</style>