<template>
  <div class="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-950 transition-colors duration-300">
    <!-- Formes décoratives (blobs) matching your other pages -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div class="absolute top-10 left-10 w-64 h-64 bg-yellow-200 dark:bg-yellow-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute top-40 right-10 w-72 h-72 bg-blue-200 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-10 left-1/3 w-80 h-80 bg-pink-200 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <div class="w-full max-w-md z-10 text-center">
      <!-- Logo et titre -->
      <div class="text-center mb-8">
        <div class="inline-block p-5 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-6 relative">
          <div class="text-amber-500 dark:text-amber-400">
            <UIcon name="i-tabler-paw" class="h-12 w-12" />
          </div>
        </div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">PawData</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">Connexion en cours...</p>
      </div>

      <!-- Carte de chargement -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-700">
        <div class="flex flex-col items-center py-4">
          <!-- Animation de chargement -->
          <div class="flex items-center justify-center mb-6">
            <UIcon name="i-tabler-paw" class="h-8 w-8 text-amber-500 dark:text-amber-400 animate-bounce" />
            <div class="ml-3 flex space-x-2">
              <div class="h-3 w-3 bg-amber-500 dark:bg-amber-400 rounded-full animate-bounce"></div>
              <div class="h-3 w-3 bg-amber-500 dark:bg-amber-400 rounded-full animate-bounce animation-delay-200"></div>
              <div class="h-3 w-3 bg-amber-500 dark:bg-amber-400 rounded-full animate-bounce animation-delay-400"></div>
            </div>
          </div>

          <p class="text-gray-700 dark:text-gray-300 font-medium mb-2">Authentification en cours</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Vous serez redirigé vers votre tableau de bord dans un instant
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Un problème avec la connexion ?
          <a href="/login" class="text-amber-600 dark:text-amber-400 hover:underline font-medium">Réessayer</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const router = useRouter();

// Adding a loading state to show the loading animation for at least 1.5 seconds
const isLoading = ref(true);
const minLoadingTime = 1500; // 1.5 seconds minimum loading time for better UX
const startTime = Date.now();

// Function to redirect with minimum loading time
const redirectToDashboard = () => {
  const elapsedTime = Date.now() - startTime;
  const remainingTime = Math.max(0, minLoadingTime - elapsedTime);

  setTimeout(() => {
    isLoading.value = false;
    navigateTo('/');
  }, remainingTime);
};

// Watch for user authentication and redirect when ready
watch(user, (newUser) => {
  if (newUser) {
    redirectToDashboard();
  }
}, { immediate: true });

// Add a timeout in case authentication takes too long
setTimeout(() => {
  if (isLoading.value && !user.value) {
    // If still loading after 10 seconds and no user, redirect back to login
    navigateTo('/login');
  }
}, 10000);
</script>

<style>
.animate-blob {
  animation: blob 7s infinite;
}
.animation-delay-200 {
  animation-delay: 0.2s;
}
.animation-delay-400 {
  animation-delay: 0.4s;
}
.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}

@keyframes blob {
  0% {
    transform: translate(0px, 0px) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
  100% {
    transform: translate(0px, 0px) scale(1);
  }
}
</style>
