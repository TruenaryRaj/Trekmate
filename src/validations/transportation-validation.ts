import z, { int, string, url } from "zod";
import { vehiclesTypeSchema } from "./vehicles-type-validation";

export const transportationSchema = z.object({
    destinationId: z.int().positive(),
    price: int().positive(),
    time: string().max(50).optional(),
    vehiclesType: vehiclesTypeSchema,
    urls: z.array(url())
})