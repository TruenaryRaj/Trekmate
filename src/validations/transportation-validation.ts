import z, { int, string } from "zod";
import { vehiclesTypeSchema } from "./vehicles-type-validation";

export const transportationSchema = z.object({
    destinationId: z.int().positive(),
    price: int().positive(),
    time: string().max(50).optional(),
    vehiclesType: vehiclesTypeSchema
})