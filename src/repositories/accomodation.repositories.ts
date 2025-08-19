import { accomodation, image } from '../db/schema';
import { db } from '../db/db'
import { AccomodationInput } from '../types';
import { imageRepositories } from './image.repositories';
import { eq, and } from 'drizzle-orm';
export const accomodationRepositories = {
    async addAccomodation(input: AccomodationInput) {
        const {  name,
            description,
            destinationId,
            price,
            time, 
            urls
        } = input;
    try{
        const [result] = await db.insert(accomodation).values({
        name,
        description,
        destinationId,
        price,
        time
    })
    for(const url of urls) {
        await imageRepositories.addImage({
            url,
            relatedId: result.insertId,
            relatedTypes: 'accomodation'
        });
    }
    return result.insertId;
    }   catch (error) {
        throw new Error('Failed to add accomodation');
    }
    },

    async getAllAccomodation() {
        const result = await db.select().from(accomodation)
        .leftJoin(image, and(eq(accomodation.id , image.relatedId), eq(image.relatedTypes, 'accomodation')));
        return result;
    },

}

