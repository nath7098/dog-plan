declare interface Food {
    type: 'Dog',
    brand: string,
    weight: number,
    state: 'stock' | 'open' | 'empty',
    openDate?: string,
}