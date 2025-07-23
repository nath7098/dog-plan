<template>
  <div class="min-h-screen">
    <!-- Header Section -->
    <div class="bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Back Button -->
        <UButton
          to="/"
          variant="ghost"
          color="white"
          class="mb-6 hover:bg-white/20"
        >
          <UIcon name="i-heroicons-arrow-left" class="mr-2"/>
          Retour
        </UButton>

        <!-- Header Content -->
        <div class="text-center">
          <div class="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
            <UIcon name="i-tabler-paw" class="text-4xl"/>
          </div>
          <h1 class="text-4xl font-bold mb-2">Nouveau Compagnon</h1>
          <p class="text-xl text-white/90">Ajoutez un nouveau membre à votre famille</p>
        </div>
      </div>
    </div>

    <!-- Form Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Progress Steps -->
      <div class="mb-8">
        <div class="flex items-center justify-center space-x-4">
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-semibold">1</div>
            <span class="ml-2 text-sm font-medium text-gray-900 dark:text-white">Informations de base</span>
          </div>
          <div class="w-16 h-0.5 bg-gray-300 dark:bg-gray-600"></div>
          <div class="flex items-center">
            <div class="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400 flex items-center justify-center text-sm font-semibold">2</div>
            <span class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">Personnalisation</span>
          </div>
        </div>
      </div>

      <!-- Form Card -->
      <UCard class="mb-8">
        <form @submit.prevent="savePet" class="space-y-8">
          <!-- Essential Information Section -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <UIcon name="i-heroicons-identification" class="mr-3 text-amber-500"/>
              Informations Essentielles
            </h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Name Input -->
              <UFormGroup label="Nom de votre compagnon" required class="space-y-2">
                <UInput 
                  v-model="formData.name" 
                  placeholder="ex: Saphyr, Max, Luna..." 
                  size="lg"
                  :color="formData.name ? 'green' : 'gray'"
                  class="transition-colors"
                />
                <template #hint>
                  <span class="text-sm text-gray-500">Le nom que vous utilisez au quotidien</span>
                </template>
              </UFormGroup>

              <!-- Birth Date -->
              <UFormGroup label="Date de naissance" required class="space-y-2">
                <UPopover :popper="{ placement: 'bottom-start' }">
                  <UButton 
                    variant="outline" 
                    color="gray" 
                    size="lg"
                    block
                    :class="{'ring-2 ring-green-500': formData.birthDate}"
                  >
                    <template #leading>
                      <UIcon name="i-heroicons-calendar-days"/>
                    </template>
                    {{ formData.birthDate ? df.format(formData.birthDate.toDate(getLocalTimeZone())) : 'Choisir une date' }}
                  </UButton>
                  <template #content>
                    <UCalendar v-model="formData.birthDate" :max-value="todayDate" />
                  </template>
                </UPopover>
                <template #hint>
                  <span v-if="formData.birthDate" class="text-sm text-green-600 dark:text-green-400">
                    {{ displayedAge }}
                  </span>
                  <span v-else class="text-sm text-gray-500">
                    Nous calculerons automatiquement l'âge
                  </span>
                </template>
              </UFormGroup>

              <!-- Weight -->
              <UFormGroup label="Poids actuel" class="space-y-2">
                <UInput 
                  v-model.number="formData.weight" 
                  type="number" 
                  step="0.1" 
                  placeholder="ex: 25.5" 
                  size="lg"
                  :color="formData.weight ? 'green' : 'gray'"
                >
                  <template #trailing>
                    <span class="text-gray-500 text-sm">kg</span>
                  </template>
                </UInput>
                <template #hint>
                  <span class="text-sm text-gray-500">Optionnel - vous pourrez l'ajouter plus tard</span>
                </template>
              </UFormGroup>

              <!-- Daily Food Quantity -->
              <UFormGroup label="Ration quotidienne" class="space-y-2">
                <UInput 
                  v-model.number="formData.mealQuantity" 
                  type="number" 
                  placeholder="ex: 300" 
                  size="lg"
                  :color="formData.mealQuantity ? 'green' : 'gray'"
                >
                  <template #trailing>
                    <span class="text-gray-500 text-sm">g/jour</span>
                  </template>
                </UInput>
                <template #hint>
                  <span class="text-sm text-gray-500">Quantité de croquettes par jour</span>
                </template>
              </UFormGroup>
            </div>
          </div>

          <!-- Pet Characteristics Section -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <UIcon name="i-heroicons-heart" class="mr-3 text-amber-500"/>
              Caractéristiques
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <!-- Animal Type -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Type d'animal
                </label>
                <div class="grid grid-cols-1 gap-3">
                  <UButton
                    v-for="type in petTypes"
                    :key="type.value"
                    @click="formData.type = type.value"
                    :variant="formData.type === type.value ? 'solid' : 'outline'"
                    :color="formData.type === type.value ? 'amber' : 'gray'"
                    size="lg"
                    class="justify-start"
                  >
                    <template #leading>
                      <UIcon :name="type.icon" class="text-xl"/>
                    </template>
                    {{ type.label }}
                  </UButton>
                </div>
              </div>

              <!-- Gender Selection -->
              <div class="space-y-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Genre
                </label>
                <div class="grid grid-cols-2 gap-3">
                  <UButton
                    @click="formData.gender = 'male'"
                    :variant="formData.gender === 'male' ? 'solid' : 'outline'"
                    :color="formData.gender === 'male' ? 'blue' : 'gray'"
                    size="lg"
                    class="justify-center"
                  >
                    <template #leading>
                      <UIcon name="i-heroicons-user" class="text-xl"/>
                    </template>
                    Mâle
                  </UButton>
                  <UButton
                    @click="formData.gender = 'female'"
                    :variant="formData.gender === 'female' ? 'solid' : 'outline'"
                    :color="formData.gender === 'female' ? 'pink' : 'gray'"
                    size="lg"
                    class="justify-center"
                  >
                    <template #leading>
                      <UIcon name="i-heroicons-user" class="text-xl"/>
                    </template>
                    Femelle
                  </UButton>
                </div>
              </div>
            </div>
          </div>

          <!-- Avatar Selection Section -->
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <UIcon name="i-heroicons-camera" class="mr-3 text-amber-500"/>
              Photo (Optionnel)
            </h2>
            
            <DAvatarSelector 
              :model-value="formData.avatar.fileURL" 
              :avatars="avatars" 
              @update:model-value="onSelectAvatar" 
            />
          </div>

          <!-- Form Actions -->
          <div class="flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
            <UButton 
              variant="ghost" 
              to="/" 
              size="lg"
              class="sm:w-auto order-2 sm:order-1"
            >
              <UIcon name="i-heroicons-x-mark" class="mr-2"/>
              Annuler
            </UButton>
            
            <div class="flex-1"></div>
            
            <UButton 
              type="submit"
              color="amber" 
              size="lg"
              :disabled="!canSubmit"
              :loading="isSubmitting"
              class="order-1 sm:order-2"
            >
              <template #leading>
                <UIcon name="i-heroicons-heart"/>
              </template>
              {{ isSubmitting ? 'Ajout en cours...' : 'Ajouter à la famille' }}
            </UButton>
          </div>
        </form>
      </UCard>

      <!-- Help Card -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-heroicons-light-bulb" class="text-amber-500"/>
            <h3 class="font-semibold">Conseils</h3>
          </div>
        </template>
        
        <div class="prose prose-sm dark:prose-invert">
          <ul class="space-y-2">
            <li>• Seuls le <strong>nom</strong> et la <strong>date de naissance</strong> sont obligatoires</li>
            <li>• Vous pourrez ajouter le poids et ajuster la ration plus tard</li>
            <li>• La photo peut être modifiée à tout moment depuis le profil</li>
            <li>• Une fois créé, vous pourrez programmer les traitements de santé</li>
          </ul>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone, today} from '@internationalized/date'
