<template>
  <UContainer class="relative mx-auto px-4 py-12 relative z-10">
    <!-- Navigation -->
    <nav :class="['fixed left-[50%] -translate-x-[50%] w-full top-[calc(100vh-80px)] mx-auto flex justify-between items-center p-3 backdrop-blur-sm',
              'md:w-auto md:sticky md:left-auto md:translate-none md:top-12 md:mb-16 md:ring-1 md:ring-primary-500 md:rounded-full']"
    >
      <div class="flex items-center gap-3">
        <UIcon name="i-tabler-paw" class="h-8 w-8 text-amber-500 dark:text-amber-400"/>
        <span class="text-2xl font-bold text-gray-900 dark:text-white">PawData</span>
      </div>
      <div class="flex items-center gap-4">
        <UButton
            to="/login"
            variant="ghost"
            size="xl"
            color="neutral"
            leading-icon="i-lucide-log-in"
            class="hidden md:flex rounded-full py-4 items-center gap-1"
        >
          Connexion
        </UButton>
        <UButton
            to="/login"
            color="primary"
            size="xl"
            class="rounded-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-600 text-white"
        >
          Commencer <span class="hidden md:block">maintenant</span>
        </UButton>
      </div>
    </nav>

    <!-- Hero Section -->
    <UContainer>
      <div class="text-center">
        <h1 class="text-5xl sm:text-7xl text-pretty tracking-tight font-bold text-highlighted">
          <div class="*:leading-11 sm:*:leading-19 max-w-3xl mx-auto">
            <p class="my-5 leading-7 text-pretty">
              Suivez, planifiez et <span class="text-amber-500 dark:text-amber-400">aimez mieux</span>.
            </p>
          </div>
        </h1>
        <div class="text-lg sm:text-xl/8 dark:text-neutral-400 text-neutral-500 text-balance mt-6">
          Un tableau de bord intelligent pour surveiller le poids, l'alimentation, les traitements antiparasitaires de
          vos compagnons. Pensé pour les maîtres exigeants.
        </div>
        <div class="mt-10 flex flex-wrap gap-x-6 gap-y-3 justify-center">
          <UButton
              to="/login"
              color="primary"
              size="xl"
              trailing-icon="i-lucide-arrow-right"
              class="rounded-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 dark:from-amber-500 dark:to-amber-600 text-white"
          >
            Commencer maintenant
          </UButton>
          <UButton
              to="/login"
              variant="ghost"
              size="xl"
              color="neutral"
              leading-icon="i-tabler-paw"
              class="hidden md:flex rounded-full py-4 items-center gap-1"
          >
            Qu'est ce que c'est ?
          </UButton>
        </div>
      </div>

      <div class="my-16 p-6 rounded-4xl bg-indigo-100 ring-1 ring-primary-500/20">
        <img src="/landing/demo.png" alt="demo" class="rounded-2xl ring-1 ring-primary-500/80"/>
      </div>
    </UContainer>

    <!-- Features Section -->
    <div class="py-20">
      <div class="text-center mb-16">
        <h4 class="text-xl font-bold text-amber-500 font-extrabold uppercase mb-1">Problème</h4>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">Trop d'endroits où noter les infos de vos
          animaux ?</h2>
        <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Une solution complète pour prendre soin de vos animaux comme jamais auparavant. En un seul endroit.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 my-16">
        <!-- Feature 1 -->
        <div class="text-center">
          <h3 class="text-xl font-bold text-amber-500 font-bold mb-2">Un sommaire de tous vos animaux</h3>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Avec toutes leurs infos et des alertes en temps réel pour garder un oeil sur leurs besoins.
          </p>
          <div class="p-6 rounded-4xl bg-indigo-100 ring-1 ring-primary-500/20">
            <img src="/landing/demo-index.png" alt="demo" class="rounded-2xl ring-1 ring-primary-500/80"/>
          </div>
        </div>

        <div class="text-center">
          <h3 class="text-xl font-bold text-amber-500 font-bold mb-2">Un dashboard complet et intuitif</h3>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Vous permettant de gérer les données de vos animaux en toute simplicité.
          </p>
          <div class="p-6 rounded-4xl bg-indigo-100 ring-1 ring-primary-500/20">
            <video src="/landing/demo-dashboard.mp4" autoplay
                   class="rounded-2xl ring-1 ring-primary-500/80 h-full object-cover"/>
          </div>
        </div>

        <div class="text-center">
          <h3 class="text-xl font-bold text-amber-500 font-bold mb-2">Un profil par animal</h3>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Pour suivre chaque compagnon a son rythme.
          </p>
          <div class="p-6 rounded-4xl bg-indigo-100 ring-1 ring-primary-500/20">
            <img src="/landing/demo-card.png" alt="demo" class="rounded-2xl ring-1 ring-primary-500/80"/>
          </div>
        </div>

        <div class="text-center">
          <h3 class="text-xl font-bold text-amber-500 font-bold mb-2">Un historique de poids complet</h3>
          <p class="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
            Pour rester à l'écoute de la santé de vos animaux plus précisément.
          </p>
          <div class="p-6 rounded-4xl bg-indigo-100 ring-1 ring-primary-500/20">
            <img src="/landing/demo-weight.png" alt="demo" class="rounded-2xl ring-1 ring-primary-500/80"/>
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
        <div
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
          <div class="flex items-center mb-4">
            <div class="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-4">
              <UIcon name="i-heroicons-user-circle" class="h-full w-full text-gray-400 dark:text-gray-500"/>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white">Alice</h4>
              <p class="text-gray-500 dark:text-gray-400 text-sm">Propriétaire de Nala 🐕</p>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-300">
            "PawData m'a permis de détecter un changement de poids trop rapide chez mon chien. J'ai pu consulter mon
            vétérinaire à temps !"
          </p>
          <div class="mt-4 flex">
            <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500"/>
            <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500"/>
            <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500"/>
            <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500"/>
            <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500"/>
          </div>
        </div>

        <!-- Témoignage 2 -->
        <div
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
          <div class="flex items-center mb-4">
            <div class="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-4">
              <UIcon name="i-heroicons-user-circle" class="h-full w-full text-gray-400 dark:text-gray-500"/>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white">Marc</h4>
              <p class="text-gray-500 dark:text-gray-400 text-sm">Maître de Bolt 🐾</p>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-300">
            "Je n'oublie plus jamais un traitement antipuce grâce aux rappels ! L'interface est intuitive et j'adore
            le graphique de poids."
          </p>
          <div class="mt-4 flex">
            <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500"/>
            <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500"/>
            <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500"/>
            <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500"/>
            <UIcon name="i-lucide-star-half" class="h-5 w-5 text-amber-500"/>
          </div>
        </div>

        <!-- Témoignage 3 -->
        <div
            class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
          <div class="flex items-center mb-4">
            <div class="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mr-4">
              <UIcon name="i-heroicons-user-circle" class="h-full w-full text-gray-400 dark:text-gray-500"/>
            </div>
            <div>
              <h4 class="font-medium text-gray-900 dark:text-white">Sophie</h4>
              <p class="text-gray-500 dark:text-gray-400 text-sm">Famille multi-chiens 🐕🐕‍🦺</p>
            </div>
          </div>
          <p class="text-gray-600 dark:text-gray-300">
            "Avec trois chiens à la maison, PawData est devenu indispensable. Je peux suivre facilement quel chien a
            besoin de quelle attention !"
          </p>
          <div class="mt-4 flex">
            <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500"/>
            <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500"/>
            <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500"/>
            <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500"/>
            <UIcon name="i-lucide-star" class="h-5 w-5 text-amber-500"/>
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
        <UAccordion
            class=""
            :items="faqItems"
        >
          <template #content="{ item }">
            <p class="p-4 text-gray-600 dark:text-gray-300">
              {{ item.content }}
            </p>
          </template>
        </UAccordion>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="py-20">
      <div
          class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 rounded-2xl p-12 text-center shadow-lg border border-amber-100 dark:border-amber-900/50">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">Prêt à mieux prendre soin de votre compagnon
          ?</h2>
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
          <UIcon name="i-heroicons-arrow-right" class="ml-2"/>
        </UButton>
      </div>
    </div>

    <!-- Footer -->
    <footer class="py-12 border-t border-gray-200 dark:border-gray-800">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <div class="flex items-center gap-3 mb-6 md:mb-0">
          <UIcon name="i-tabler-paw" class="h-6 w-6 text-amber-500 dark:text-amber-400"/>
          <span class="text-xl font-medium text-gray-900 dark:text-white">PawData</span>
        </div>
        <div class="flex flex-wrap gap-6 justify-center md:justify-end">
          <a href="#"
             class="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Mentions
            légales</a>
          <a href="#"
             class="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Contact</a>
          <a href="#"
             class="text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Politique
            de confidentialité</a>
        </div>
      </div>
      <div class="text-center mt-8 text-sm text-gray-500 dark:text-gray-400">
        Développé avec
        <UIcon name="i-heroicons-heart" class="inline-block text-red-500"/>
        en France | © 2025 PawData
      </div>
    </footer>
  </UContainer>
