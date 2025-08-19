import z from "zod";
import { accomodationSchema } from "../validations";

export type AccomodationInput = z.infer<typeof accomodationSchema>