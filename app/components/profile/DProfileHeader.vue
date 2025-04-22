<template>
  <div class="flex gap-4">
    <UAvatar
        :src="avatar"
        icon="i-fluent-animal-dog-16-regular" :ui="{root: 'size-25 text-7xl'}" />
    <div class="flex flex-col justify-center text-neutral-400">
      <div v-if="gender" class="text-xl">{{name}} <UIcon :name="gender === 'male' ? 'i-ic-baseline-male' : 'i-ic-baseline-female'" :class="[gender === 'male' ? 'text-blue-500' : 'text-pink-500']" /></div>
      <div>
        <span v-if="displayAge">{{displayAge}}</span>
        <UButton v-if="weight" variant="link" color="neutral">{{weight}} kg</UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps(['avatar', 'name', 'birthDate', 'gender', 'weight']);
const birthDateProp = toRef(props.birthDate);

const age = computed(() => {
  if (!birthDateProp.value) {
    return;
  }
  const dob = new Date(birthDateProp.value);
  const today = new Date();
  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();

  if (age === 0) {
    return {years, months};
  }

  if (months < 0 || (months === 0 && today.getDate() < dob.getDate())) {
    years--;
    months = 12 + months + +(months === 0);
    return {years, months};
  }

  return {years, months};
});
const displayAge = computed(() => {
  if (!age.value) {
    return;
  }
  if (age.value.years === 0) {
    return `${age.value.months} mois`;
  }
  return `${age.value.years} an${age.value.years > 1 ? 's' : ''} ${age.value.months} mois`;
});

</script>