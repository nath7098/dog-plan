<template>
  <div class="min-h-screen flex flex-col items-center justify-center">
    <div class="w-full max-w-md z-10">
      <!-- Logo et titre -->
      <div class="text-center mb-8">
        <UIcon name="i-tabler-paw" class="h-12 w-12 text-amber-500"/>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">PawData</h1>
        <p class="text-lg text-gray-600 dark:text-gray-300">La plateforme pour gérer vos données canines</p>
      </div>

      <!-- Carte de connexion -->
      <div
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl border border-gray-100 dark:border-gray-700">
        <div class="mb-8 text-center">
          <h3 class="text-xl font-bold">Créez votre compte</h3>
          <p class="text-md">Vous avez déjà un compte ? <UButton variant="link" to="/signin" :ui="{base: 'text-amber-500!'}">Connectez-vous</UButton></p>
        </div>
        <div class="mb-8 text-center">
          <UButton
              size="xl"
              variant="outline"
              color="neutral"
              class="w-full cursor-pointer group relative flex items-center justify-center gap-3 rounded-xl"
              @click="signInWithGoogle"
          >
            <UIcon name="i-devicon-google" class="h-5 w-5"/>
            <span class="font-semibold<">Connexion avec Google</span>
          </UButton>
        </div>

        <USeparator label="OU" class="mb-8"/>

        <UForm :state="signUpForm" @submit="signUpWithEmail" class="mb-8 space-y-4">
          <UFormField name="firstName" label="Nom">
            <UInput type="text"
                    placeholder="Nathan"
                    v-model="signUpForm.firstName"
                    size="xl"
                    color="neutral"
                    class="w-full"
            />
          </UFormField>
          <UFormField name="email" label="Email">
            <UInput type="email"
                    placeholder="saphyr@exemple.fr"
                    v-model="signUpForm.email"
                    size="xl"
                    color="neutral"
                    class="w-full"
            />
          </UFormField>
          <UFormField name="password" label="Mot de passe" >
            <UInput
                v-model="signUpForm.password"
                :placeholder="showPassword ? 'WafWafWaf1234!' : '••••••••••••••••••'"
                :type="showPassword ? 'text' : 'password'"
                size="xl"
                color="neutral"
                class="w-full"
                :ui="{ trailing: 'pe-1' }"
            >
              <template #trailing>
                <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="showPassword ? 'Cacher mot de passe' : 'Montrer mot de passe'"
                    :aria-pressed="showPassword"
                    aria-controls="password"
                    @click="showPassword = !showPassword"
                />
              </template>
            </UInput>
          </UFormField>
          <UFormField name="password" label="Mot de passe" >
            <UInput
                v-model="signUpForm.password2"
                :placeholder="showPassword2 ? 'WafWafWaf1234!' : '••••••••••••••••••'"
                :type="showPassword2 ? 'text' : 'password'"
                size="xl"
                color="neutral"
                class="w-full"
                :ui="{ trailing: 'pe-1' }"
            >
              <template #trailing>
                <UButton
                    color="neutral"
                    variant="link"
                    size="sm"
                    :icon="showPassword2 ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                    :aria-label="showPassword2 ? 'Cacher mot de passe' : 'Montrer mot de passe'"
                    :aria-pressed="showPassword2"
                    aria-controls="password"
                    @click="showPassword2 = !showPassword2"
                />
              </template>
            </UInput>
          </UFormField>
          <UButton
              size="xl"
              variant="solid"
              color="neutral"
              class="mt-4 cursor-pointer w-full flex items-center justify-center rounded-xl"
              type="submit"
          >
            <span class="font-semibold">Inscription</span>
          </UButton>
        </UForm>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          En vous connectant, vous acceptez nos
          <a href="#" class="text-amber-600 dark:text-amber-400 hover:underline font-medium">Conditions
            d'utilisation</a>
          et notre
          <a href="#" class="text-amber-600 dark:text-amber-400 hover:underline font-medium">Politique de
            confidentialité</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'decorated'
})

const client = useSupabaseClient();
const config = useRuntimeConfig();

const showPassword = ref(false);
const showPassword2 = ref(false);
const signUpForm = reactive({
  firstName: '',
  email: '',
  password: '',
  password2: '',
})

const signInWithGoogle = async () => {
  const response = await client.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${config.public.url}/confirm`
    }
  });
}

const signUpWithEmail = async () => {
  if (signUpForm.password && signUpForm.password2 && signUpForm.password2 === signUpForm.password) {
    const {error} = await client.auth.signUp({
      email: signUpForm.email,
      password: signUpForm.password,
      options: {
        data: {
          first_name: signUpForm.firstName
        },
        emailRedirectTo: `${config.public.url}/confirm`
      },
    });
    if (error) {
      useToast().add({title: 'Erreur lors de l\'inscription ... ', color: 'error'})
    } else {
      useToast().add({title: 'Bienvenu! Un email de confirmation vous a été envoyé', color: 'success'})
      navigateTo('/signin');
    }
  }
}
</script>
