<template>
    <div class="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-blue-950 transition-colors duration-300">
      <!-- Formes décoratives -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div class="absolute top-10 left-10 w-64 h-64 bg-yellow-200 dark:bg-yellow-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
        <div class="absolute top-40 right-10 w-72 h-72 bg-blue-200 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div class="absolute bottom-10 left-1/3 w-80 h-80 bg-pink-200 dark:bg-pink-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
  
      <div class="w-full max-w-md z-10">
        <!-- Logo et titre -->
        <div class="text-center mb-8">
          <div class="inline-block p-5 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-6 relative">
            <div class="text-amber-500 dark:text-amber-400">
              <UIcon name="i-tabler-paw" class="h-12 w-12" />
            </div>
          </div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">PawData</h1>
          <p class="text-lg text-gray-600 dark:text-gray-300">La plateforme pour gérer vos données canines</p>
        </div>
  
        <!-- Carte de connexion -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-700">
          <div class="mb-8 text-center">
            <UButton
              size="xl"
              variant="outline"
              color="neutral"
              class="w-full cursor-pointer group relative flex items-center justify-center gap-3 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 py-3 rounded-xl"
              @click="login"
            >
              <UIcon name="i-devicon-google" class="h-5 w-5" />
              <span class="text-gray-700 dark:text-gray-300 font-medium">Connexion avec Google</span>
            </UButton>
          </div>
          
          <div class="flex items-center gap-4 mb-8">
            <div class="h-px bg-gray-300 dark:bg-gray-700 flex-grow"></div>
            <div class="text-gray-500 dark:text-gray-400 text-sm font-medium px-2">ou connectez-vous plus tard</div>
            <div class="h-px bg-gray-300 dark:bg-gray-700 flex-grow"></div>
          </div>
          
          <div class="flex flex-col items-center justify-center space-y-4">
            <div class="flex -space-x-2">
              <UAvatar icon="i-heroicons-user" class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" />
              <UAvatar icon="i-heroicons-user" class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" />
              <UAvatar icon="i-heroicons-user" class="w-10 h-10 rounded-full border-2 border-white dark:border-gray-800" />
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 text-center">
              Rejoignez plus de 2000 propriétaires et éleveurs qui utilisent déjà PawData
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div class="mt-8 text-center">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            En vous connectant, vous acceptez nos
            <a href="#" class="text-amber-600 dark:text-amber-400 hover:underline font-medium">Conditions d'utilisation</a>
            et notre
            <a href="#" class="text-amber-600 dark:text-amber-400 hover:underline font-medium">Politique de confidentialité</a>
          </p>
          
          <!-- Sélecteur de thème -->
          <div class="mt-6 inline-flex items-center justify-center">
            <UColorModeButton color="amber" variant="outline" class="text-gray-500 dark:text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const client = useSupabaseClient();
  const config = useRuntimeConfig();
  
  const login = async () => {
    const response = await client.auth.signInWithOAuth({
      provider: 'google', 
      options: {
        redirectTo: `${config.public.url}/confirm`
      }
    });
  }
  </script>
  
  <style>
  .animate-blob {
    animation: blob 7s infinite;
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