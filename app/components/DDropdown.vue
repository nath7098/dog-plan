<template>
  <UDropdown>
    <!-- Add this template to provide a custom account slot for the user dropdown -->
    <template #account="{ item }">
      <div class="flex items-center gap-3 px-4 py-2">
        <UAvatar
            :src="user?.user_metadata?.avatar_url"
            :alt="userName"
            size="sm"
            class="ring-2 ring-amber-500/20"
        />
        <div class="flex flex-col">
          <span class="font-medium text-gray-900 dark:text-white">{{ item.label }}</span>
          <span class="text-xs text-gray-500 dark:text-gray-400">{{ user?.email }}</span>
        </div>
      </div>
    </template>
  </UDropdown>
</template>

<script setup>
// This is a global component that extends UDropdown functionality
// Access user information for the dropdown display
const user = useSupabaseUser();

// Format user name
const userName = computed(() => {
  if (user.value?.identities) {
    return user.value.identities[0].identity_data.full_name || user.value.identities[0].identity_data.name;
  } else if (user.value?.user_metadata) {
    return user.value.user_metadata.full_name || user.value.user_metadata.name;
  }
  return 'Mon Compte';
});
</script>