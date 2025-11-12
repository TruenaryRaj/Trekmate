import { accomodation, accomodationBooking, image } from '../db/schema';
import { db } from '../db/db'
import { AccomodationInput, PaginationInput } from '../types';
import { imageRepositories } from './image.repositories';
import { eq, and } from 'drizzle-orm';

export const accomodationRepositories = {
    async addAccomodation(input: AccomodationInput) {
        const {  name,
            description,
            destinationId,
            price,
            urls
        } = input;
    try{
        const [result] = await db.insert(accomodation).values({
        name,
        description,
        destinationId,
        price
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

    async getAllAccomodation(input: PaginationInput) {
        const { page, limit, sortBy } = input;
        const offset = (page - 1) * limit;
        try {
            const result = await db.select().from(accomodation)
            .leftJoin(image, and(eq(accomodation.id , image.relatedId), eq(image.relatedTypes, 'accomodation')))
            .limit(limit)
            .offset(offset)
            .orderBy(accomodation.name, sortBy == 'asc' ? (accomodation.name) : (accomodation.name));
            return result;
        } catch (error) {
            throw new Error('Failed to get accomodations');
        }
    },

    async getAccomodation(id: number) {
        try{
            return await db.select().from(accomodation)
            .leftJoin(image, and(eq(accomodation.id , image.relatedId), eq(image.relatedTypes, 'accomodation')))
            .where(eq(accomodation.id, id));
        } catch{
            throw new Error('Failed to get accomodation by id');
        }
    },

    async deleteAccomodation(id: number) {
        try {
            const bookedEntries =  await db.select().from(accomodationBooking).where(eq(accomodationBooking.accomodationId, id));
            if(bookedEntries.length > 0) {
                throw new Error('Cannot delete accomodation with existing bookings');
            }
            await db.delete(accomodation).where(eq(accomodation.id, id));
            await imageRepositories.deleteImageByRelatedId(id, 'accomodation');
        } catch (error) {
            throw new Error('Failed to delete accomodation');
        }
    }
}

