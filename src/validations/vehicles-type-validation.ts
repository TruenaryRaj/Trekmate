import { z } from "zod";

export const vehiclesTypeSchema = z.object({
    name: z.string().max(50),
    capacity: z.int().positive()
})