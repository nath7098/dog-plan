<template>
  <div>
    <div class="mb-6">
      <h2 class="text-4xl ">Nourriture</h2>
      <p class="font-italic">{{ name }} mange
        <UInput v-model="meal" type="text" variant="ghost" color="neutral" class="relative meal" :style="{width: `${(meal+'').length + 4}ch`}" @change="updateMealQuantity" />
        de croquettes par jour !</p>
    </div>
    <div class="flex flex-col gap-y-4">
      <UButton icon="i-lucide-package-plus" variant="outline" color="neutral" @click="addFoodBag">
        J'ai acheté un sac de croquettes !
      </UButton>
      <UButton v-if="currentFoodBag" icon="i-lucide-package-open" variant="outline" color="neutral"
               class="relative overflow-hidden current-food" @click="finishFoodBag">
        <span :class="['current-food-progress', 'absolute', 'top-0 left-0 bottom-0',
           {'bg-green-500/25': currentFoodBag.used.percentage < 75,
            'bg-amber-500/25' : currentFoodBag.used.percentage >= 75 && currentFoodBag.used.percentage < 90,
            'bg-red-500/25': currentFoodBag.used.percentage >= 90}]"
        :style="{width: `${currentFoodBag.used.display}%`}"></span>
        <span class="current-food-text">1 sac de croquettes</span>
        <span class="current-food-finish">Sac terminé !</span>
      </UButton>
      <UButton v-if="stockFoodBags && stockFoodBags.length" icon="i-lucide-package" variant="outline" color="neutral" :class="['relative overflow-hidden', !currentFoodBag && 'stock-food']" @click="openFoodBag">
        <span v-if="!currentFoodBag" class="stock-food-progress absolute top-0 left-0 bottom-0 bg-green-500/25 w-0"></span>
        <span class="stock-food-text">{{ stockDisplay }}</span>
        <span v-if="!currentFoodBag" class="stock-food-open">Ouvrir le sac !</span>
      </UButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps(['name', 'mealQuantity', 'food']);
const emits = defineEmits(['update:meal', 'add:food', 'open:food', 'finish:food']);
const meal = toRef(props.mealQuantity);
const foodBags = toRef(props.food);

const currentFoodBag = computed({
  get() {
    const current = foodBags.value?.find(f => f.state === 'open');
    if (!current) {
       return;
    }
    return {...current, used: computeFoodBagPercentage(current)}
  },
  set(state: string) {
    const current = foodBags.value?.find(f => f.state === 'open');
    if (current) {
      current!.state = state;
    }
  }
});
const stockFoodBags = computed(() => foodBags.value?.filter(f => f.state === 'stock'));
const stockDisplay = computed(() => stockFoodBags.value ? `${stockFoodBags.value.length} sac${stockFoodBags.value.length > 1 ? 's' : ''} en réserve` : '');

const computeFoodBagPercentage = (bag) => {
  const daysOpenBag = Math.ceil((new Date().getTime() - bag.openDate.getTime()) / (1000 * 3600 * 24));
  const quantityUsed = daysOpenBag * props.mealQuantity;
  const percentage = quantityUsed * 100 / (bag.weight * 1000);
  return {percentage, display: Math.min(Math.ceil(percentage / 10) * 10, 100)};
}

const addFoodBag = () => {
  emits('add:food', {
    brand: 'Wilderness',
    weight: 12,
    state: 'stock',
  })
}

const finishFoodBag = () => {
  emits('finish:food');
}

const openFoodBag = () => {
  emits('open:food');
}

const updateMealQuantity = () => {
  emits('update:meal', meal);
}
</script>

<style scoped>
.meal::after {
  content: 'g';
  position: absolute;
  right: 7px;
  vertical-align: middle;
}

.current-food, .stock-food {
  transition: all .3s ease;
}

.current-food-progress, .stock-food-progress {
  transition: width 0.3s ease-out;
}

.current-food-text, .current-food-finish, .stock-food-text, .stock-food-open {
  transition: opacity 0.3s ease, transform 0.3s ease;
  position: absolute;
  width: 100%;
  margin-left: calc(var(--spacing) * 7);
  text-align: left;
}

.current-food-finish, .stock-food-open {
  opacity: 0;
  transform: translateY(20px);
}

.current-food:hover .current-food-text, .stock-food:hover .stock-food-text {
  opacity: 0;
  transform: translateY(-20px);
}

.current-food-text, .current-food:hover .current-food-finish, .stock-food-text, .stock-food:hover .stock-food-open {
  opacity: 1;
  transform: translateY(0);
}

.current-food:hover .current-food-progress, .stock-food:hover .stock-food-progress {
  width: 100% !important;
}


</style>