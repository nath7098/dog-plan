<template>
  <div class="p-8 max-w-4xl mx-auto">
    <!-- Header with back button -->
    <div class="flex items-center mb-10">
      <UButton icon="i-lucide-arrow-left" variant="ghost" to="/" class="mr-4" />
      <h1 class="text-3xl font-medium">Ajouter un animal</h1>
    </div>

    <!-- Simple form with clean layout -->
    <UCard class="rounded-xl p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Left column - Essential information -->
        <div class="flex flex-col gap-6">
          <!-- Name input - Required -->
          <UFormField label="Nom" required>
            <UInput v-model="formData.name" placeholder="Nom de votre animal" />
          </UFormField>

          <!-- Birth date - Required -->
          <UFormField label="Date de naissance" required>
            <UPopover>
              <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
                {{ formData.birthDate ? df.format(formData.birthDate.toDate(getLocalTimeZone())) : 'Select a date' }}
              </UButton>

              <template #content>
                <UCalendar v-model="formData.birthDate" :max-value="todayDate" class="p-2" />
              </template>
            </UPopover>
            <p v-if="formData.birthDate" class="text-sm text-neutral-500 mt-1">
              {{ displayedAge }}
            </p>
          </UFormField>

          <!-- Weight input -->
          <UFormField label="Poids (kg)">
            <UInput v-model="formData.weight" type="number" step="0.1" placeholder="Poids en kg" />
          </UFormField>

          <!-- Food quantity -->
          <UFormField label="Quantité de croquettes (g/jour)">
            <UInput v-model="formData.mealQuantity" type="number" placeholder="Quantité journalière" />
          </UFormField>
        </div>

        <!-- Right column - Additional information -->
        <div class="flex flex-col gap-6">
          <!-- Type selection with icons -->
          <UFormField label="Type d'animal">
            <UButtonGroup block>
              <UButton v-for="type in petTypes" :key="type.value" @click="formData.type = type.value"
                :variant="formData.type === type.value ? 'solid' : 'outline'" color="neutral">
                <UIcon :name="type.icon" class="mr-2" />
                {{ type.label }}
              </UButton>
            </UButtonGroup>
          </UFormField>

          <!-- Gender selection -->
          <UFormField label="Genre">
            <UButtonGroup block>
              <UButton @click="formData.gender = 'male'" :class="formData.gender === 'male' ? 'text-blue-500' : ''"
                :variant="formData.gender === 'male' ? 'solid' : 'outline'" color="neutral">
                <UIcon name="i-ic-baseline-male" class="mr-2" />
                Mâle
              </UButton>
              <UButton @click="formData.gender = 'female'" :class="formData.gender === 'female' ? 'text-pink-500' : ''"
                :variant="formData.gender === 'female' ? 'solid' : 'outline'" color="neutral">
                <UIcon name="i-ic-baseline-female" class="mr-2" />
                Femelle
              </UButton>
            </UButtonGroup>
          </UFormField>

          <!-- Avatar selection -->
          <DAvatarSelector :model-value="formData.avatar" :avatars="avatars" @update:model-value="formData.avatar = $event" />
        </div>
      </div>

      <!-- Form actions -->
      <div class="flex justify-end mt-8">
        <UButton variant="outline" color="neutral" to="/" class="mr-4">
          Annuler
        </UButton>
        <UButton color="primary" :disabled="!formData.name || !formData.birthDate" @click="savePet">
          Ajouter à la famille
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import { CalendarDate, DateFormatter, getLocalTimeZone, today} from '@internationalized/date'
import DAvatarSelector from '~/components/custom/DAvatarSelector.vue';

const client = useSupabaseClient();
const user = useSupabaseUser();
const df = new DateFormatter('fr-FR', {
  dateStyle: 'medium'
});
const todayDate = ref(today())

const router = useRouter();
const animalStore = useAnimalStore();

const avatars = ref([
  'https://images.unsplash.com/photo-1678818546240-2702b53da4da?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
])

// Form data with default values
const formData = ref({
  name: '',
  birthDate: null as CalendarDate,
  gender: null,
  type: 'Dog',
  weight: null,
  mealQuantity: null,
  avatar: '',
});

// Pet type options
const petTypes = [
  { value: 'Dog', label: 'Chien', icon: 'i-fluent-animal-dog-16-regular' },
  // { value: 'cat', label: 'Chat', icon: 'i-fluent-animal-cat-20-regular' },
  // { value: 'rabbit', label: 'Lapin', icon: 'i-noto-rabbit' },
  // { value: 'bird', label: 'Oiseau', icon: 'i-noto-bird' },
];

// Calculate and format age based on birth date
const displayedAge = computed(() => {
  if (!formData.value || !formData.value.birthDate) return '';

  const age = calculAge(formData.value.birthDate.toString());
  return ageToString(age!);
});

// Save pet to store and navigate to home
const savePet = async () => {
  // Validate required fields
  if (!formData.value.name || !formData.value.birthDate) {
    return;
  }
  // Add pet to store and persist
  await animalStore.addAnimal({
    name: formData.value.name,
    birthDate: formData.value.birthDate.toString(),
    gender: formData.value.gender,
    type: formData.value.type,
    weight: formData.value.weight,
    mealQuantity: formData.value.mealQuantity,
    avatar: formData.value.avatar,
    weightHistory: formData.value.weight ? [formData.value.weight] : []
  });

  // Navigate to home page
  router.push('/');
};
</script>