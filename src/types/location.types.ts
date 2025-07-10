import { locationSchema } from "../validations";
import { z } from 'zod';

export type Location = z.infer< typeof locationSchema>