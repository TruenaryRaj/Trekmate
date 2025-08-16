import { db } from "../db/db"
import { destination } from "../db/schema"
import { DestinationInput } from "../types";

export const destinationRepositories = {
    async addDestination(input: DestinationInput) {
        const {  name, description, shortDescription } = input;
        const [result] = await db.insert(destination).values({
            name,
            description,
            shortDescription
        })
        return result.insertId;
    }
}