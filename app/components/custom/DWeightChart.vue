<template>
  <div class="weight-chart relative h-64">
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
        <span v-if="tooltipData.petName">{{ tooltipData.petName }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as d3 from 'd3';
import { parseDate } from '@internationalized/date';

const props = defineProps({
  data: {
    type: Array,
    required: true
  },
  petName: {
    type: String,
    default: ''
  }
});

const frFR = d3.timeFormatDefaultLocale({
  "dateTime": "%A %e %B %Y à %X",
  "date": "%d/%m/%Y",
  "time": "%H:%M:%S",
  "periods": ["AM", "PM"],
  "days": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
  "shortDays": ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
  "months": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
  "shortMonths": ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."]
})

// Chart refs and state
const chart = ref(null);
const chartContainer = ref(null);

// Tooltip state
const showTooltip = ref(false);
const tooltipData = ref({ date: '', weight: 0, petName: '' });
const tooltipPosition = ref({ left: '0px', top: '0px' });

// Process data for chart display
const processedData = computed(() => {
  if (!props.data || !props.data.length) return [];

  return props.data.map(entry => {
    try {
      const date = typeof entry.date === 'string' ? entry.date : entry.date.toString();
      return {
        date: date,
        parsedDate: parseDate(date).toDate(),
        weight: entry.weight,
        petName: entry.name || props.petName
      };
    } catch (e) {
      console.error("Error processing weight entry:", e);
      return null;
    }
  }).filter(Boolean);
});

// Get color for each pet in multi-pet view
const colorScale = computed(() => {
  const petNames = [...new Set(processedData.value.map(d => d.petName))];
  return d3.scaleOrdinal()
      .domain(petNames)
      .range(d3.schemeCategory10);
});

// Methods
const formatDate = (date) => {
  if (!date) return '';
  try {
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch (e) {
    console.error("Error formatting date:", e);
    return date;
  }
};

// Show tooltip when hovering over a data point
const showTooltipForPoint = (d, event) => {
  tooltipData.value = d;

  const svgElement = chart.value;
  const rect = svgElement.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

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

// Chart rendering
const drawChart = () => {
  if (!chart.value || !processedData.value.length) return;

  const svg = d3.select(chart.value);
  svg.selectAll("*").remove();

  const margin = { top: 20, right: 30, bottom: 30, left: 40 };
  const width = chart.value.clientWidth - margin.left - margin.right;
  const height = chart.value.clientHeight - margin.top - margin.bottom;

  // Create a group element for the chart with margins
  const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

  // Set up scales
  const xScale = d3.scaleTime()
      .domain(d3.extent(processedData.value, d => d.parsedDate))
      .range([0, width]);

  const weightValues = processedData.value.map(d => d.weight);
  const minWeight = Math.floor(d3.min(weightValues) - 1);
  const maxWeight = Math.ceil(d3.max(weightValues) + 1);

  const yScale = d3.scaleLinear()
      .domain([minWeight, maxWeight])
      .range([height, 0]);

  // Add the X and Y axes
  g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(xScale).ticks(5).tickFormat(frFR.format("%b/%y")))
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

  // If we have a single pet or "all" view but with one pet
  if (props.petName !== 'Tous' || [...new Set(processedData.value.map(d => d.petName))].length === 1) {
    // Create the line generator
    const line = d3.line()
        .x(d => xScale(d.parsedDate))
        .y(d => yScale(d.weight))
        .curve(d3.curveMonotoneX);

    // Add the line path
    g.append("path")
        .datum(processedData.value)
        .attr("fill", "none")
        .attr("stroke", "#3b82f6")
        .attr("stroke-width", 2)
        .attr("d", line);

    // Add data points with hover event handlers
    g.selectAll(".data-point")
        .data(processedData.value)
        .enter()
        .append("circle")
        .attr("class", "data-point")
        .attr("cx", d => xScale(d.parsedDate))
        .attr("cy", d => yScale(d.weight))
        .attr("r", 4)
        .attr("fill", "#3b82f6")
        .attr("stroke", "#fff")
        .attr("stroke-width", 2)
        .on("mouseenter", (event, d) => showTooltipForPoint(d, event))
        .on("mouseleave", hideTooltip);
  } else {
    // Group data by pet name
    const nestedData = d3.group(processedData.value, d => d.petName);

    // Create a line for each pet
    nestedData.forEach((values, petName) => {
      // Sort values by date
      values.sort((a, b) => a.parsedDate - b.parsedDate);

      // Create the line generator
      const line = d3.line()
          .x(d => xScale(d.parsedDate))
          .y(d => yScale(d.weight))
          .curve(d3.curveMonotoneX);

      // Add the line path
      g.append("path")
          .datum(values)
          .attr("fill", "none")
          .attr("stroke", colorScale.value(petName))
          .attr("stroke-width", 2)
          .attr("d", line);

      // Add data points with hover event handlers
      g.selectAll(`.data-point-${petName.replace(/\s+/g, '-')}`)
          .data(values)
          .enter()
          .append("circle")
          .attr("class", `data-point-${petName.replace(/\s+/g, '-')}`)
          .attr("cx", d => xScale(d.parsedDate))
          .attr("cy", d => yScale(d.weight))
          .attr("r", 4)
          .attr("fill", colorScale.value(petName))
          .attr("stroke", "#fff")
          .attr("stroke-width", 2)
          .on("mouseenter", (event, d) => showTooltipForPoint(d, event))
          .on("mouseleave", hideTooltip);
    });

    // Add a legend
    const legend = g.append("g")
        .attr("transform", `translate(${width + 5}, 0)`);

    Array.from(nestedData.keys()).forEach((petName, i) => {
      const legendRow = legend.append("g")
          .attr("transform", `translate(0, ${i * 20})`);

      legendRow.append("rect")
          .attr("width", 10)
          .attr("height", 10)
          .attr("fill", colorScale.value(petName));

      legendRow.append("text")
          .attr("x", 15)
          .attr("y", 10)
          .attr("font-size", "12px")
          .attr("class", "text-gray-700 dark:text-gray-300")
          .text(petName);
    });
  }

  // Larger invisible circles for better hover detection
  g.selectAll(".hover-area")
      .data(processedData.value)
      .enter()
      .append("circle")
      .attr("class", "hover-area")
      .attr("cx", d => xScale(d.parsedDate))
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

// Redraw chart if data changes
watch(() => props.data, () => {
  drawChart();
}, { deep: true });
</script>

<style scoped>
.weight-chart {
  border: 1px solid rgba(203, 213, 225, 0.5);
  border-radius: 0.5rem;
  padding: 1rem;
  background-color: rgba(248, 250, 252, 0.5);
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