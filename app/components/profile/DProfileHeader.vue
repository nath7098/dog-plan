<template>
  <div>
    <div class="flex gap-4">
      <div class="relative group">
        <UAvatar
            :src="avatarDisplay"
            icon="i-fluent-animal-dog-16-regular" :ui="{root: 'size-25 text-7xl'}"/>
        <UButton icon="i-heroicons-pencil-square-16-solid"
                 variant="link" color="neutral"
                 class="hidden md:flex justify-center absolute inset-0 p-0! m-0! rounded-full text-transparent group-hover:text-neutral-500/50! group-hover:backdrop-blur-xs cursor-pointer transition-backdrop duration-300"
                 :ui="{leadingIcon: 'size-15!'}"
                 @click="onChangeAvatar"
        />
        <UButton icon="i-heroicons-pencil-square-16-solid"
                 variant="outline"
                 color="neutral"
                 class="block md:hidden size-8! absolute bottom-0 left-[50%] transform -translate-x-[50%] translate-y-[50%] rounded-full"
                 @click="onChangeAvatar"
        />
        <input
            type="file"
            ref="fileInput"
            accept="image/*"
            class="hidden"
            @change="handleFileUpload"
        />
      </div>
      <div class="flex flex-col justify-center text-neutral-500 dark:text-neutral-400">
        <div v-if="gender" class="text-xl">{{name}} <UIcon :name="gender === 'male' ? 'i-ic-baseline-male' : 'i-ic-baseline-female'" :class="[gender === 'male' ? 'text-blue-500' : 'text-pink-500']" /></div>
        <div>
          <span v-if="displayAge">{{displayAge}}</span>
          <UButton variant="link" color="neutral" @click="toggleWeightHistory" class="font-medium cursor-pointer">
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

const props = defineProps({
  avatar: String,
  name: String,
  birthDate: String,
  gender: String,
  weight: Number
});

const emits = defineEmits(['open:weight', 'change:avatar']);

const fileInput = ref(null);
const birthDateProp = toRef(props.birthDate);

const age = computed(() => {
  return calculAge(birthDateProp.value);
});

const displayAge = computed(() => {
  return ageToString(age.value);
});

const avatarDisplay = computed(() => props.avatar);

const toggleWeightHistory = () => {
  emits('open:weight');
};

const onChangeAvatar = () => {
  fileInput.value.click();
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Create a temporary URL for the selected file
  const fileURL = URL.createObjectURL(file);
  emits('change:avatar', {fileURL, file});

  // Reset file input
  event.target.value = '';
};


</script>

<style scoped>
/* Optional hover effect for the weight button */
.weight-btn:hover {
  text-decoration: underline;
}
</style>