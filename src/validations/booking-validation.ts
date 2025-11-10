import {z, int, date } from "zod";
export const statusEnum = z.enum(['pending', 'conformed', 'cancelled', 'completed']).default('pending');

export const accomodationBooking = z.object({
    userId: int(),
    accomodationId: int(),
    startingDate: date(),
    endingDate: date(),
})

export const transportationBooking = z.object({
    userId: int(),
    transportationId: int(),
    returnDate: date(),
    dispatchDate: date(),
})