</template>

<script setup>
definePageMeta({
  layout: 'decorated'
});

const faqItems = ref([
  {
    label: 'Est-ce gratuit ?',
    content: `Oui, PawData est 100% gratuit pour le suivi d'un animal. Notre objectif est de rendre accessible à tous
                une gestion de santé optimale pour leurs compagnons.`
  },
  {
    label: 'Puis-je ajouter plusieurs chiens ?',
    content: `Bien sûr ! PawData est pensé pour les familles multi-chiens. Vous pouvez ajouter autant d'animaux que
                vous le souhaitez et gérer leurs profils individuellement.`
  },{
    label: 'Et les chats ?',
    content: `Notre application est actuellement optimisée pour les chiens, mais nous travaillons activement sur une
                mise à jour pour inclure nos amis félins très bientôt ! 😺`
  },{
    label: 'Mes données sont-elles sécurisées ?',
    content: `Absolument. Nous utilisons l'authentification Google et Supabase pour garantir une sécurité maximale.
                Vos données ne sont jamais partagées avec des tiers.`
  },{
    label: 'Comment fonctionnent les rappels ?',
    content: `PawData calcule automatiquement les dates importantes en fonction des données que vous entrez. Vous
                recevrez des notifications visuelles directement dans l'application quand une action est nécessaire.`
  }
]);
</script>
