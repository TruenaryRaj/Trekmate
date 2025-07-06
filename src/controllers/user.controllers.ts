import { Request, Response } from "express";
import { userRepositories } from "../repositories/user.repositories"
import bcrypt from 'bcrypt'
import { generateToken } from '../middleware/auth.middleware';
export const userController = {

    async addUser(req: Request, res: Response) {
        const { name, email, phone, password} = req.body;
        const hashed = await bcrypt.hash(password,10);
        await userRepositories.createUser(
            name,
            email,
            hashed,
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
        const token = generateToken(email);
        res.status(201).json({
            token,
            message: "user login sucessful"
        })
    }
}