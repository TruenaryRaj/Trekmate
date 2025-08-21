import z from "zod"

export const relatedEnums = z.enum(['accomodation', 'transportation', 'destination']).default('accomodation');
   
   
export const imageSchema = z.object({
    id: z.number().int().positive().optional(),
    relatedId: z.number().int().positive(),
    relatedTypes: relatedEnums,
    url: z.string().max(255),
}) 