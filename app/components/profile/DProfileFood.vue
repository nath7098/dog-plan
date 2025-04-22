<template>
  <div>
    <div class="mb-6">
      <h2 class="text-4xl ">Nourriture</h2>
      <p class="font-italic">{{ name }} mange
        <UInput v-model="meal" type="text" variant="ghost" color="neutral" class="relative meal" :style="{width: `${(meal+'').length + 4}ch`}" @change="updateMealQuantity" />
        de croquettes par jour !</p>
    </div>
    <div class="flex flex-col w-80 gap-y-4">
      <UButton icon="i-lucide-package-plus" variant="outline" color="neutral" @click="addFoodBag">
        J'ai acheté un sac de croquettes !
      </UButton>
      <UButton v-if="currentFoodBag" icon="i-lucide-package-open" variant="outline" color="neutral"
               class="relative overflow-hidden current-food">
        <span :class="['current-food-progress', 'absolute', 'top-0 left-0 bottom-0',
           {'bg-green-500/25': currentFoodBag.used.percentage < 75,
            'bg-amber-500/25' : currentFoodBag.used.percentage >= 75 && currentFoodBag.used.percentage < 90,
            'bg-red-500/25': currentFoodBag.used.percentage >= 90}]"
        :style="{width: `${currentFoodBag.used.display}%`}"></span>
        <span class="current-food-text">1 sac de croquettes</span>
        <span class="current-food-finish">Sac terminé !</span>
      </UButton>
      <UButton v-if="stockFoodBags" icon="i-lucide-package" variant="outline" color="neutral">{{ stockDisplay }}</UButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps(['name', 'mealQuantity']);
const emits = defineEmits(['updateMeal']);
const meal = toRef(props.mealQuantity);
const foodBags = ref([
  {
    brand: 'Wilderness',
    weight: 12,
    state: 'open',
    openDate: new Date('2025-03-21')
  },
  {
    brand: 'Wilderness',
    weight: 12,
    state: 'stock',
  }
]);

const currentFoodBag = computed(() => {
  const current = foodBags.value.find(f => f.state === 'open');
  return {...current, used: computeFoodBagPercentage(current)}
});
const stockFoodBags = computed(() => foodBags.value.filter(f => f.state === 'stock'));
const stockDisplay = computed(() => `${stockFoodBags.value.length} sac${stockFoodBags.value.length > 1 ? 's' : ''} en réserve`);

const computeFoodBagPercentage = (bag) => {
  const daysOpenBag = Math.ceil((new Date().getTime() - bag.openDate.getTime()) / (1000 * 3600 * 24));
  const quantityUsed = daysOpenBag * props.mealQuantity;
  const percentage = quantityUsed * 100 / (bag.weight * 1000);
  return {percentage, display: Math.min(Math.ceil(percentage / 10) * 10, 100)};
}

const addFoodBag = () => {
  foodBags.value.push({
    brand: 'Wilderness',
    weight: 12,
    state: 'stock',
  })
}

const finishFoodBag = () => {

}

const updateMealQuantity = () => {
  emits('updateMeal', meal);
}
</script>

<style scoped>
.meal::after {
  content: 'g';
  position: absolute;
  right: 7px;
  vertical-align: middle;
}

.current-food:hover {
  & .current-food-text {
    display: none;
  }
  & .current-food-finish {
    display: block;
  }
  & .current-food-progress {
    width: 100% !important;
    background: color-mix(in srgb, var(--color-green-500) 25%, transparent);
  }
}

.current-food-progress {
  transition: width 0.25s ease-in-out;
}
.current-food-text {
  display: block;
}
.current-food-finish {
  display: none;
}
</style>