import DAvatarSelector from '~/components/custom/DAvatarSelector.vue';

definePageMeta({
  layout: 'authenticated'
})

const df = new DateFormatter('fr-FR', {
  dateStyle: 'medium'
});
const todayDate = ref(today())
const router = useRouter();
const animalStore = useAnimalStore();
const isSubmitting = ref(false);

const avatars = ref([
  {fileURL: 'https://images.unsplash.com/photo-1678818546240-2702b53da4da?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', file: null},
])

// Form data with default values
const formData = ref({
  name: '',
  birthDate: null as CalendarDate | null,
  gender: null as 'male' | 'female' | null,
  type: 'Dog' as const,
  weight: null as number | null,
  mealQuantity: null as number | null,
  avatar: {fileURL: '', file: null as File | null},
});

// Pet type options
const petTypes = [
  { value: 'Dog', label: 'Chien', icon: 'i-heroicons-heart' },
  // Future pet types can be added here
];

// Computed properties
const displayedAge = computed(() => {
  if (!formData.value.birthDate) return '';
  const age = calculAge(formData.value.birthDate.toString());
  return ageToString(age!);
});

const canSubmit = computed(() => {
  return formData.value.name.trim() && formData.value.birthDate && !isSubmitting.value;
});

// Event handlers
const onSelectAvatar = (avatarData: {fileURL: string, file: File | null}) => {
  formData.value.avatar = avatarData;
}

const savePet = async () => {
  if (!canSubmit.value) return;

  try {
    isSubmitting.value = true;
    
    await animalStore.addAnimal({
      name: formData.value.name.trim(),
      birthDate: formData.value.birthDate!.toString(),
      gender: formData.value.gender || 'male',
      type: formData.value.type,
      weight: formData.value.weight,
      mealQuantity: formData.value.mealQuantity,
      weightHistory: []
    }, formData.value.avatar);

    // Navigate to the new pet's profile
    router.push(`/${formData.value.name.trim()}`);
  } catch (error) {
    console.error('Error adding pet:', error);
    // You could add a toast notification here
  } finally {
    isSubmitting.value = false;
  }
};
</script>