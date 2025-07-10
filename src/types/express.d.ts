/**
 * This file is part of the TypeScript type definitions for the Express framework.
 * It extends the Request interface to include a user property.
 * This is useful for middleware that attaches user information to the request object after authentication.
 */

import { JwtPayload } from 'jsonwebtoken';
import { User } from './user.types';
declare module 'express-serve-static-core' {
  interface Request {
    user: User | null;
  }
}
