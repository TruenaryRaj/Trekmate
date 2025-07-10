import { user } from "../db/schema/user.schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { RoleTypes } from "../types";


export const userRepositories = {

    async createUser(name: string, email: string, password: string, role: RoleTypes, phone: string,  ) {
        const result = await db.insert(user).values({
            name: name,
            email: email,
            password: password,
            role: role,
            phone: phone
        });
        return result;
    },

    async findUserByEmail (email: string) {
        const result = await db.select().from(user).where(eq(user.email, email));
        return result;
    }
} 