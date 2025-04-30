<template>
  <div class="weight-history">
    <!-- Weight Graph Section -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-medium">Historique du poids</h2>
        <UBadge color="blue" variant="soft">{{ displayLatestWeight }}</UBadge>
      </div>

      <!-- Weight Chart -->
      <div class="text-center text-sm font-italic">cliquez sur le graph pour ajouter le poids d'aujourd'hui</div>
      <div class="weight-chart relative h-100 mb-6 cursor-pointer" ref="chartContainer" @click="handleChartClick">
        <UCard v-if="showAddForm" class="absolute p-4 left-1/2 top-0 -translate-x-1/2 translate-y-1/4 z-10 shadow-lg">
          <template #header>
            <div class="font-medium">Ajouter un poids</div>
          </template>
          <div class="flex gap-4 items-center">
            <UInput
                v-model="newWeight"
                type="number"
                step="0.1"
                placeholder="Poids en kg"
                :ui="{ icon: { trailing: { pointer: true } } }"
            >
              <template #trailing>
                <span class="text-sm text-gray-500">kg</span>
              </template>
            </UInput>

            <div class="flex gap-2">
              <UButton color="green" @click="addWeight">Ajouter</UButton>
              <UButton color="gray" variant="soft" @click="cancelAdd">Annuler</UButton>
            </div>
          </div>
        </UCard>

        <!-- SVG Line Chart -->
        <svg ref="chart" width="100%" height="100%" class="weight-chart-svg"></svg>

        <!-- Tooltip -->
        <div
            v-if="showTooltip"
            class="tooltip absolute bg-white dark:bg-neutral-800 px-3 py-2 rounded-lg shadow-lg text-sm border border-gray-200 dark:border-neutral-700 z-20"
            :style="tooltipPosition"
        >
          <div class="font-medium">{{ formatDate(tooltipData.date) }}</div>
          <div class="flex items-center gap-2">
            <span>{{ tooltipData.weight }} kg</span>
            <span v-if="tooltipData.change !== null" :class="getChangeClass(tooltipData.change)">
              {{ formatChange(tooltipData.change) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Weight History Table -->
    <div>
      <h3 class="text-xl mb-3 font-medium">Dernières mesures</h3>
      <div class="bg-gray-50 dark:bg-neutral-800 rounded-lg overflow-hidden">
        <UTable
            :data="weightHistoryReversed"
            :columns="columns"
            :ui="{root: 'max-h-80',
            wrapper: 'max-h-80 overflow-y-auto',
            td: {
              base: 'whitespace-nowrap px-4 py-2 text-sm'
            },
            th: {
              base: 'text-left rtl:text-right whitespace-nowrap px-4 py-2 text-sm font-medium'
            }
          }"
        >
          <template #date-cell="{ row }">
            {{ formatDate(row.original.date) }}
          </template>
          <template #weight-cell="{ row }">
            <UBadge :color="getWeightTrendColor(row.original.change)">
              {{ row.original.weight }} kg
            </UBadge>
          </template>
          <template #change-cell="{ row }">
            <div v-if="row.original.change !== null" :class="getChangeClass(row.original.change)">
              {{ formatChange(row.original.change) }}
            </div>
            <div v-else class="text-gray-400">-</div>
          </template>
        </UTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as d3 from 'd3';
import type { TableColumn } from '#ui/components/Table.vue';
import { CalendarDate, today, getLocalTimeZone, parseDate } from '@internationalized/date';

const props = defineProps({
  petName: {
    type: String,
    required: true
  },
  currentWeight: {
    type: Number,
    required: true
  },
  weightHistory: {
    type: Array<Weight>,
    required: false,
    default: []
  }
});

const emits = defineEmits(['update:weight']);

// State
const newWeight = ref('');
const showAddForm = ref(false);
const chart = ref(null);
const chartContainer = ref(null);

// Tooltip state
const showTooltip = ref(false);
const tooltipData = ref({ date: new CalendarDate(), weight: 0, change: null });
const tooltipPosition = ref({ left: '0px', top: '0px' });

// Demo data - this would normally come from a store or API
const {weightHistory} = toRefs(props)

// Computed
const weightHistorySorted = computed(() => {
  return [...weightHistory.value]
      .map(v => ({date: parseDate(v.date), weight: v.weight}))
      .sort((a, b) => a.date.compare(b.date) > 0 ? 1 : -1)
      .map((v, i, arr) => {
        if (i > 0) {
          return {...v, change: v.weight - arr[i - 1].weight}
        }
        return {...v, change: null}
      })
      ;
});

const weightHistoryReversed = computed(() => {
  return [...weightHistorySorted.value].reverse();
});

const displayLatestWeight = computed(() => {
  return `${props.currentWeight} kg`;
});

const columns: TableColumn<any>[] = [
  {accessorKey: 'date', header: 'Date'},
  {accessorKey: 'weight', header: 'Poids'},
  {accessorKey: 'change', header: 'Variation'}
];

// Methods
const formatDate = (date: CalendarDate) => {
  return date.toString();
};

const getChangeClass = (change) => {
  if (change > 0) return 'text-green-600 dark:text-green-400';
  if (change < 0) return 'text-red-600 dark:text-red-400';
  return 'text-gray-600 dark:text-gray-400';
};

const getWeightTrendColor = (change) => {
  if (!change) return 'gray';
  if (change > 0) return 'emerald';
  if (change < 0) return 'rose';
  return 'blue';
};

const formatChange = (change) => {
  if (!change)
    return '';
  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(1)} kg`;
};

// Show tooltip when hovering over a data point
const showTooltipForPoint = (d, event) => {
  tooltipData.value = d;

  const containerRect = chartContainer.value.getBoundingClientRect();
  const mouseX = event.clientX - containerRect.left;
  const mouseY = event.clientY - containerRect.top;

  // Position tooltip slightly above and to the right of the mouse pointer
  tooltipPosition.value = {
    left: `${mouseX - 45}px`,
    top: `${mouseY - 60}px`
  };

  showTooltip.value = true;
};

// Hide tooltip
const hideTooltip = () => {
  showTooltip.value = false;
};

const handleChartClick = (event) => {
  if (showAddForm.value) return;

  // Only show form if click was on the chart area
  if (event.target.tagName === 'svg' ||
      event.target.tagName === 'path' ||
      event.target.tagName === 'circle' ||
      event.target.tagName === 'line') {
    showAddForm.value = true;
  }
};

const addWeight = () => {
  const weightValue = parseFloat(newWeight.value);

  if (isNaN(weightValue) || weightValue <= 0) {
    // Would normally show a toast error here
    return;
  }

  const lastWeight = weightHistory.value[weightHistory.value.length - 1].weight;
  const change = parseFloat((weightValue - lastWeight).toFixed(1));

  // Add new weight to history
  // weightHistory.value.push({
  //   date: new Date(),
  //   weight: weightValue,
  //   change: change
  // });

  // Update current weight in parent component
  emits('update:weight', {date: today(getLocalTimeZone()).toString(), weight: weightValue});

  // Reset and close form
  newWeight.value = '';
  showAddForm.value = false;

  // Redraw chart
  drawChart();
};

const cancelAdd = () => {
  newWeight.value = '';
  showAddForm.value = false;
};

// Chart rendering
const drawChart = () => {
  if (!chart.value) return;

  const svg = d3.select(chart.value);
  svg.selectAll("*").remove();

  const margin = { top: 20, right: 100, bottom: 30, left: 110 };
  const width = chartContainer.value.clientWidth - margin.left - margin.right;
  const height = chartContainer.value.clientHeight - margin.top - margin.bottom;

  // Create a group element for the chart with margins
  const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  // Set up scales
  const xScale = d3.scaleTime()
      .domain(d3.extent(weightHistorySorted.value, d => d.date.toDate()))
      .range([0, width]);

  const weightValues = weightHistorySorted.value.map(d => d.weight);
  const minWeight = Math.floor(d3.min(weightValues) - 1);
  const maxWeight = Math.ceil(d3.max(weightValues) + 1);

  const yScale = d3.scaleLinear()
      .domain([minWeight, maxWeight])
      .range([height, 0]);

  // Create the line generator
  const line = d3.line()
      .x(d => xScale(d.date.toDate()))
      .y(d => yScale(d.weight))
      .curve(d3.curveMonotoneX);

  // Add the X and Y axes
  g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(d3.timeFormat("%b %Y")))
      .attr("class", "text-gray-500 text-xs");

  g.append("g")
      .call(d3.axisLeft(yScale).ticks(5))
      .attr("class", "text-gray-500 text-xs");

  // Add grid lines
  g.append("g")
      .attr("class", "grid")
      .call(d3.axisLeft(yScale)
          .ticks(5)
          .tickSize(-width)
          .tickFormat("")
      )
      .attr("stroke", "#e5e5e5")
      .attr("stroke-opacity", "0.3");

  // Add the line path
  g.append("path")
      .datum(weightHistorySorted.value)
      .attr("fill", "none")
      .attr("stroke", "#3b82f6")
      .attr("stroke-width", 2)
      .attr("d", line);

  // Add data points with hover event handlers
  g.selectAll(".data-point")
      .data(weightHistorySorted.value)
      .enter()
      .append("circle")
      .attr("class", "data-point")
      .attr("cx", d => xScale(d.date.toDate()))
      .attr("cy", d => yScale(d.weight))
      .attr("r", 4)
      .attr("fill", "#3b82f6")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .on("mouseenter", (event, d) => showTooltipForPoint(d, event))
      .on("mouseleave", hideTooltip);

  // Larger invisible circles for better hover detection
  g.selectAll(".hover-area")
      .data(weightHistorySorted.value)
      .enter()
      .append("circle")
      .attr("class", "hover-area")
      .attr("cx", d => xScale(d.date.toDate()))
      .attr("cy", d => yScale(d.weight))
      .attr("r", 15)
      .attr("fill", "transparent")
      .on("mouseenter", (event, d) => showTooltipForPoint(d, event))
      .on("mouseleave", hideTooltip);
};

// Draw chart on mount and resize
onMounted(() => {
  drawChart();
  window.addEventListener('resize', drawChart);
});

// Clean up event listener
onUnmounted(() => {
  window.removeEventListener('resize', drawChart);
});

// Watch for external weight changes
watch(() => props.currentWeight, (newValue) => {
  const latestRecord = weightHistory.value[weightHistory.value.length - 1];
  if (latestRecord.weight !== newValue) {
    // If external update and not the same as our latest, add new record
    weightHistory.value.push({
      date: new CalendarDate(),
      weight: newValue,
      change: parseFloat((newValue - latestRecord.weight).toFixed(1))
    });
    drawChart();
  }
}, { immediate: false });

// Redraw chart if data changes
watch(weightHistory, () => {
  drawChart();
}, { deep: true });
</script>

<style scoped>
.weight-chart {
  border: 1px solid rgba(203, 213, 225, 0.5);
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: rgba(248, 250, 252, 0.5);
  height: 240px; /* Set a fixed height for the chart */
}

.dark .weight-chart {
  background-color: rgba(23, 23, 23, 0.2);
  border-color: rgba(82, 82, 91, 0.5);
}

.weight-chart-svg {
  overflow: visible;
}

.tooltip {
  pointer-events: none;
  transition: opacity 0.1s ease;
}
</style>