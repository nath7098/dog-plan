

interface State {
    animals: Animal[]
}

export const useAnimalStore = defineStore('animals', {
    state: (): State => ({
        animals: [
            {
                type: 'Dog',
                name: 'Saphyr',
                gender: 'male',
                birthDate: '2021-11-15',
                weight: 32,
                mealQuantity: 309,
                weightHistory: [
                    { date: '2021-12-24', weight: 6 },
                    { date: '2022-01-20', weight: 11.2 },
                    { date: '2022-03-02', weight: 15 },
                    { date: '2022-05-05', weight: 19.7 },
                    { date: '2022-09-02', weight: 21.6 },
                    { date: '2022-12-02', weight: 24.2 },
                    { date: '2023-06-08', weight: 27.7 },
                    { date: '2023-10-02', weight: 28.5 },
                    { date: '2024-02-14', weight: 29.9 },
                    { date: '2024-07-24', weight: 32.7 },
                    { date: '2024-12-01', weight: 34.2 },
                    { date: '2025-01-24', weight: 33.7 },
                ]
            }
        ]
    }),
    getters: {
        animalByName: (state: State) => {
            return (name: string) => state.animals.find((animal) => animal.name.toLowerCase() === name.toLowerCase());
        }
    },
    actions: {
        addAnimal(animal: Animal) {
            this.animals.push(animal);
          },
          
          updateAnimal(animal: Animal) {
            for (let a of this.animals) {
                if (animal.name === a.name) {
                    a = animal;
                    return a;
                }
            }
            return animal;
          },
          
          removeAnimal(index: number) {
            if (index >= 0 && index < this.animals.length) {
              this.animals.splice(index, 1);
            }
          }
    }
})