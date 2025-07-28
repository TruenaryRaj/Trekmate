import { userSchema } from "../validations";
import { z } from 'zod';
import { roleEnum } from "../validations/user-validation";

export type userTypes = z.infer< typeof userSchema>
export type RoleTypes = z.infer<typeof roleEnum>

export interface User
{
  email: string;
  role: RoleTypes
}