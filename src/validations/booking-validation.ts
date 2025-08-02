import z, { int, string } from "zod";
export const serviceEnum = z.enum(['accomodation', 'transportation']);

export const bookingInputSchema = z.object({
    userId: int(),
    serviceType: serviceEnum,
    serviceId: int(),
    date: string(),  
})