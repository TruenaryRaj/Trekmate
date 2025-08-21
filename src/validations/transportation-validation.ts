import z, { int, string, url } from "zod";
import { vehiclesTypeSchema } from "./vehicles-type-validation";

export const gradeEnum = z.enum(['Easy', 'Moderate', 'Hard']);

export const transportationSchema = z.object({
    destinationId: z.int(),
    price: int().positive(),
    time: string().max(50),
    grade: gradeEnum,
    distance: string().max(50),
    vehiclesType: vehiclesTypeSchema,
    urls: z.array(url())
}) 