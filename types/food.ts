export default interface Food {
    id?: number,
    animalId: number,
    type: 'Dog',
    brand: string,
    weight: number,
    state: 'stock' | 'open' | 'empty',
    openDate?: string,
}