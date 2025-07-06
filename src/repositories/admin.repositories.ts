import { admin } from "../db/schema/admin.schema";
import { db } from "../db/db";

export const adminRepositories = {

    async createAdmin(email: string, password: string) {
        const result = await db.insert(admin).values({
           email,
           password
            
        });
        return result;
    }
}