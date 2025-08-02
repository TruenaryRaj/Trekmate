import { z } from 'zod';
import { destinationSchema } from "../validations";

export type DestinationInput = z.infer<typeof destinationSchema>