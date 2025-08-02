import { user } from "../db/schema/user.schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { RoleTypes, UserInput } from "../types";


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

    async findUserByEmail (email: string) {
        const result = await db.select().from(user).where(eq(user.email, email));
        return result;
    }
} 