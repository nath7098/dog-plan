<template>
  <div class="p-4">
    <DProfileHeader :avatar="avatar" :name="name" :gender="gender" :birth-date="birthDate" :weight="weight"  />
    <USeparator class="my-4" />
    <DProfileFood :name="name" :meal-quantity="mealQuantity" @update-meal="onMealUpdated" class="w-90" />
    <USeparator class="my-4" />
    <DProfileFlee :name="name" class="w-90" />
  </div>
</template>

<script lang="ts" setup>
import DProfileHeader from '~/components/profile/DProfileHeader.vue';
import DProfileFood from '~/components/profile/DProfileFood.vue';
import { RangeCalendar } from '~/components/ui/range-calendar';
import DProfileFlee from '~/components/profile/DProfileFlee.vue';

const avatar = ref('https://images.unsplash.com/photo-1678818546240-2702b53da4da?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
const name = ref('Venise');
const gender = ref('female')
const birthDate = ref('2024-10-15');
const weight = ref(15);
const mealQuantity = ref(309)

const onMealUpdated = (meal) => {
  console.log(meal)
  mealQuantity.value = Number(meal.value);
}
</script>
