
import { number, string, z } from 'zod';

export const accomodationSchema = z.object({
    name: string().min(3),
    ownerName: string().min(3),
    phone: string().min(10),
    description: string().min(3),
    locationId: number()
})