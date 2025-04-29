<template>
  <div>
    <div class="flex gap-4">
      <UAvatar
          :src="avatar"
          icon="i-fluent-animal-dog-16-regular" :ui="{root: 'size-25 text-7xl'}" />
      <div class="flex flex-col justify-center text-neutral-400">
        <div v-if="gender" class="text-xl">{{name}} <UIcon :name="gender === 'male' ? 'i-ic-baseline-male' : 'i-ic-baseline-female'" :class="[gender === 'male' ? 'text-blue-500' : 'text-pink-500']" /></div>
        <div>
          <span v-if="displayAge">{{displayAge}}</span>
          <UButton variant="link" color="neutral" @click="toggleWeightHistory" class="font-medium">
            {{weight}} kg
            <UIcon name="i-lucide-line-chart" class="ml-1" v-if="!showWeightHistory" />
            <UIcon name="i-lucide-x" class="ml-1" v-else />
          </UButton>
        </div>
      </div>
    </div>


  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { ageToString, calculAge } from '~/utils/dates';

const props = defineProps({
  avatar: String,
  name: String,
  birthDate: String,
  gender: String,
  weight: Number
});

const emits = defineEmits(['open:weight']);

const birthDateProp = toRef(props.birthDate);

const age = computed(() => {
  return calculAge(birthDateProp.value);
});

const displayAge = computed(() => {
  return ageToString(age.value);
});

const toggleWeightHistory = () => {
  emits('open:weight');
};

</script>

<style scoped>
/* Optional hover effect for the weight button */
.weight-btn:hover {
  text-decoration: underline;
}
</style>