import { Request, Response, NextFunction } from 'express';
import { RoleTypes, User } from '../types';
import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secretkey';
export const generateToken = ( email: string, role: RoleTypes) : string => {
        const token = jwt.sign(
            { email, role },
            secret,
            { expiresIn: '1h'}
        );
        return token;
    }

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    console.log('auth' + token);
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return next();
    }
    try {
    // Verify the token and extract the user information
    const payload = jwt.verify(token, secret) as User;
    if (!payload || !payload.email) {
      res.status(403).json({ message: 'Invalid token' });
       return next();
    }
    req.user = payload;
    return next();
  } catch (err: any) {
    console.error("AuthMiddleware error:", err.message);
    return next();
  }
};