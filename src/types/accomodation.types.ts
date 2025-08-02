import z from "zod";
import { accomodationSchema } from "../validations/accomodation-validation";

export type AccomodationInput = z.infer<typeof accomodationSchema>