import { accomodation } from '../db/schema';
import { db } from '../db/db'

export const accomodationRepositories = {
    async addAccomodation(name: string, ownerName: string, phone: string, description: string, locationId: number) {
        const [result] = await db.insert(accomodation).values({
            name,
            ownerName,
            phone,
            description,
            locationId
        })
        return result.insertId;
    }
}

