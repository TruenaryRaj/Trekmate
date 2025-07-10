import { z } from 'zod';
import { destinationSchema } from "../validations";

export type Destination = z.infer<typeof destinationSchema>