import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const generateToken = ( email: string) : string => {
        const token = jwt.sign(
            {email},
            process.env.JWT_SECRET!,
            { expiresIn: '1h'}
        );
        return token;
    }

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user as JwtPayload & { email: string };
        next();
    });
};