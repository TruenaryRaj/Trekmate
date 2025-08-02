import { locationSchema } from "../validations";
import { z } from 'zod';

export type LocationInput = z.infer< typeof locationSchema>