import { user } from "../db/schema/user.schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";


export const userRepositories = {

    async createUser(name: string, email: string, password: string, phone: number ) {
        const result = await db.insert(user).values({
            name,
            email,
            password,
            phone
        });
        return result;
    },

    async findUserByEmail (email: string) {
        const result = await db.select().from(user).where(eq(user.email, email));
        return result;
    }
} 