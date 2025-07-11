import z, { int } from "zod";
export const serviceEnum = z.enum(['accomodation', 'transportation']);

export const bookingSchema = z.object({
    userId: int(),
    serviceType: serviceEnum,
    serviceId: int()
})