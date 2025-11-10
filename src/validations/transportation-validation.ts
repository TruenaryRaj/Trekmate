import z, { int, string, url } from "zod";
import { vehiclesTypeSchema } from "./vehicles-type-validation";

export const gradeEnum = z.enum(['Easy', 'Moderate', 'Hard']);

export const transportationSchema = z.object({
    destinationId: z.int(),
    price: int().positive(),
    grade: gradeEnum,
    vehiclesType: vehiclesTypeSchema,
    urls: z.array(url())
}) 