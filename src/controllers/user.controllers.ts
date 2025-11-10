import { Request, Response } from "express";
import { userRepositories } from "../repositories/user.repositories"
import bcrypt from 'bcrypt'
import { generateToken } from '../middleware/auth.middleware';
import { handleImageUpload } from "../utils";
export const userController = {

    async signup(req: Request, res: Response) {
        const { name, email, phone, role, password} = req.body;
        const files = req.files as Express.Multer.File[]; // Multer files
        let path ;
        if (files) {
            try {
            const imageUrl = await handleImageUpload(files[0]);
            if(imageUrl) path = imageUrl;
            } catch (error) {
                res.status(500).json({ error: 'Failed to upload image' });
            }
        } else {
            res.status(400).json({ error: 'No images provided' });
        }

        const hashed = await bcrypt.hash(password,10);
        const result = await userRepositories.createUser({
            name,
            email,
            password: hashed,
            role,
            phone,
            imagePath: path
           })
        res.json({
            message: result
        });
    },

    async login(req: Request, res: Response) {
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
            validateUser[0].role!,
            validateUser[0].id!,
        );
        res.status(201).json({
            token,
            message: "user login sucessful"
        })
    },

    verifyEmail(req: Request, res: Response) {
        try {
            userRepositories.verifyUserEmail(req.user!.id);
            res.json({ message: "Email verified successfully"});
        } catch (error) {
            res.status(400).json({ error: "Invalid or expired token" });
        }
    }
}