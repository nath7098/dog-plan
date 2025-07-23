<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- Modern gradient background -->
    <div class="fixed inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-amber-950/20 -z-10"></div>
    
    <!-- Top Navigation (Desktop & Tablet) -->
    <nav class="hidden md:block fixed top-0 left-0 right-0 z-50">
      <div class="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <!-- Logo and Brand -->
            <NuxtLink to="/" class="flex items-center gap-3 group">
              <div class="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <UIcon name="i-tabler-paw" class="text-white text-xl"/>
              </div>
              <div class="hidden lg:block">
                <span class="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">PawData</span>
                <div class="text-xs text-gray-500 dark:text-gray-400">Soins pour animaux</div>
              </div>
            </NuxtLink>

            <!-- Navigation Links (Center) -->
            <div class="flex items-center gap-2">
              <UButton
                to="/"
                variant="ghost"
                color="gray"
                class="font-medium"
                :class="$route.path === '/' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' : ''"
              >
                <UIcon name="i-heroicons-home" class="mr-2"/>
                <span class="hidden lg:inline">Accueil</span>
              </UButton>
              <UButton
                to="/stats"
                variant="ghost"
                color="gray"
                class="font-medium"
                :class="$route.path === '/stats' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' : ''"
              >
                <UIcon name="i-heroicons-chart-bar" class="mr-2"/>
                <span class="hidden lg:inline">Statistiques</span>
              </UButton>
              <UButton
                to="/calendar"
                variant="ghost"
                color="gray"
                class="font-medium"
                :class="$route.path === '/calendar' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' : ''"
              >
                <UIcon name="i-heroicons-calendar-days" class="mr-2"/>
                <span class="hidden lg:inline">Calendrier</span>
              </UButton>
              <UButton
                to="/settings"
                variant="ghost"
                color="gray"
                class="font-medium"
                :class="$route.path === '/settings' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400' : ''"
              >
                <UIcon name="i-heroicons-cog-6-tooth" class="mr-2"/>
                <span class="hidden lg:inline">Paramètres</span>
              </UButton>
            </div>

            <!-- User Menu (Right) -->
            <div class="flex items-center gap-3">
              <!-- Notifications -->
              <UButton variant="ghost" color="gray" size="sm" class="relative">
                <UIcon name="i-heroicons-bell"/>
                <span class="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">3</span>
              </UButton>
              
              <!-- User Dropdown -->
              <UDropdownMenu :items="userMenuItems">
                <UButton variant="ghost" color="gray" class="p-1">
                  <div class="flex items-center gap-2">
                    <UAvatar
                      :src="user?.user_metadata?.avatar_url"
                      :alt="userName"
                      size="sm"
                      class="ring-2 ring-amber-200 dark:ring-amber-800"
                    />
                    <div class="hidden lg:block text-left">
                      <div class="text-sm font-medium text-gray-900 dark:text-white">{{ userName }}</div>
                      <div class="text-xs text-gray-500 dark:text-gray-400">Propriétaire</div>
                    </div>
                    <UIcon name="i-heroicons-chevron-down" class="text-gray-400"/>
                  </div>
                </UButton>
              </UDropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="md:pt-16 pb-20 md:pb-0 min-h-screen">
      <slot />
    </main>

    <!-- Bottom Navigation (Mobile) -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 shadow-lg">
        <div class="grid grid-cols-5 gap-1 px-2 py-2">
          <NuxtLink
            to="/"
            class="flex flex-col items-center justify-center p-2 rounded-xl transition-all"
            :class="$route.path === '/' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'"
          >
            <UIcon name="i-heroicons-home" class="text-xl mb-1"/>
            <span class="text-xs font-medium">Accueil</span>
          </NuxtLink>
          
          <NuxtLink
            to="/stats"
            class="flex flex-col items-center justify-center p-2 rounded-xl transition-all"
            :class="$route.path === '/stats' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'"
          >
            <UIcon name="i-heroicons-chart-bar" class="text-xl mb-1"/>
            <span class="text-xs font-medium">Stats</span>
          </NuxtLink>
          
          <!-- Floating Action Button for Adding Pet -->
          <NuxtLink
            to="/nouveau"
            class="flex flex-col items-center justify-center -mt-6"
          >
            <div class="w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
              <UIcon name="i-heroicons-plus" class="text-white text-2xl"/>
            </div>
            <span class="text-xs font-medium text-gray-600 dark:text-gray-400 mt-1">Ajouter</span>
          </NuxtLink>
          
          <NuxtLink
            to="/calendar"
            class="flex flex-col items-center justify-center p-2 rounded-xl transition-all"
            :class="$route.path === '/calendar' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'"
          >
            <UIcon name="i-heroicons-calendar-days" class="text-xl mb-1"/>
            <span class="text-xs font-medium">Agenda</span>
          </NuxtLink>
          
          <NuxtLink
            to="/settings"
            class="flex flex-col items-center justify-center p-2 rounded-xl transition-all"
            :class="$route.path === '/settings' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'"
          >
            <UIcon name="i-heroicons-cog-6-tooth" class="text-xl mb-1"/>
            <span class="text-xs font-medium">Réglages</span>
          </NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const { auth } = useSupabaseClient();

// Get user name from auth metadata
const userName = computed(() => {
  if (user.value?.identities?.length) {
    return user.value.identities[0].identity_data?.full_name || user.value.identities[0].identity_data?.name;
  } else if (user.value?.user_metadata) {
    return user.value.user_metadata.full_name || user.value.user_metadata.name;
  }
  return 'Mon Compte';
});

// User menu items  
const userMenuItems = computed(() => [
  {
    label: userName.value,
    icon: 'i-heroicons-user-circle',
    disabled: true
  },
  {
    label: 'Mon profil',
    icon: 'i-heroicons-user-circle',
    onSelect: () => navigateTo('/profile')
  },
  {
    label: 'Paramètres',
    icon: 'i-heroicons-cog-6-tooth',
    onSelect: () => navigateTo('/settings')
  },
  {
    label: 'Déconnexion',
    icon: 'i-heroicons-arrow-right-on-rectangle',
    onSelect: logout
  }
]);

const logout = async () => {
  try {
    console.log('Logout function called'); // Debug log
    await auth.signOut();
    await navigateTo('/landing');
  } catch (error) {
    console.error('Error logging out:', error);
    // Fallback: try to navigate anyway
    await navigateTo('/landing');
  }
};
</script>