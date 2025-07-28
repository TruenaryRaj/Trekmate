import { number, string, z } from 'zod'
export const locationSchema = z.object({
    name: string().min(3),
    description: string().min(3),
    estimatedTime: string(),
    destinationId: number() 
})