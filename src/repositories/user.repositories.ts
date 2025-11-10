import { user } from "../db/schema/user.schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { UserInput } from "../types";
import { sendEmail } from "../utils";
import { generateToken } from "../middleware/auth.middleware";
import { imageRepositories } from "./image.repositories";


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
        await imageRepositories.addImage({
            url: input.imagePath!,
            relatedId: result.insertId,
            relatedTypes: 'user'
        });
        const token = generateToken(input.email, input.role!, result.insertId);
        sendEmail({
            receiver: input.email,
            topic: "VERIFY_EMAIL",
            subject: "Email verification",
            name: input.name,
            token: token
        })
        return  { message: "If this email exists then a verification mail has been sent, please verify."};
    } catch ( error ) 
    {
        return { message: "dups entry" }
    } 
    },

    async me(id: number) {
        try {
            return await db.select({
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
            }).from(user).where(eq(user.id, id));
        } catch (error) {
            throw new Error("Error fetching user details");
        }
    },

    async findUserByEmail (email: string) {
        try{
            return await db.select().from(user).where(eq(user.email, email));
        } catch (error) {
            throw new Error("Error fetching user details");
        }
    },

    async verifyUserEmail(id: number) {
        try {
            await db.update(user).set({ isValidEmail: true }).where(eq(user.id, id));
        } catch {
            throw new Error("Error verifying user email");
        }
    }
} 