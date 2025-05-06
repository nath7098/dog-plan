<template>
  <div class="min-h-screen light:bg-gradient-to-br light:from-slate-50 light:to-blue-50">
    <!-- Navigation -->
    <UContainer class="py-4">
      <nav class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <UIcon name="i-fluent-animal-dog-16-regular" class="text-blue-500 text-3xl" />
          <h1 class="text-2xl font-bold text-blue-600 dark:text-blue-400">Dog Plan</h1>
        </div>
        <div class="flex gap-4">
          <UButton to="/login" variant="ghost" color="gray">Se connecter</UButton>
          <UButton to="/register" color="primary">S'inscrire</UButton>
        </div>
      </nav>
    </UContainer>

    <!-- Hero Section -->
    <div class="py-16 md:py-24 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
      <UContainer>
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <UBadge color="blue" variant="subtle" class="mb-4">La santé de votre chien simplement</UBadge>
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              Suivez, planifiez et aimez mieux
            </h1>
            <p class="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6">
              Dog Plan, votre carnet de santé numérique pour animaux
            </p>
            <p class="text-gray-600 dark:text-gray-400 mb-8">
              Un tableau de bord intelligent pour surveiller le poids, l'alimentation, les traitements antiparasitaires, et plus.
              Pensé pour les maîtres exigeants.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <UButton
                  color="primary"
                  size="xl"
                  icon="i-heroicons-lock-closed"
                  to="/login">
                Se connecter avec Google
              </UButton>
              <UButton
                  variant="outline"
                  size="xl"
                  to="/demo">
                Essayer une démo
              </UButton>
            </div>
          </div>
          <div class="relative hidden md:block">
            <div class="absolute -left-6 -top-6 w-24 h-24 bg-yellow-200 rounded-full opacity-30"></div>
            <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-200 rounded-full opacity-40"></div>

            <!-- App Dashboard Preview -->
            <div class="rounded-2xl shadow-2xl bg-white dark:bg-neutral-800 overflow-hidden relative z-10">
              <!-- Mock Dashboard Header -->
              <div class="bg-blue-500 dark:bg-blue-600 p-6 text-white">
                <div class="flex items-center gap-3">
                  <UAvatar
                      src="https://images.unsplash.com/photo-1543466835-00a7907e9de1"
                      alt="Dog avatar"
                      size="lg"
                  />
                  <div>
                    <h3 class="font-bold">Max</h3>
                    <p class="text-sm text-blue-100">Labrador • 3 ans</p>
                  </div>
                </div>
              </div>

              <!-- Mock Dashboard Content -->
              <div class="p-6">
                <!-- Weight Chart Mock -->
                <div class="mb-6">
                  <h4 class="font-medium mb-2">Suivi du poids</h4>
                  <div class="h-32 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-end p-2">
                    <div class="w-1/6 h-1/3 bg-blue-300 dark:bg-blue-700 rounded-t-sm mx-1"></div>
                    <div class="w-1/6 h-2/5 bg-blue-300 dark:bg-blue-700 rounded-t-sm mx-1"></div>
                    <div class="w-1/6 h-1/2 bg-blue-300 dark:bg-blue-700 rounded-t-sm mx-1"></div>
                    <div class="w-1/6 h-3/5 bg-blue-300 dark:bg-blue-700 rounded-t-sm mx-1"></div>
                    <div class="w-1/6 h-2/3 bg-blue-300 dark:bg-blue-700 rounded-t-sm mx-1"></div>
                    <div class="w-1/6 h-3/4 bg-blue-400 dark:bg-blue-600 rounded-t-sm mx-1"></div>
                  </div>
                </div>

                <!-- Status Cards -->
                <div class="grid grid-cols-2 gap-3">
                  <div class="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800">
                    <div class="flex gap-2 items-center">
                      <UIcon name="i-heroicons-shield-check" class="text-green-500" />
                      <span class="text-sm text-green-700 dark:text-green-300">Anti-puces à jour</span>
                    </div>
                  </div>
                  <div class="p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800">
                    <div class="flex gap-2 items-center">
                      <UIcon name="i-fluent-emoji-high-contrast-worm" class="text-amber-500" />
                      <span class="text-sm text-amber-700 dark:text-amber-300">Vermifuge (7j)</span>
                    </div>
                  </div>
                  <div class="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                    <div class="flex gap-2 items-center">
                      <UIcon name="i-tabler-dog-bowl" class="text-blue-500" />
                      <span class="text-sm text-blue-700 dark:text-blue-300">300g/jour</span>
                    </div>
                  </div>
                  <div class="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
                    <div class="flex gap-2 items-center">
                      <UIcon name="i-healthicons-weight-outline" class="text-purple-500" />
                      <span class="text-sm text-purple-700 dark:text-purple-300">28.5 kg</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Features Section -->
    <UContainer class="py-16">
      <div class="text-center mb-12">
        <UBadge color="blue" variant="subtle" class="mb-2">Pourquoi Dog Plan ?</UBadge>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Une solution complète pour le bien-être de votre animal
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Tout ce dont vous avez besoin pour prendre soin de votre compagnon, au même endroit
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <UCard class="transition-all hover:shadow-lg">
          <template #header>
            <div class="flex justify-center p-4">
              <div class="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full">
                <UIcon name="i-heroicons-chart-bar" class="text-blue-500 text-4xl" />
              </div>
            </div>
          </template>
          <div class="text-center">
            <h3 class="font-bold text-lg mb-2">Suivi santé en temps réel</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Poids, croquettes, vermifuges… tout est historisé et visualisable
            </p>
          </div>
        </UCard>

        <UCard class="transition-all hover:shadow-lg">
          <template #header>
            <div class="flex justify-center p-4">
              <div class="bg-green-100 dark:bg-green-900/30 p-4 rounded-full">
                <UIcon name="i-heroicons-calendar" class="text-green-500 text-4xl" />
              </div>
            </div>
          </template>
          <div class="text-center">
            <h3 class="font-bold text-lg mb-2">Agenda intelligent</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Rappels de vaccins, antiparasitaires, rendez-vous vétérinaire
            </p>
          </div>
        </UCard>

        <UCard class="transition-all hover:shadow-lg">
          <template #header>
            <div class="flex justify-center p-4">
              <div class="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-full">
                <UIcon name="i-heroicons-device-phone-mobile" class="text-purple-500 text-4xl" />
              </div>
            </div>
          </template>
          <div class="text-center">
            <h3 class="font-bold text-lg mb-2">Interface responsive</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Accédez à toutes les infos où que vous soyez, sur tous vos appareils
            </p>
          </div>
        </UCard>

        <UCard class="transition-all hover:shadow-lg">
          <template #header>
            <div class="flex justify-center p-4">
              <div class="bg-amber-100 dark:bg-amber-900/30 p-4 rounded-full">
                <UIcon name="i-heroicons-lock-closed" class="text-amber-500 text-4xl" />
              </div>
            </div>
          </template>
          <div class="text-center">
            <h3 class="font-bold text-lg mb-2">Données sécurisées</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Authentification sécurisée via Google, base Supabase
            </p>
          </div>
        </UCard>
      </div>
    </UContainer>

    <!-- Profile Section -->
    <div class="bg-gray-50 dark:bg-gray-900/50 py-16">
      <UContainer>
        <div class="grid md:grid-cols-2 gap-12 items-center">
          <div class="order-2 md:order-1">
            <!-- Profile Preview -->
            <div class="rounded-2xl shadow-lg bg-white dark:bg-neutral-800 overflow-hidden">
              <div class="h-24 bg-gradient-to-r from-blue-200/20 to-indigo-100/20"></div>
              <div class="relative px-6">
                <UAvatar
                    src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e"
                    alt="Dog profile"
                    size="3xl"
                    class="absolute -top-12 ring-4 ring-white dark:ring-neutral-800"
                />
                <div class="pt-14 pb-6">
                  <div class="flex items-center gap-2 mb-2">
                    <h3 class="text-xl font-medium text-neutral-800 dark:text-neutral-100">Luna</h3>
                    <UIcon
                        name="i-ic-baseline-female"
                        class="text-pink-500"
                    />
                  </div>
                  <div class="text-neutral-500 dark:text-neutral-400 flex items-center gap-4">
                    <span class="flex items-center">
                      <UIcon name="i-heroicons-calendar" class="mr-1" size="sm" />
                      2 ans
                    </span>
                    <span class="flex items-center">
                      <UIcon name="i-heroicons-scale" class="mr-1" size="sm" />
                      8.2 kg
                    </span>
                  </div>

                  <div class="mt-4 grid grid-cols-2 gap-2">
                    <div class="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950">
                      <UIcon name="i-heroicons-bug-ant" size="sm" class="text-green-500" />
                      <span class="text-xs text-neutral-600 dark:text-neutral-400">Protection anti-puces</span>
                    </div>
                    <div class="flex items-center gap-2 p-2 rounded-lg bg-neutral-50 dark:bg-neutral-950">
                      <UIcon name="i-fluent-emoji-high-contrast-worm" size="sm" class="text-green-500" />
                      <span class="text-xs text-neutral-600 dark:text-neutral-400">Vermifuge</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="order-1 md:order-2">
            <UBadge color="blue" variant="subtle" class="mb-2">Un profil par animal</UBadge>
            <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Créez une fiche unique pour chaque compagnon
            </h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Nom, race, âge, photo, et suivez son évolution au fil des mois. Ajoutez autant d'animaux que vous le souhaitez.
            </p>

            <div class="space-y-3 mb-6">
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-check-circle" class="text-green-500 flex-shrink-0" />
                <span>Historique médical complet</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-check-circle" class="text-green-500 flex-shrink-0" />
                <span>Suivi de poids avec graphiques</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-check-circle" class="text-green-500 flex-shrink-0" />
                <span>Gestion des traitements préventifs</span>
              </div>
              <div class="flex items-center gap-2">
                <UIcon name="i-heroicons-check-circle" class="text-green-500 flex-shrink-0" />
                <span>Rappels automatiques personnalisés</span>
              </div>
            </div>

            <UButton color="primary" icon="i-heroicons-plus" to="/register">
              Ajouter mon animal
            </UButton>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Dashboard Section -->
    <UContainer class="py-16">
      <div class="text-center mb-12">
        <UBadge color="blue" variant="subtle" class="mb-2">Un tableau de bord complet</UBadge>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Tout ce dont vous avez besoin, en un coup d'œil
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Une interface intuitive qui rassemble toutes les informations essentielles de votre animal
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <UCard class="transition-all hover:shadow-lg">
          <div class="p-4">
            <UIcon name="i-healthicons-weight-outline" class="text-blue-500 text-2xl mb-2" />
            <h3 class="font-bold text-lg mb-2">Graphiques de poids</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Suivez visuellement l'évolution du poids de votre animal au fil du temps
            </p>
          </div>
        </UCard>

        <UCard class="transition-all hover:shadow-lg">
          <div class="p-4">
            <UIcon name="i-heroicons-clipboard-document-list" class="text-green-500 text-2xl mb-2" />
            <h3 class="font-bold text-lg mb-2">Historique des soins</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Vaccins, visites vétérinaires et tous les soins médicaux en un endroit
            </p>
          </div>
        </UCard>

        <UCard class="transition-all hover:shadow-lg">
          <div class="p-4">
            <UIcon name="i-tabler-dog-bowl" class="text-amber-500 text-2xl mb-2" />
            <h3 class="font-bold text-lg mb-2">Alimentation & routines</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Gérez les rations quotidiennes et suivez le stock de nourriture
            </p>
          </div>
        </UCard>

        <UCard class="transition-all hover:shadow-lg">
          <div class="p-4">
            <UIcon name="i-heroicons-pencil-square" class="text-purple-500 text-2xl mb-2" />
            <h3 class="font-bold text-lg mb-2">Journal d'observations</h3>
            <p class="text-gray-600 dark:text-gray-400">
              Notez les comportements ou changements importants à surveiller
            </p>
          </div>
        </UCard>
      </div>
    </UContainer>

    <!-- Testimonials Section -->
    <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 py-16">
      <UContainer>
        <div class="text-center mb-12">
          <UBadge color="blue" variant="subtle" class="mb-2">Témoignages</UBadge>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ce que disent nos utilisateurs
          </h2>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <UCard class="transition-all hover:shadow-lg bg-white dark:bg-neutral-900">
            <div class="flex flex-col h-full">
              <div class="flex mb-4">
                <UProgress disabled :model-value="5" :max="5" />
              </div>
              <p class="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                "Dog Plan m'a permis de détecter un changement de poids trop rapide chez mon chien. Une visite chez le vétérinaire a confirmé un problème que j'aurais pu manquer."
              </p>
              <div class="flex items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                <UAvatar src="https://images.unsplash.com/photo-1580489944761-15a19d654956" size="sm" class="mr-3" />
                <div>
                  <p class="font-medium text-sm">Alice</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Propriétaire de Nala 🐕</p>
                </div>
              </div>
            </div>
          </UCard>

          <UCard class="transition-all hover:shadow-lg bg-white dark:bg-neutral-900">
            <div class="flex flex-col h-full">
              <div class="flex mb-4">
                <UProgress disabled :model-value="5" :max="5" />
              </div>
              <p class="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                "Je n'oublie plus jamais un traitement antipuce grâce aux rappels ! L'application est super intuitive et me permet de suivre facilement la santé de mon chien."
              </p>
              <div class="flex items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                <UAvatar src="https://images.unsplash.com/photo-1603415526960-f7e0328c63b1" size="sm" class="mr-3" />
                <div>
                  <p class="font-medium text-sm">Marc</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Maître de Bolt 🐾</p>
                </div>
              </div>
            </div>
          </UCard>

          <UCard class="transition-all hover:shadow-lg bg-white dark:bg-neutral-900">
            <div class="flex flex-col h-full">
              <div class="flex mb-4">
                <UProgress disabled :model-value="4" :max="5" />
              </div>
              <p class="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                "Super application qui me permet de coordonner les soins de nos deux chiens avec mon conjoint. On est toujours sur la même page et on ne risque pas d'oublier les traitements importants."
              </p>
              <div class="flex items-center mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                <UAvatar src="https://images.unsplash.com/photo-1614644147724-2d4785d69962" size="sm" class="mr-3" />
                <div>
                  <p class="font-medium text-sm">Sophie</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">Propriétaire de Max et Lola 🐕🐕</p>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </UContainer>
    </div>

    <!-- FAQ Section -->
    <UContainer class="py-16">
      <div class="text-center mb-12">
        <UBadge color="blue" variant="subtle" class="mb-2">Questions fréquentes</UBadge>
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Tout ce que vous devez savoir
        </h2>
      </div>

      <div class="max-w-3xl mx-auto">
        <UAccordion :items="[
          {
            heading: 'Est-ce gratuit ?',
            content: 'Oui, Dog Plan est 100% gratuit pour le suivi d\'un animal. Nous proposons également une formule premium avec des fonctionnalités avancées pour les propriétaires de plusieurs animaux.',
            icon: 'i-heroicons-currency-euro'
          },
          {
            heading: 'Puis-je ajouter plusieurs chiens ?',
            content: 'Bien sûr, Dog Plan est pensé pour les familles multi-chiens. Vous pouvez ajouter autant d\'animaux que vous le souhaitez et gérer leurs profils individuellement.',
            icon: 'i-heroicons-user-group'
          },
          {
            heading: 'Et les chats ?',
            content: 'Absolument ! Bien que le nom soit Dog Plan, notre application est conçue pour tous les animaux de compagnie. Les chats, NAC et autres compagnons sont les bienvenus.',
            icon: 'i-heroicons-face-smile'
          },
          {
            heading: 'Mes données sont-elles sécurisées ?',
            content: 'La sécurité de vos données est notre priorité. Nous utilisons Supabase, une infrastructure sécurisée et robuste pour stocker toutes les informations. L\'authentification est gérée via Google pour assurer un niveau de sécurité optimal.',
            icon: 'i-heroicons-shield-check'
          },
          {
            heading: 'Puis-je partager le profil avec mon vétérinaire ?',
            content: 'Oui, vous pouvez générer un rapport PDF ou un lien de partage temporaire pour donner accès aux informations importantes à votre vétérinaire lors des consultations.',
            icon: 'i-heroicons-share'
          }
        ]" />
      </div>
    </UContainer>

    <!-- CTA Section -->
    <div class="bg-blue-600 dark:bg-blue-800 py-16 text-white">
      <UContainer>
        <div class="text-center max-w-2xl mx-auto">
          <h2 class="text-3xl font-bold mb-4">
            Prêt à mieux prendre soin de votre animal ?
          </h2>
          <p class="text-blue-100 mb-8">
            Créez un compte gratuit en quelques secondes et commencez à suivre la santé de votre compagnon dès aujourd'hui.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <UButton
                color="white"
                size="xl"
                to="/register">
              Créer un compte
            </UButton>
            <UButton
                variant="ghost"
                color="white"
                size="xl"
                to="/demo">
              Essayer la démo
            </UButton>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-100 dark:bg-gray-900 py-12">
      <UContainer>
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center gap-2 mb-4">
              <UIcon name="i-fluent-animal-dog-16-regular" class="text-blue-500 text-2xl" />
              <h3 class="text-xl font-bold text-blue-600 dark:text-blue-400">Dog Plan</h3>
            </div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              La santé de votre chien. Simplifiée. Centralisée. Enfin maîtrisée.
            </p>
            <div class="flex gap-4">
              <UButton icon="i-mdi-twitter" color="gray" variant="ghost" square aria-label="Twitter" />
              <UButton icon="i-mdi-instagram" color="gray" variant="ghost" square aria-label="Instagram" />
              <UButton icon="i-mdi-facebook" color="gray" variant="ghost" square aria-label="Facebook" />
            </div>
          </div>

          <div>
            <h4 class="font-medium text-lg mb-4">Liens rapides</h4>
            <ul class="space-y-2">
              <li><ULink href="/fonctionnalites" class="text-gray-600 dark:text-gray-400 hover:text-blue-500">Fonctionnalités</ULink></li>
              <li><ULink href="/tarifs" class="text-gray-600 dark:text-gray-400 hover:text-blue-500">Tarifs</ULink></li>
              <li><ULink href="/temoignages" class="text-gray-600 dark:text-gray-400 hover:text-blue-500">Témoignages</ULink></li>
              <li><ULink href="/faq" class="text-gray-600 dark:text-gray-400 hover:text-blue-500">FAQ</ULink></li>
            </ul>
          </div>

          <div>
            <h4 class="font-medium text-lg mb-4">Légal</h4>
            <ul class="space-y-2">
              <li><ULink href="/mentions-legales" class="text-gray-600 dark:text-gray-400 hover:text-blue-500">Mentions légales</ULink></li>
              <li><ULink href="/confidentialite" class="text-gray-600 dark:text-gray-400 hover:text-blue-500">Politique de confidentialité</ULink></li>
              <li><ULink href="/cgu" class="text-gray-600 dark:text-gray-400 hover:text-blue-500">CGU</ULink></li>
              <li><ULink href="/cookies" class="text-gray-600 dark:text-gray-400 hover:text-blue-500">Cookies</ULink></li>
            </ul>
          </div>

          <div>
            <h4 class="font-medium text-lg mb-4">Contact</h4>
            <p class="text-gray-600 dark:text-gray-400 mb-3">
              Une question ? Besoin d'aide ?
            </p>
            <UButton
                icon="i-heroicons-envelope"
                color="blue"
                to="mailto:contact@dogplan.fr"
                class="mb-4"
            >
              Nous contacter
            </UButton>
            <p class="text-gray-500 dark:text-gray-400 text-sm mt-6">
              Développé avec <UIcon name="i-heroicons-heart" class="text-red-500" /> en France
            </p>
            <p class="text-gray-500 dark:text-gray-400 text-sm">
              © 2025 Dog Plan
            </p>
          </div>
        </div>
      </UContainer>
    </footer>
  </div>
</template>
<script setup lang="ts">
</script>