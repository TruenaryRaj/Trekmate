import { Request, Response } from "express";
import { userRepositories } from "../repositories/user.repositories"
import bcrypt from 'bcrypt'
import { generateToken } from '../middleware/auth.middleware';
export const userController = {

    async addUser(req: Request, res: Response) {
        const { name, email, phone, role, password} = req.body;
        const hashed = await bcrypt.hash(password,10);
        await userRepositories.createUser(
            name,
            email,
            hashed,
            role,
            phone
        )
        res.status(201).json({
            message: 'user created sucessfully'
        })
    },

    async userLogin(req: Request, res: Response) {
        const { email, password} = req.body;
        const validateUser = await userRepositories.findUserByEmail(email);
        if(validateUser == null)
        {
            res.json({
               message: "invlaid username or password"
            })
        }
        const isPasswordValid = await bcrypt.compare(password, validateUser[0].password!);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid username or password" });
        }
        const token = generateToken(
            validateUser[0].email!,
            validateUser[0].role!
        );
        res.status(201).json({
            token,
            message: "user login sucessful"
        })
    }
}