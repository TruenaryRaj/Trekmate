import {z, string } from "zod";

export const destinationSchema = z.object({
    name: string().min(3),
    description: string().min(3),
    shortDescription: string(),
    highestElivation: z.number().int(),
    region: string().min(3),
    urls: z.array(string())
})