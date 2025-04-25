<script lang="ts" setup>
import { cn } from '@/lib/utils'
import {
  type DateRange, type Formatter,
  RangeCalendarRoot,
  type RangeCalendarRootEmits,
  type RangeCalendarRootProps,
  useForwardPropsEmits
} from 'reka-ui'
import { computed, type HTMLAttributes } from 'vue'
import { RangeCalendarCell, RangeCalendarCellTrigger, RangeCalendarGrid, RangeCalendarGridBody, RangeCalendarGridHead, RangeCalendarGridRow, RangeCalendarHeadCell, RangeCalendarHeader, RangeCalendarHeading, RangeCalendarNextButton, RangeCalendarPrevButton } from '.'
import type { DateValue, Grid, Matcher, WeekDayFormat } from 'reka-ui/date';

declare type Direction = 'ltr' | 'rtl';

declare type RangeCalendarRootContext = {
  modelValue: Ref<DateRange>;
  startValue: Ref<DateValue | undefined>;
  endValue: Ref<DateValue | undefined>;
  locale: Ref<string>;
  placeholder: Ref<DateValue>;
  pagedNavigation: Ref<boolean>;
  preventDeselect: Ref<boolean>;
  grid: Ref<Grid<DateValue>[]>;
  weekDays: Ref<string[]>;
  weekStartsOn: Ref<0 | 1 | 2 | 3 | 4 | 5 | 6>;
  weekdayFormat: Ref<WeekDayFormat>;
  fixedWeeks: Ref<boolean>;
  numberOfMonths: Ref<number>;
  disabled: Ref<boolean>;
  readonly: Ref<boolean>;
  initialFocus: Ref<boolean>;
  onPlaceholderChange: (date: DateValue) => void;
  fullCalendarLabel: Ref<string>;
  parentElement: Ref<HTMLElement | undefined>;
  headingValue: Ref<string>;
  isInvalid: Ref<boolean>;
  isDateDisabled: Matcher;
  isDateUnavailable?: Matcher;
  isOutsideVisibleView: (date: DateValue) => boolean;
  highlightedRange: Ref<{
    start: DateValue;
    end: DateValue;
  } | null>;
  focusedValue: Ref<DateValue | undefined>;
  lastPressedDateValue: Ref<DateValue | undefined>;
  isSelected: (date: DateValue) => boolean;
  isSelectionEnd: (date: DateValue) => boolean;
  isSelectionStart: (date: DateValue) => boolean;
  isHighlightedStart: (date: DateValue) => boolean;
  isHighlightedEnd: (date: DateValue) => boolean;
  prevPage: (prevPageFunc?: (date: DateValue) => DateValue) => void;
  nextPage: (nextPageFunc?: (date: DateValue) => DateValue) => void;
  isNextButtonDisabled: (nextPageFunc?: (date: DateValue) => DateValue) => boolean;
  isPrevButtonDisabled: (prevPageFunc?: (date: DateValue) => DateValue) => boolean;
  formatter: Formatter;
  dir: Ref<Direction>;
};

const props = defineProps<RangeCalendarRootProps & { class?: HTMLAttributes['class'] }>()

const emits = defineEmits<RangeCalendarRootEmits & { 'custom:modelValue': [date: DateRange] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const customCalendar = ref(null);
const provides = computed(() => {
  if (customCalendar.value) {
    const provides = customCalendar.value.$.provides;

    const symbols = Object.getOwnPropertySymbols(provides);

    const data = provides[symbols[0]];
    return data;
  }
  return null;
});

const endDateValue = computed({
  get() {
    if (customCalendar.value) {
    const data = provides.value;
    return data.endValue;
  }
  return null;
  },
  set(v) {
    if (customCalendar.value) {
    const data = provides.value;
    data.endValue = v;
  }
  }
})

const modelValueComp = computed({
  get() {
    if (customCalendar.value) {
    const data = provides.value;
    return data.modelValue;
  }
  return null;
  },
  set(v) {
    if (customCalendar.value) {
    const data = provides.value;
    data.modelValue = v;
  }
  }
})

const startDateValue = computed(() => {
  if (customCalendar.value) {
    const data = provides.value;
    return data.startValue;
  }
  return null;
});

watch(() => delegatedProps.value.modelValue, (value, old) => {
  if (customCalendar.value) {
    const provides = customCalendar.value.$.provides;

    const symbols = Object.getOwnPropertySymbols(provides);

    const data = provides[symbols[0]];
    console.log(data);
  }
});

watch(startDateValue, (startDate, old) => {
  console.log('start date changed !');
  if (startDate.value) {
    endDateValue.value = startDate.value.add({days: 30});
    modelValueComp.value = {start: startDate.value, end: endDateValue.value};
    emits('custom:modelValue', startDate.value);
  }
}, { deep: true });
</script>

<template>
  <RangeCalendarRoot ref="customCalendar" v-slot="{ grid, weekDays }" data-slot="range-calendar"
    :class="cn('p-3', props.class)" v-bind="forwarded">
    <RangeCalendarHeader>
      <RangeCalendarHeading />

      <div class="flex items-center gap-1">
        <RangeCalendarPrevButton />
        <RangeCalendarNextButton />
      </div>
    </RangeCalendarHeader>

    <div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
      <RangeCalendarGrid v-for="month in grid" :key="month.value.toString()">
        <RangeCalendarGridHead>
          <RangeCalendarGridRow>
            <RangeCalendarHeadCell v-for="day in weekDays" :key="day">
              {{ day }}
            </RangeCalendarHeadCell>
          </RangeCalendarGridRow>
        </RangeCalendarGridHead>
        <RangeCalendarGridBody>
          <RangeCalendarGridRow v-for="(weekDates, index) in month.rows" :key="`weekDate-${index}`" class="mt-2 w-full">
            <RangeCalendarCell v-for="weekDate in weekDates" :key="weekDate.toString()" :date="weekDate">
              <RangeCalendarCellTrigger :day="weekDate" :month="month.value" class="rounded-full" />
            </RangeCalendarCell>
          </RangeCalendarGridRow>
        </RangeCalendarGridBody>
      </RangeCalendarGrid>
    </div>
  </RangeCalendarRoot>
</template>
