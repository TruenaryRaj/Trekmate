
import { number, string, z } from 'zod';

export const accomodationSchema = z.object({
    name: string(),
    description: string(),
    destinationId: number(),
    price: number(),
    time: string(),
    urls: z.array(string())
})