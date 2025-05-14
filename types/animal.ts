import type Weight from './weight';
import type Food from './food';
import type Protection from './protection';

export default interface Animal {
    id: number,
    type: 'Dog',
    name: string,
    birthDate: string,
    gender: 'male' | 'female',
    weight: number,
    mealQuantity?: number,
    avatar?: string,
    avatarDisplay?: string,
    weightHistory?: Weight[],
    fleaProtection?: Protection,
    wormProtection?: Protection,
    food: Food[]
}

