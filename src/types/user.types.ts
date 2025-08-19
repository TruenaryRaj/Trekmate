import { userSchema } from "../validations";
import { z } from 'zod';
import { roleEnum } from "../validations";

export type UserInput = z.infer< typeof userSchema>
export type RoleTypes = z.infer<typeof roleEnum>

export interface User
{
  email: string;
  role: RoleTypes;
  id: number;
}