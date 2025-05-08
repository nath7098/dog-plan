<template>
  <div class="min-h-screen dark:bg-indigo-950 light:bg-indigo-50 transition-colors duration-300">
    <!-- Formes décoratives -->
    <div class="hidden lg:block absolute z-100 top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div
          class="absolute top-10 left-10 w-64 h-64 bg-amber-300 dark:bg-amber-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob"></div>
      <div
          class="absolute top-40 right-10 w-72 h-72 bg-blue-300 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div
          class="absolute bottom-10 left-1/3 w-80 h-80 bg-purple-300 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
    </div>

    <slot />
  </div>
</template>

<style scoped>
/* Les animations pour les blobs */
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

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}

</style>