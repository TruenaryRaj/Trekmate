import {z, int, string } from "zod";
export const statusEnum = z.enum(['pending', 'conformed', 'cancelled', 'completed']).default('pending');

export const accomodationBooking = z.object({
    userId: int(),
    accomodationId: int(),
    date: string(),
})

export const transportationBooking = z.object({
    userId: int(),
    transportationId: int(),
    date: string(),
})
