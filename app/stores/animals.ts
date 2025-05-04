import { today, getLocalTimeZone } from '@internationalized/date';
import type Animal from '~~/types/animal';
import type Food from '~~/types/food';
import type Protection from '~~/types/protection';
import type Weight from '~~/types/weight';

interface State {
  animals: Animal[],
  loading: boolean;
  error: string | null;
}

export const useAnimalStore = defineStore('animals', {
  state: (): State => ({
    animals: [],
    loading: false,
    error: null
  }),
  getters: {
    animalByName: (state: State) => {
      return (name: string) => state.animals.find((animal) => animal.name.toLowerCase() === name.toLowerCase());
    }
  },
  actions: {
    async fetchAnimals() {
      try {
        this.loading = true;
        this.error = null;

        const client = useSupabaseClient();
        const user = useSupabaseUser().value; // Using Nuxt's useState for user

        if (!user || !user.id) {
          this.error = 'User not authenticated';
          return null;
        }

        const { data, error } = await client
          .from('animal')
          .select(`
            id, name, type, birthDate, gender, weight, mealQuantity, avatar,
            weightHistory (id, animalId, weight, date),
            fleaProtection (animalId, start, end),
            wormProtection (animalId, start, end),
            food (id, animalId, type, brand, weight, state, openDate)
          `)
          .eq('userId', user.id);

        if (error) {
          console.error('Supabase error:', error);
          this.error = error.message;
          return null;
        }

        this.animals = data || [];
        return this.animals;
      } catch (err) {
        console.error('Error fetching animals:', err);
        this.error = err instanceof Error ? err.message : 'Unknown error';
        return null;
      } finally {
        this.loading = false;
      }
    },

    getAnimal(name: string) {
      const animal = this.animals.find((animal) => animal.name.toLowerCase() === name.toLowerCase());
      if (!animal) {
        throw new Error('No animal found');
      }
      return animal;
    },
    getAnimalById(id: number) {
      const animal = this.animals.find((animal) => animal.id === id);
      if (!animal) {
        throw new Error('No animal found for id ' + id);
      }
      return animal;
    },
    async addAnimal(animal: Animal) {
      try {
        this.loading = true;
        this.error = null;

        const client = useSupabaseClient();
        const user = useSupabaseUser().value;

        if (!user || !user.id) {
          this.error = 'User not authenticated';
          console.error(this.error);
          return null;
        }

        const { data: animalData, error: animalError } = await client
          .from('animal')
          .insert({
            userId: user.id,
            name: animal.name,
            birthDate: animal.birthDate,
            gender: animal.gender,
            type: animal.type,
            weight: animal.weight,
            mealQuantity: animal.mealQuantity,
            avatar: animal.avatar,
          })
          .select()
          .single();

        if (animalError) {
          console.error('Error adding animal:', animalError);
          this.error = animalError.message;
          return null;
        }

        if (animalData && animal.weight) {
          const { error: weightError } = await client
            .from('weightHistory')
            .insert({
              animalId: animalData.id,
              weight: animal.weight,
              date: today(getLocalTimeZone()).toString()
            });

          if (weightError) {
            console.error('Error adding weight history:', weightError);
            // Continue execution as this is not a critical error
          }
        }

        await this.fetchAnimals();
        return animalData;
      } catch (err) {
        console.error('Error in addAnimal:', err);
        this.error = err instanceof Error ? err.message : 'Unknown error';
        return null;
      } finally {
        this.loading = false;
      }
    },

    async updateAnimal(id: number, animalUpdate: Partial<Animal>) {
      try {
        this.loading = true;
        this.error = null;

        const client = useSupabaseClient();

        const { error } = await client
          .from('animal')
          .update(animalUpdate)
          .eq('id', id);

        if (error) {
          console.error('Error updating animal:', error);
          this.error = error.message;
          return false;
        }

        await this.fetchAnimals();
        return true;
      } catch (err) {
        console.error('Error in updateAnimal:', err);
        this.error = err instanceof Error ? err.message : 'Unknown error';
        return false;
      } finally {
        this.loading = false;
      }
    },

    async removeAnimal(id: number) {
      try {
        this.loading = true;
        this.error = null;

        const client = useSupabaseClient();

        const { error } = await client
          .from('animal')
          .delete()
          .eq('id', id);

        if (error) {
          console.error('Error removing animal:', error);
          this.error = error.message;
          return false;
        }

        const index = this.animals.findIndex(animal => animal.id === id);
        if (index >= 0) {
          this.animals.splice(index, 1);
        }

        return true;
      } catch (err) {
        console.error('Error in removeAnimal:', err);
        this.error = err instanceof Error ? err.message : 'Unknown error';
        return false;
      } finally {
        this.loading = false;
      }
    },
    async addWeightHistory(animalId: number, weight: Weight) {
      try {
        this.loading = true;
        this.error = null;

        const client = useSupabaseClient();
        const { error } = await client.from('weightHistory').insert({ animalId, ...weight });

        if (error) {
          console.error('Error adding weight to animal:', error);
          this.error = error.message;
          return false;
        }
        await this.updateAnimal(animalId, { weight: weight.weight });
        await this.fetchAnimals();
        return this.getAnimalById(animalId);
      } catch (err) {
        console.error('Error in add weight history:', err);
        this.error = err instanceof Error ? err.message : 'Unknown error';
        return false;
      } finally {
        this.loading = false;
      }
    },
    async updateFleaProtection(protection: Protection) {
      try {
        this.loading = true;
        this.error = null;

        const client = useSupabaseClient();
        const { error } = await client.from('fleaProtection').upsert(protection, { onConflict: 'animalId' });

        if (error) {
          console.error('Error adding flea protection to animal:', error);
          this.error = error.message;
          return false;
        }
        await this.fetchAnimals();
        return this.getAnimalById(protection.animalId);
      } catch (err) {
        console.error('Error in add flea protection :', err);
        this.error = err instanceof Error ? err.message : 'Unknown error';
        return false;
      } finally {
        this.loading = false;
      }
    },
    async updateWormProtection(protection: Protection) {
      try {
        this.loading = true;
        this.error = null;

        const client = useSupabaseClient();
        const { error } = await client.from('wormProtection').upsert(protection, { onConflict: 'animalId' });

        if (error) {
          console.error('Error adding worm protection to animal:', error);
          this.error = error.message;
          return false;
        }
        await this.fetchAnimals();
        return this.getAnimalById(protection.animalId);
      } catch (err) {
        console.error('Error in add worm protection:', err);
        this.error = err instanceof Error ? err.message : 'Unknown error';
        return false;
      } finally {
        this.loading = false;
      }
    },
    async addFood(food: Food) {
      try {
        this.loading = true;
        this.error = null;

        const client = useSupabaseClient();
        const { error } = await client.from('food').insert(food);

        if (error) {
          console.error('Error adding food to animal:', error);
          this.error = error.message;
          return false;
        }
        await this.fetchAnimals();
        return this.getAnimalById(food.animalId);
      } catch (err) {
        console.error('Error in add food:', err);
        this.error = err instanceof Error ? err.message : 'Unknown error';
        return false;
      } finally {
        this.loading = false;
      }
    },
    async openFood(animalId: number) {
      try {
        this.loading = true;
        this.error = null;

        const animal = this.getAnimalById(animalId);
        let foodToOpen;
        if (animal.food) {
          for (const f of animal.food) {
            if (f.state === 'stock') {
              foodToOpen = { ...f };
              foodToOpen.openDate = today(getLocalTimeZone()).toString();
              foodToOpen.state = 'open';
              break;
            }
          }

          if (!foodToOpen) {
            this.error = 'No food in stock';
            this.loading = false;
            return false;
          }

          const client = useSupabaseClient();
          const { error } = await client.from('food').update(foodToOpen).eq('id', foodToOpen.id);

          if (error) {
            console.error('Error opening food :', error);
            this.error = error.message;
            return false;
          }
          await this.fetchAnimals();
        }

        return this.getAnimalById(animalId);
      } catch (err) {
        console.error('Error in open food :', err);
        this.error = err instanceof Error ? err.message : 'Unknown error';
        return false;
      } finally {
        this.loading = false;
      }
    },
    async finishFood(animalId: number) {
      try {
        this.loading = true;
        this.error = null;

        const animal = this.getAnimalById(animalId);
        let foodToFinish;
        if (animal.food) {
          foodToFinish = animal.food.find(f => f.state === 'open');

          if (!foodToFinish) {
            this.error = 'No food open';
            this.loading = false;
            return false;
          }
          foodToFinish.state = 'empty';

          const client = useSupabaseClient();
          const { error } = await client.from('food').update(foodToFinish).eq('id', foodToFinish.id);

          if (error) {
            console.error('Error finishing food :', error);
            this.error = error.message;
            return false;
          }
          await this.fetchAnimals();
        }

        return this.getAnimalById(animalId);
      } catch (err) {
        console.error('Error in finish food :', err);
        this.error = err instanceof Error ? err.message : 'Unknown error';
        return false;
      } finally {
        this.loading = false;
      }
    }
  }
})