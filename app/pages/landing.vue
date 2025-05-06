
<template>
  <div class="min-h-screen dark:bg-gradient-to-br dark:from-gray-900 dark:to-blue-950 light:bg-gradient-to-br light:from-blue-50 light:to-indigo-50 transition-colors duration-300">
    <!-- Formes décoratives -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div class="absolute top-10 left-10 w-64 h-64 bg-amber-200 dark:bg-amber-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob"></div>
      <div class="absolute top-40 right-10 w-72 h-72 bg-blue-200 dark:bg-blue-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-10 left-1/3 w-80 h-80 bg-purple-200 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-overlay filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
    </div>

    <!-- Contenu principal -->
    <div class="container mx-auto px-4 py-12 relative z-10">
      <!-- Navigation -->
      <nav class="flex justify-between items-center mb-16">
        <div class="flex items-center gap-3">
          <div class="bg-white dark:bg-gray-800 p-3 rounded-full shadow-md">
            <UIcon name="i-tabler-paw" class="h-8 w-8 text-amber-500 dark:text-amber-400" />
          </div>
          <span class="text-2xl font-bold text-gray-900 dark:text-white">PawData</span>
        </div>
        <div class="flex items-center gap-4">
          <UButton
              to="/login"
              variant="ghost"
              color="gray"
              class="hidden md:flex items-center gap-1"
          >
            <UIcon name="i-lucide-log-in" class="h-4 w-4" />
            Connexion
          </UButton>
          <UButton
              to="/login"
              color="primary"
              class="bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-600 text-white"
          >
            Commencer maintenant
          </UButton>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="flex flex-col md:flex-row items-center gap-12 py-16">
        <div class="w-full md:w-1/2">
          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            Suivez, planifiez et <span class="text-amber-500 dark:text-amber-400">aimez mieux</span>.
          </h1>
          <h2 class="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Votre carnet de santé numérique pour animaux.
          </h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Un tableau de bord intelligent pour surveiller le poids, l'alimentation, les traitements antiparasitaires de vos compagnons. Pensé pour les maîtres exigeants.
          </p>
          <div class="flex flex-col sm:flex-row gap-4">
            <UButton
                to="/login"
                size="xl"
                color="primary"
                class="bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-600 text-white"
            >
              <UIcon name="i-devicon-google" class="mr-2" />
              Se connecter avec Google
            </UButton>
            <UButton
                to="/demo"
                size="xl"
                variant="outline"
                class="border-gray-300 dark:border-gray-700"
            >
              <UIcon name="i-lucide-play" class="mr-2" />
              Voir la démo
            </UButton>
          </div>
        </div>
        <div class="w-full md:w-1/2">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform rotate-2 hover:rotate-0 transition-all duration-300">
            <img src="/demo.png" alt="Dashboard Preview" class="w-full" />
          </div>
        </div>
      </div>

      <!-- Features Section -->
      <div class="py-20">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pourquoi PawData ?</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Une solution complète pour prendre soin de vos animaux comme jamais auparavant.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Feature 1 -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
            <div class="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <UIcon name="i-lucide-activity" class="h-8 w-8 text-blue-500 dark:text-blue-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Suivi santé en temps réel</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Poids, croquettes, vermifuges… tout est historisé et visualisable en graphiques clairs.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
            <div class="bg-amber-50 dark:bg-amber-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <UIcon name="i-lucide-calendar" class="h-8 w-8 text-amber-500 dark:text-amber-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Agenda intelligent</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Rappels de vaccins, antiparasitaires et rendez-vous vétérinaires à jour.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
            <div class="bg-green-50 dark:bg-green-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <UIcon name="i-lucide-smartphone" class="h-8 w-8 text-green-500 dark:text-green-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Interface responsive</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Accédez à toutes les informations de vos animaux où que vous soyez, sur tous vos appareils.
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
            <div class="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
              <UIcon name="i-lucide-shield" class="h-8 w-8 text-purple-500 dark:text-purple-400" />
            </div>
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Données sécurisées</h3>
            <p class="text-gray-600 dark:text-gray-300">
              Authentification sécurisée via Google, base de données Supabase protégée.
            </p>
          </div>
        </div>
      </div>

      <!-- Profil Section -->
      <div class="py-20 flex flex-col md:flex-row items-center gap-12">
        <div class="w-full md:w-1/2">
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 transform -rotate-2 hover:rotate-0 transition-all duration-300 border border-gray-100 dark:border-gray-700">
            <!-- Preview of an animal profile -->
            <div class="relative">
              <div class="h-24 bg-gradient-to-r from-blue-200/20 to-indigo-100/20 rounded-t-xl"></div>
              <div class="absolute -bottom-10 left-6">
                <div class="w-20 h-20 bg-gray-300 dark:bg-gray-600 rounded-full ring-4 ring-white dark:ring-gray-800 shadow-md overflow-hidden">
                  <UIcon name="i-fluent-animal-dog-16-regular" class="w-full h-full p-4 text-gray-700 dark:text-gray-300" />
                </div>
              </div>
            </div>
            <div class="mt-12 p-4">
              <div class="flex justify-between items-start">
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="text-xl font-medium text-gray-800 dark:text-gray-100">Rex</h3>
                    <UIcon name="i-ic-baseline-male" class="text-blue-500" />
                  </div>
                  <div class="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-4">
                    <span class="flex items-center">
                      <UIcon name="i-heroicons-calendar" class="mr-1 text-gray-400 dark:text-gray-200" size="sm" />
                      3 ans et 2 mois
                    </span>
                    <span class="flex items-center">
                      <UIcon name="i-heroicons-scale" class="mr-1 text-gray-400 dark:text-gray-200" size="sm" />
                      28 kg
                    </span>
                  </div>
                </div>
                <div class="flex gap-2">
                  <UBadge color="warning" variant="subtle" class="cursor-help">
                    <div class="flex items-center">
                      <UIcon name="i-heroicons-exclamation-triangle" class="mr-1" size="sm" />
                      <span class="hidden sm:inline">Attention</span>
                    </div>
                  </UBadge>
                </div>
              </div>
              <div class="mt-4 grid grid-cols-2 gap-2">
                <div class="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-950">
                  <UIcon name="i-heroicons-bug-ant" size="sm" class="text-red-500" />
                  <span class="text-xs text-gray-600 dark:text-gray-400">Protection anti-puces</span>
                </div>
                <div class="flex items-center gap-2 p-2 rounded-lg bg-gray-50 dark:bg-gray-950">
                  <UIcon name="i-fluent-emoji-high-contrast-worm" size="sm" class="text-green-500" />
                  <span class="text-xs text-gray-600 dark:text-gray-400">Vermifuge</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full md:w-1/2">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Un profil par animal</h2>
          <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Créez une fiche unique pour chaque compagnon avec toutes ses informations importantes :
          </p>
          <ul class="space-y-4">
            <li class="flex items-center gap-3">
              <div class="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                <UIcon name="i-lucide-check" class="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span class="text-gray-700 dark:text-gray-300">Suivi complet du poids avec graphique d'évolution</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                <UIcon name="i-lucide-check" class="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span class="text-gray-700 dark:text-gray-300">Gestion des traitements antiparasitaires</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                <UIcon name="i-lucide-check" class="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span class="text-gray-700 dark:text-gray-300">Suivi de l'alimentation et des croquettes</span>
            </li>
            <li class="flex items-center gap-3">
              <div class="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
                <UIcon name="i-lucide-check" class="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span class="text-gray-700 dark:text-gray-300">Alertes personnalisées pour ne rien oublier</span>
            </li>
          </ul>
          <div class="mt-8">
            <UButton
                to="/login"
                size="lg"
                color="primary"
                class="bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-600 text-white"
            >
              Créer le profil de mon animal
            </UButton>
          </div>
        </div>
      </div>

      <!-- Dashboard Section -->
      <div class="py-20">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Un tableau de bord complet</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Toutes les données de vos animaux centralisées et facilement accessibles.
          </p>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Graph de poids -->
            <div class="md:col-span-2 bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
              <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Évolution du poids</h3>
              <div class="h-64 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                <UIcon name="i-lucide-trending-up" class="h-10 w-10 text-amber-500 dark:text-amber-400" />
                <!-- Ici, vous pourriez intégrer un graphique D3.js ou similaire -->
              </div>
            </div>

            <!-- Infos rapides -->
            <div class="space-y-4">
              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Prochain traitement</h3>
                <div class="flex items-center gap-3">
                  <div class="bg-red-100 dark:bg-red-900/30 p-3 rounded-full">
                    <UIcon name="i-heroicons-bug-ant" class="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <div class="text-gray-700 dark:text-gray-300 font-medium">Anti-puces</div>
                    <div class="text-gray-500 dark:text-gray-400 text-sm">Dans 5 jours</div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Croquettes</h3>
                <div class="flex items-center gap-3">
                  <div class="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                    <UIcon name="i-tabler-dog-bowl" class="h-6 w-6 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <div class="text-gray-700 dark:text-gray-300 font-medium">Stock: 2.5kg</div>
                    <div class="text-gray-500 dark:text-gray-400 text-sm">Suffisant pour 12 jours</div>
                  </div>
                </div>
              </div>

              <div class="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl">
                <h3 class="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">Poids récent</h3>
                <div class="flex items-center gap-3">
                  <div class="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                    <UIcon name="i-healthicons-weight-outline" class="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div class="text-gray-700 dark:text-gray-300 font-medium">28 kg (+0.5kg)</div>
                    <div class="text-gray-500 dark:text-gray-400 text-sm">Mesuré il y a 2 jours</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Testimonials Section -->
      <div class="py-20">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ce que disent nos utilisateurs</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Découvrez comment PawData transforme la vie des propriétaires d'animaux.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <!-- Témoignage 1 -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
            <div class="flex items-center mb-4">
              <div class="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-4">
                <UIcon name="i-heroicons-user-circle" class="h-full w-full text-gray-400 dark:text-gray-500" />
              </div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">Alice</h4>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Propriétaire de Nala 🐕</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300">
              "PawData m'a permis de détecter un changement de poids trop rapide chez mon chien. J'ai pu consulter mon vétérinaire à temps !"
            </p>
            <div class="mt-4 flex">
              <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500" />
              <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500" />
              <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500" />
              <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500" />
              <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500" />
            </div>
          </div>

          <!-- Témoignage 2 -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
            <div class="flex items-center mb-4">
              <div class="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-4">
                <UIcon name="i-heroicons-user-circle" class="h-full w-full text-gray-400 dark:text-gray-500" />
              </div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">Marc</h4>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Maître de Bolt 🐾</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300">
              "Je n'oublie plus jamais un traitement antipuce grâce aux rappels ! L'interface est intuitive et j'adore le graphique de poids."
            </p>
            <div class="mt-4 flex">
              <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500" />
              <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500" />
              <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500" />
              <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500" />
              <UIcon name="i-lucide-star-half" class="h-5 w-5 text-amber-500" />
            </div>
          </div>

          <!-- Témoignage 3 -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
            <div class="flex items-center mb-4">
              <div class="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-4">
                <UIcon name="i-heroicons-user-circle" class="h-full w-full text-gray-400 dark:text-gray-500" />
              </div>
              <div>
                <h4 class="font-medium text-gray-900 dark:text-white">Sophie</h4>
                <p class="text-gray-500 dark:text-gray-400 text-sm">Famille multi-chiens 🐕🐕‍🦺</p>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-300">
              "Avec trois chiens à la maison, PawData est devenu indispensable. Je peux suivre facilement quel chien a besoin de quelle attention !"
            </p>
            <div class="mt-4 flex">
              <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500" />
              <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500" />
              <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500" />
              <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500" />
              <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      <!-- FAQ Section -->
      <div class="py-20">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Questions fréquentes</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tout ce que vous devez savoir pour commencer.
          </p>
        </div>

        <div class="max-w-3xl mx-auto">
          <UAccordion class="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden">
            <UAccordionItem>
              <template #title>Est-ce gratuit ?</template>
              <div class="p-4 text-gray-600 dark:text-gray-300">
                Oui, PawData est 100% gratuit pour le suivi d'un animal. Notre objectif est de rendre accessible à tous une gestion de santé optimale pour leurs compagnons.
              </div>
            </UAccordionItem>
            <UAccordionItem>
              <template #title>Puis-je ajouter plusieurs chiens ?</template>
              <div class="p-4 text-gray-600 dark:text-gray-300">
                Bien sûr ! PawData est pensé pour les familles multi-chiens. Vous pouvez ajouter autant d'animaux que vous le souhaitez et gérer leurs profils individuellement.
              </div>
            </UAccordionItem>
            <UAccordionItem>
              <template #title>Et les chats ?</template>
              <div class="p-4 text-gray-600 dark:text-gray-300">
                Notre application est actuellement optimisée pour les chiens, mais nous travaillons activement sur une mise à jour pour inclure nos amis félins très bientôt ! 😺
              </div>
            </UAccordionItem>
            <UAccordionItem>
              <template #title>Mes données sont-elles sécurisées ?</template>
              <div class="p-4 text-gray-600 dark:text-gray-300">
                Absolument. Nous utilisons l'authentification Google et Supabase pour garantir une sécurité maximale. Vos données ne sont jamais partagées avec des tiers.
              </div>
            </UAccordionItem>
            <UAccordionItem>
              <template #title>Comment fonctionnent les rappels ?</template>
              <div class="p-4 text-gray-600 dark:text-gray-300">
                PawData calcule automatiquement les dates importantes en fonction des données que vous entrez. Vous recevrez des notifications visuelles directement dans l'application quand une action est nécessaire.
              </div>
            </UAccordionItem>
          </UAccordion>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="py-20">
        <div class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl p-12 text-center shadow-lg border border-amber-100 dark:border-amber-900/50">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Prêt à mieux prendre soin de votre compagnon ?</h2>
          <p class="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Rejoignez des milliers de propriétaires qui ont changé leur façon de prendre soin de leurs animaux.
          </p>
          <UButton
              to="/login"
              size="xl"
              color="primary"
              class="bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-600 text-white"
          >
            Commencer gratuitement
            <UIcon name="i-heroicons-arrow-right" class="ml-2" />
          </UButton>
        </div>
      </div>

      <!-- Footer -->
      <footer class="py-12 border-t border-gray-200 dark:border-gray-800">
        <div class="flex flex-col md:flex-row justify-between items-center">
          <div class="flex items-center gap-3 mb-6 md:mb-0">
            <div class="bg-white dark:bg-gray-800 p-2 rounded-full shadow-sm">
              <UIcon name="i-tabler-paw" class="h-6 w-6 text-amber-500 dark:text-amber-400" />
            </div>
            <span class="text-xl font-medium text-gray-900 dark:text-white">PawData</span>
          </div>
          <div class="flex flex-wrap gap-6 justify-center md:justify-end">
            <a href="#" class="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Mentions légales</a>
            <a href="#" class="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Contact</a>
            <a href="#" class="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Politique de confidentialité</a>
          </div>
        </div>
        <div class="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
          Développé avec <UIcon name="i-heroicons-heart" class="inline-block text-red-500" /> en France | © 2025 PawData
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
// Animations personnalisées pour les blobs
const animationStyles = `
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
`;

// Mode sombre
const colorMode = useColorMode();
</script>

<style>
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