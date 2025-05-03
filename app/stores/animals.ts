import { today, getLocalTimeZone } from '@internationalized/date';
import type Animal from '~~/types/animal';

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
            weightHistory (id, weight, date),
            fleaProtection (id, start, end),
            wormProtection (id, start, end),
            food (id, type, brand, weight, state, openDate)
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
        throw new Error('No animal found');
      }
      return animal;
    },
    
    async addAnimal(animal: Animal) {
      try {
        this.loading = true;
        this.error = null;
        
        const client = useSupabaseClient();
        const user = useState('user').value;
        
        if (!user || !user.id) {
          this.error = 'User not authenticated';
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
            .from('weight_history')
            .insert({
              animal_id: animalData.id,
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
    addFood(name: string, food: Food) {
      const animal = this.getAnimal(name);
      if (!animal.food) {
        animal.food = [];
      }
      animal.food.push(food);
      return animal;
    },
    openFood(name: string) {
      const animal = this.getAnimal(name);
      if (animal.food) {
        for (const f of animal.food) {
          if (f.state === 'stock') {
            f.openDate = today(getLocalTimeZone()).toString();
            f.state = 'open';
            break;
          }
        }
      }
      return animal;
    },
    finishFood(name: string) {
      const animal = this.getAnimal(name);
      if (animal.food) {
        animal.food.find(f => f.state === 'open').state = 'empty';
      }
      return animal;
    },
    updateMealQuantity(name: string, quantity?: number) {
      const animal = this.getAnimal(name);
      animal.mealQuantity = quantity;
      return animal;
    }
  }
})