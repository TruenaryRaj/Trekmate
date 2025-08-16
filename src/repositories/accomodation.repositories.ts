import { accomodation } from '../db/schema';
import { db } from '../db/db'
import { AccomodationInput } from '../types';

export const accomodationRepositories = {
    async addAccomodation(input: AccomodationInput) {
        const {  name,
            description,
            destinationId,
            price,
            time } = input;
        const [result] = await db.insert(accomodation).values({
            name,
            description,
            destinationId,
            price,
            time
        })
        return result.insertId;
    },

    async getAllAccomodation() {
        const result = await db.select().from(accomodation);
        return result;
    }
    
}

