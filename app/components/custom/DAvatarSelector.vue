<template>
  <UFormField label="Photo" name="avatar">
    <!-- Selected avatar preview -->
    <div class="mb-4 flex justify-center">
      <UAvatar
          :src="modelValue || (defaultAvatar && defaultAvatar != '')"
          :icon="'i-fluent-animal-dog-16-regular'"
          size="2xl"
          class="shadow-sm"
          :ui="{ rounded: 'rounded-xl' }"
      />
    </div>

    <!-- Avatar selection grid -->
    <div class="grid grid-cols-4 gap-3">
      <div
          v-for="avatar in defAvatars"
          :key="avatar"
          class="cursor-pointer rounded-lg p-1 border-2 transition-all duration-200 transform hover:scale-105"
          :class="modelValue === avatar.fileURL ? 'border-primary-500 bg-primary-50' : 'border-transparent hover:border-neutral-200'"
          @click="updateValue(avatar)"
      >
        <UAvatar
            :src="avatar.fileURL"
            size="lg"
            :ui="{ rounded: 'rounded-lg' }"
        />
      </div>

      <!-- Upload button -->
      <div
          class="cursor-pointer rounded-lg p-1 border-2 border-dashed border-neutral-300 flex items-center justify-center hover:bg-neutral-50 transition-colors duration-200"
          @click="openFileInput"
      >
        <UIcon name="i-lucide-upload" class="text-2xl text-neutral-500" />
        <input
            type="file"
            ref="fileInput"
            accept="image/*"
            class="hidden"
            @change="handleFileUpload"
        />
      </div>
    </div>
  </UFormField>
</template>
<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  avatars: {
    type: Array,
    default: () => [
      {fileURL: 'https://images.unsplash.com/photo-1678818546240-2702b53da4da?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', file: null},
    ]
  },
  defaultAvatar: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const fileInput = ref(null);
const defAvatars = toRef(props.avatars);

const updateValue = (a) => {
  emit('update:modelValue', {fileURL: a.fileURL, file: a.file});
};

const openFileInput = () => {
  fileInput.value.click();
};

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  // Create a temporary URL for the selected file
  const fileURL = URL.createObjectURL(file);

  // In a real app, you'd upload the file to your server here
  // and then update with the returned path
  // For this example, we'll just use the temporary URL
  defAvatars.value.push({fileURL, file});
  emit('update:modelValue', {fileURL, file});

  // Reset file input
  event.target.value = '';
};
</script>