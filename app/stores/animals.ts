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
                birthDate: new Date('2021-11-15'),
                weight: 32,
                mealQuantity: 309,
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
            this.animals.push(animal)
        }
    }
})