import type { DateValue } from "@internationalized/date";

declare interface Animal {
    type: 'Dog',
    name: string,
    birthDate: Date,
    gender: 'male' | 'female',
    weight: number,
    mealQuantity?: number,
    avatar?: string,
    weightHistory?: {date: Date, weight: number}[],
    fleaProtectionStart?: DateValue,
    wormProtectionStart?: DateValue
}

