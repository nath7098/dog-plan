<template>
  <div>
    <div class="mb-6">
      <h2 class="text-4xl ">Nourriture</h2>
      <p class="font-italic">{{ name }} mange
        <UInput v-model="meal" type="text" variant="ghost" color="neutral" class="relative meal"
          :style="{ width: `${(meal + '').length + 4}ch` }" @change="updateMealQuantity" />
        de croquettes par jour !
      </p>
    </div>
    <div class="flex flex-col gap-y-4">
      <UButton icon="i-lucide-package-plus" variant="link"
        class="cursor-pointer text-neutral-800! dark:text-neutral-100! rounded-full backdrop-blur-sm ring-2 ring-neutral-100/20 dark:ring-neutral-700/20 py-3! px-6!"
        @click="addFoodBag">
        J'ai acheté un sac de croquettes !
      </UButton>
      <UButton v-if="currentFoodBag" icon="i-lucide-package-open" variant="link"
        class="cursor-pointer relative overflow-hidden current-food text-neutral-800! dark:text-neutral-100! rounded-full backdrop-blur-sm ring-2 ring-neutral-100/20 dark:ring-neutral-700/20 py-3! px-6!"
        @click="finishFoodBag">
        <span :class="['current-food-progress', 'absolute', 'top-0 left-0 bottom-0 ', {
            'bg-green-500/25': currentFoodBag.used.percentage < 75,
            'bg-amber-500/25': currentFoodBag.used.percentage >= 75 && currentFoodBag.used.percentage < 90,
            'bg-red-500/25md ': currentFoodBag.used.percentage >= 90
          }]"
          :style="{ width: `${currentFoodBag.used.display}%` }"></span>
        <span class="current-food-text text-neutral-800 dark:text-neutral-100">{{ currentFoodBag.brand }} - {{
          currentFoodBag.weight }} kg</span>
        <span class="current-food-finish text-neutral-800 dark:text-neutral-100">Sac terminé !</span>
      </UButton>
      <UButton v-if="stockFoodBags && stockFoodBags.length" icon="i-lucide-package" variant="link"
        :class="['cursor-pointer relative overflow-hidden text-neutral-800! dark:text-neutral-100! rounded-full backdrop-blur-sm ring-2 ring-neutral-100/20 dark:ring-neutral-700/20 py-3! px-6!', !currentFoodBag && 'stock-food']"
        @click="openFoodBag" :disabled="currentFoodBag">
        <span v-if="!currentFoodBag"
          class="stock-food-progress absolute top-0 left-0 bottom-0 bg-green-500/25 w-0"></span>
        <span class="stock-food-text text-neutral-800 dark:text-neutral-100">{{ stockDisplay }}</span>
        <span v-if="!currentFoodBag" class="stock-food-open text-neutral-800 dark:text-neutral-100">Ouvrir le sac
          !</span>
      </UButton>
    </div>
    <div v-if="currentFoodBagDate" class="mt-16 flex flex-col gap-y-4">
      <div class="text-neutral-800! dark:text-neutral-100! rounded-full backdrop-blur-sm ring-2 ring-neutral-100/20 dark:ring-neutral-700/20 py-3! px-6!">
        <div class="flex justify-start items-center">
        <UIcon name="i-ic-baseline-edit-calendar" color="neutral" />
        <span class="text-md pl-2 pr-1">Sac ouvert le</span>
        <UPopover>

          <UButton color="neutral" variant="link" class="p-0!">
            {{ currentFoodBagDate ? currentFoodBagDate.toString() : 'Select a date' }}
          </UButton>

          <template #content>
            <UCalendar v-model="currentFoodBagDate" @update:modelValue="onUpdateDateOpenFoodBag" class="p-2" />
          </template>
        </UPopover>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { CalendarDate, parseDate } from '@internationalized/date';
import type Animal from '~~/types/animal';

const props = defineProps(['name']);
const emits = defineEmits(['update:meal', 'open:food', 'finish:food']);
const animalStore = useAnimalStore();
const animal = ref<Animal>(null);

const meal = ref(null);
const currentFoodBagDate = ref<CalendarDate>(null);
const currentFoodBag = computed(() => {
  const current = animal.value?.food?.find(f => f.state === 'open');
  if (!current) {
    return;
  }
  return { ...current, used: foodPercentage(current, animal.value?.mealQuantity) };
});
const stockFoodBags = computed(() => animal.value?.food?.filter(f => f.state === 'stock'));
const stockDisplay = computed(() => stockFoodBags.value ? `${stockFoodBags.value.length} sac${stockFoodBags.value.length > 1 ? 's' : ''} en réserve` : '');


watch(currentFoodBag, () => {
  if (currentFoodBag.value) {
    currentFoodBagDate.value = parseDate(currentFoodBag.value.openDate);
  }
}, {deep: true});

onMounted(() => {
  animal.value = animalStore.animalByName(props.name)!;
  meal.value = animal.value?.mealQuantity!;
})

const addFoodBag = async () => {
  animal.value = await animalStore.addFood({
    animalId: animal.value.id,
    type: 'Dog',
    brand: 'Wilderness',
    weight: 12,
    state: 'stock',
  })!;
}

const finishFoodBag = async () => {
  animal.value = await animalStore.finishFood(animal.value.id);
}

const openFoodBag = async () => {
  animal.value = await animalStore.openFood(animal.value.id);
}

const updateMealQuantity = async () => {
  if (!meal.value || meal.value === '' || meal.value === '0') {
    meal.value = animal.value?.mealQuantity!;
    return;
  }
  animal.value = await animalStore.updateAnimal(animal.value.id, { mealQuantity: Number(meal.value!) });
}

const onUpdateDateOpenFoodBag = async (date: CalendarDate) => {
  animal.value = await animalStore.updateFoodOpenDate(animal.value.id, date)
}
</script>

<style scoped>
.meal::after {
  content: 'g';
  position: absolute;
  right: 7px;
  vertical-align: middle;
}

.current-food,
.stock-food {
  transition: all .3s ease;
}

.current-food-progress,
.stock-food-progress {
  transition: width 0.3s ease-out;
}

.current-food-text,
.current-food-finish,
.stock-food-text,
.stock-food-open {
  transition: opacity 0.3s ease, transform 0.3s ease;
  position: absolute;
  width: 100%;
  margin-left: calc(var(--spacing) * 7);
  text-align: left;
}

.current-food-finish,
.stock-food-open {
  opacity: 0;
  transform: translateY(20px);
}

.current-food:hover .current-food-text,
.stock-food:hover .stock-food-text {
  opacity: 0;
  transform: translateY(-20px);
}

.current-food-text,
.current-food:hover .current-food-finish,
.stock-food-text,
.stock-food:hover .stock-food-open {
  opacity: 1;
  transform: translateY(0);
}

.current-food:hover .current-food-progress,
.stock-food:hover .stock-food-progress {
  width: 100% !important;
}
</style>