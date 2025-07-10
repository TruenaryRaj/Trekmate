import { db } from "../db/db"
import { destination } from "../db/schema"

export const destinationRepositories = {
    async addDestination(name: string, description: string) {
        const [result] = await db.insert(destination).values({
            name,
            description
        })
        return result.insertId;
    }
}