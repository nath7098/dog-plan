import type Weight from './weight';
import type Food from './food';

export default interface Animal {
    id: number,
    type: 'Dog',
    name: string,
    birthDate: string,
    gender: 'male' | 'female',
    weight: number,
    mealQuantity?: number,
    avatar?: string,
    weightHistory?: Weight[],
    fleaProtection?: {animalId: number, start: string | null, end: string | null},
    wormProtection?: {animalId: number, start: string | null, end: string | null},
    food: Food[]
}

