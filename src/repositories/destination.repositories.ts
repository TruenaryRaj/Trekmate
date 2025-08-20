import { and, eq } from "drizzle-orm";
import { db } from "../db/db"
import { destination, image } from "../db/schema"
import { DestinationInput } from "../types";
import { imageRepositories } from "./image.repositories";

export const destinationRepositories = {
    async addDestination(input: DestinationInput) {
        const {  name, description, shortDescription, urls } = input;
        try{
            const [result] = await db.insert(destination).values({
            name,
            description,
            shortDescription
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

    async getAllDestination() {
        const result = await db.select().from(destination)
        .leftJoin(image, and(eq(destination.id , image.relatedId), eq(image.relatedTypes, 'destination')));
        return result;
    },
}