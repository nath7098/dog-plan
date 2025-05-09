<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
    <!-- Top Navigation (Desktop) -->
    <nav class="hidden md:flex fixed top-0 left-0 right-0 backdrop-blur-md shadow-sm z-50 px-4">
        <div class="container mx-auto flex justify-between items-center h-16">
          <!-- Logo and Brand -->
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <UIcon name="i-tabler-paw" class="text-amber-500 h-6 w-6"/>
            <span class="text-lg font-semibold text-gray-900 dark:text-white">PawData</span>
          </NuxtLink>

          <!-- Navigation Links (Middle) -->
          <div class="flex items-center gap-1">
            <DNavLink to="/" icon="i-heroicons-home" label="Accueil"/>
            <DNavLink to="/stats" icon="i-heroicons-chart-bar" label="Statistiques"/>
            <DNavLink to="/calendar" icon="i-heroicons-calendar" label="Calendrier"/>
            <DNavLink to="/settings" icon="i-heroicons-cog-6-tooth" label="Paramètres"/>
          </div>

          <!-- User Menu (Right) -->
          <div class="flex items-center gap-3">
            <UDropdownMenu :items="userMenuItems" :popper="{ placement: 'bottom-end' }">
              <UButton variant="ghost" class="rounded-full">
                <UAvatar
                    :src="user?.user_metadata?.avatar_url"
                    :alt="user?.user_metadata?.full_name || ''"
                    size="sm"
                />
                <span class="ml-2 hidden lg:inline">{{ userName }}</span>
                <UIcon name="i-heroicons-chevron-down" class="ml-1 text-xs"/>
              </UButton>
            </UDropdownMenu>
          </div>
        </div>
      </nav>

    <!-- Main Content with padding to account for navigation bars -->
    <main class="md:pt-16 pb-20 md:pb-0 min-h-screen">
      <slot />
    </main>

    <!-- Bottom Navigation (Mobile) -->
    <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-white/30 dark:bg-indigo-950/30 backdrop-blur-md  shadow-[0_-2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_10px_rgba(0,0,0,0.2)] z-50">
      <div class="flex justify-around items-center h-16">
        <DNavLinkMobile to="/" icon="i-heroicons-home" label="Accueil" />
        <DNavLinkMobile to="/stats" icon="i-heroicons-chart-bar" label="Stats" />
        <DNavLinkMobile
            to="/nouveau"
            icon="i-heroicons-plus-circle"
            label="Nouveau"
            class="relative -mt-8 bg-gradient-to-r from-amber-500 to-amber-600 text-white p-4 rounded-full shadow-lg"
        />
        <DNavLinkMobile to="/calendar" icon="i-heroicons-calendar" label="Agenda" />
        <DNavLinkMobile to="/settings" icon="i-heroicons-cog-6-tooth" label="Réglages" />
      </div>
    </nav>
  </div>
</template>

<script setup>
// Access authentication user
import DNavLinkMobile from '~/components/DNavLinkMobile.vue';

const user = useSupabaseUser();

// Get user name from auth metadata
const userName = computed(() => {
  if (user.value?.identities) {
    return user.value.identities[0].identity_data.full_name || user.value.identities[0].identity_data.name;
  } else if (user.value?.user_metadata) {
    return user.value.user_metadata.full_name || user.value.user_metadata.name;
  }
  return 'Mon Compte';
});

// User menu items
const userMenuItems = computed(() => [
  [
    {
      label: userName.value,
      slot: 'account',
      disabled: true
    },
    {
      label: 'Mon profil',
      icon: 'i-heroicons-user-circle',
      to: '/profile'
    }
  ],
  [
    {
      label: 'Déconnexion',
      icon: 'i-heroicons-arrow-right-on-rectangle',
      onSelect: () => logout()
    }
  ]
]);

// Handle logout (integrate with your auth system)
const { auth } = useSupabaseClient();
const router = useRouter();

const logout = async () => {
  try {
    await auth.signOut({scope: 'local'})
    navigateTo('/landing');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
</script>