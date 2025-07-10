import { z, string, number } from 'zod';

export const roleEnum = z.enum(['user', 'admin']);

export const userSchema = z.object({
    name: string().min(3, "please enter a valid name"),
    email: string().min(12, "email"),
    password: string(),
    role: roleEnum,
    phone: string()
})