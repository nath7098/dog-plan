export default interface Food {
    animalId: number,
    type: 'Dog',
    brand: string,
    weight: number,
    state: 'stock' | 'open' | 'empty',
    openDate?: string,
}