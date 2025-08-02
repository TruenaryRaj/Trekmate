import { LocationInput } from "../types";
import { db } from '../db/db';
import { location } from "../db/schema";
export const locationRepositories = {
    async addLocation (name: string, description: string, estimatedTime: string, destinationId: number) {
        const [result] = await db.insert(location).values({
            name, 
            description,
            estimatedTime,
            destinationId
        });
        return result.insertId;
    }
}