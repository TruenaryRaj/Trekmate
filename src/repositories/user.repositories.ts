import { user } from "../db/schema/user.schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { RoleTypes, UserInput } from "../types";
import { email } from "zod";


export const userRepositories = {

    async createUser(input : UserInput): Promise<{ message: string}>  {
        try{
            const [result] = await db.insert(user).values({
            name: input.name,
            email: input.email,
            password: input.password,
            role: input.role,
            phone: input.phone
        });
        if(!result || !result.insertId) {
            return { message: "user creation failed"};
        }
        return  { message: "user creation sucess"};
    } catch ( error ) 
    {
        return { message: "dups entry" }
    } 
    },

    async me (id: number) {
        return await db.select({
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
        }).from(user).where(eq(user.id, id));
    },

    async findUserByEmail (email: string) {
        return await db.select().from(user).where(eq(user.email, email));
    }
} 