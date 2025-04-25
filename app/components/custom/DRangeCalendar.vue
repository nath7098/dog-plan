<template>
    <div class="range-calendar">
      <!-- Calendar Header -->
      <div class="calendar-header">
        <UButton variant="ghost" icon="i-heroicons-chevron-left" @click="prevMonth" />
        <h3 class="month-title">{{ monthName }}</h3>
        <UButton variant="ghost" icon="i-heroicons-chevron-right" @click="nextMonth" />
      </div>
  
      <!-- Calendar Days Header -->
      <div class="calendar-day-header">
        <div v-for="day in weekDays" :key="day" class="day-name">{{ day }}</div>
      </div>
  
      <!-- Calendar Grid -->
      <div class="calendar-grid">
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          class="calendar-day"
          :class="{
            'other-month': !day.isCurrentMonth,
            'range-start': isRangeStart(day.date),
            'range-end': isRangeEnd(day.date),
            'in-range': isInRange(day.date) && !isRangeStart(day.date) && !isRangeEnd(day.date)
          }"
          @click="handleDateClick(day.date)"
        >
          {{ day.date.getDate() }}
        </div>
      </div>
  
      <!-- Selected Range Info -->
      <div v-if="selectedRange.start" class="range-info">
        <p>
          Selected range: {{ formatDisplayDate(selectedRange.start) }} to
          {{ formatDisplayDate(selectedRange.end) }} ({{ rangeLength }} days)
        </p>
      </div>
  
      <!-- Help Text -->
      <div class="help-text">
        <p>Click on a date to select a {{ rangeLength }}-day range. Click on the start date to clear the selection.</p>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    rangeLength: {
      type: Number,
      default: 7
    }
  });
  
  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const currentMonth = ref(new Date());
  const selectedRange = ref({
    start: null,
    end: null
  });
  
  // Calculate month name
  const monthName = computed(() => {
    return currentMonth.value.toLocaleString('default', { month: 'long', year: 'numeric' });
  });
  
  // Navigate to previous month
  const prevMonth = () => {
    currentMonth.value = new Date(
      currentMonth.value.getFullYear(),
      currentMonth.value.getMonth() - 1,
      1
    );
  };
  
  // Navigate to next month
  const nextMonth = () => {
    currentMonth.value = new Date(
      currentMonth.value.getFullYear(),
      currentMonth.value.getMonth() + 1,
      1
    );
  };
  
  // Format date for comparison
  const formatDate = (date) => {
    if (!date) return '';
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };
  
  // Format date for display
  const formatDisplayDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString();
  };
  
  // Handle date selection
  const handleDateClick = (date) => {
    // If clicking on the start date, clear the selection
    if (selectedRange.value.start && formatDate(date) === formatDate(selectedRange.value.start)) {
      selectedRange.value = { start: null, end: null };
      return;
    }
  
    // Calculate end date based on range length
    const endDate = new Date(date);
    endDate.setDate(date.getDate() + props.rangeLength - 1);
    
    selectedRange.value = {
      start: date,
      end: endDate
    };
  };
  
  // Check if a date is within the selected range
  const isInRange = (date) => {
    if (!selectedRange.value.start || !selectedRange.value.end) return false;
    
    const dateStr = formatDate(date);
    const startStr = formatDate(selectedRange.value.start);
    const endStr = formatDate(selectedRange.value.end);
    
    return dateStr >= startStr && dateStr <= endStr;
  };
  
  // Check if a date is the start of the selected range
  const isRangeStart = (date) => {
    if (!selectedRange.value.start) return false;
    return formatDate(date) === formatDate(selectedRange.value.start);
  };
  
  // Check if a date is the end of the selected range
  const isRangeEnd = (date) => {
    if (!selectedRange.value.end) return false;
    return formatDate(date) === formatDate(selectedRange.value.end);
  };
  
  // Generate calendar days for current month view
  const calendarDays = computed(() => {
    const year = currentMonth.value.getFullYear();
    const month = currentMonth.value.getMonth();
    
    // First day of the month
    const firstDay = new Date(year, month, 1);
    // Last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Get starting day of week (0 = Sunday, 1 = Monday, etc.)
    const startingDayOfWeek = firstDay.getDay();
    
    // Days from previous month to show
    const daysFromPrevMonth = startingDayOfWeek;
    
    // Calculate total days to render (6 weeks)
    const totalDays = 42; // 6 rows of 7 days
    
    const days = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = prevMonthLastDay - daysFromPrevMonth + 1; i <= prevMonthLastDay; i++) {
      days.push({
        date: new Date(year, month - 1, i),
        isCurrentMonth: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Next month days
    const remainingDays = totalDays - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false
      });
    }
    
    return days;
  });
  </script>
  
  <style scoped>
  .range-calendar {
    width: 100%;
    max-width: 28rem;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
  
  .calendar-header {
    padding-left: 1rem;
    padding-right: 1rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--color-neutral-50);
  }
  
  .month-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--color-neutral-800);
  }
  
  .calendar-day-header {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.25rem;
    padding: 0.5rem;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-neutral-600);
  }
  
  .day-name {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
  }
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 0.25rem 0;
    padding: 0.5rem;
  }
  
  .calendar-day {
    height: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.375rem;
    cursor: pointer;
    transition-property: background-color, border-color, color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }
  
  .calendar-day:not(.other-month) {
    color: var(--ui-color-neutral-900);
  }
  
  .calendar-day:not(.other-month):hover:not(.range-start):not(.range-end):not(.in-range) {
    background-color: var(--ui-color-neutral-50);
  }
  
  .other-month {
    color: var(--ui-color-neutral-300);
  }
  
  .range-start, .range-end {
    background-color: var(--ui-color-neutral-900);
    color: var(--ui-color-neutral-50) !important;
  }
  
  .in-range {
    background-color: var(--ui-color-neutral-300);
  }
  
  .range-info {
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    font-size: 0.875rem;
    color: #4b5563;
  }
  
  .help-text {
    padding: 1rem;
    background-color: #f9fafb;
    border-top: 1px solid #e5e7eb;
    font-size: 0.75rem;
    color: #6b7280;
  }
  </style>