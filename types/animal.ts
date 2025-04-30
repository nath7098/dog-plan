import type { CalendarDate } from '@internationalized/date';

declare interface Animal {
    type: 'Dog',
    name: string,
    birthDate: string,
    gender: 'male' | 'female',
    weight: number,
    mealQuantity?: number,
    avatar?: string,
    weightHistory?: Weight[],
    fleaProtection?: {start: string | null, end: string | null},
    wormProtection?: {start: string | null, end: string | null},
    food: Food[]
}

