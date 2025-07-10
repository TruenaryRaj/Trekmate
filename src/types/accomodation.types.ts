import z from "zod";
import { accomodationSchema } from "../validations/accomodation-validation";

export type Accomodation = z.infer<typeof accomodationSchema>