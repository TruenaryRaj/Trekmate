import { and, asc, desc, eq } from "drizzle-orm";
import { db } from "../db/db"
import { accomodation, destination, image, transportation } from "../db/schema"
import { DestinationInput, PaginationInput } from "../types";
import { imageRepositories } from "./image.repositories";

export const destinationRepositories = {
    async addDestination(input: DestinationInput) {
        const {  name, description, shortDescription, highestElivation, region, urls } = input;
        try{
            const [result] = await db.insert(destination).values({
            name,
            description,
            shortDescription,
            highestElivation,
            region
        })
        
        for(const url of urls) {
            await imageRepositories.addImage({
                url,
                relatedId: result.insertId,
                relatedTypes: 'destination'
            });
        }
        return result.insertId;
        } catch (error) {
            throw new Error('Failed to add destination');
        }
    },

    async getDestinationById(id: number) {
        try{ 
            const result = await db.select().from(destination)
            .leftJoin(image, and(eq(destination.id , image.relatedId), eq(image.relatedTypes, 'destination')))
            .leftJoin(accomodation, eq(destination.id, accomodation.destinationId))
            .leftJoin(transportation, eq(destination.id, transportation.destinationId))
            .where(eq(destination.id, id));
            return result;
        } catch{
            throw new Error('Failed to get destination by id');
        }
    },

    async getAllDestination(input: PaginationInput) {
        const { page, limit, sortBy } = input;
        const offset = (page - 1) * limit;

        const result = await db.select().from(destination)
        .leftJoin(image, and(eq(destination.id , image.relatedId), eq(image.relatedTypes, 'destination')))
        .limit(limit)
        .offset(offset)
        .orderBy(destination.name, sortBy == 'asc' ? (asc(destination.name)) : (desc(destination.name)));

        return result;
    },

    async deleteDestination(id: number) {
        try {
            const destinationEntries = await db.select().from(destination).where(eq(destination.id, id))
            .leftJoin(accomodation, eq(destination.id, accomodation.destinationId))
            .leftJoin(transportation, eq(destination.id, transportation.destinationId));
            if(destinationEntries.length > 0) {
                throw new Error('Cannot delete destination with existing accomodations or transportations');
            }
            await db.delete(destination).where(eq(destination.id, id));
            await imageRepositories.deleteImageByRelatedId(id, 'destination');
        } catch (error) {
            throw new Error('Failed to delete destination');
        }
    }
}