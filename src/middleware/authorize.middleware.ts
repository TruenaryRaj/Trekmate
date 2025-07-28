import { Request, Response, NextFunction } from 'express';

export const authorize = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(401).json({ message: 'unauthorize access' })
      return;
    }
    next();
  };
};
