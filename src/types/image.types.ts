import z from "zod";
import { imageSchema, relatedEnums } from "../validations";

export type Image = z.infer<typeof imageSchema>;
export type RelatedType = z.infer<typeof relatedEnums>;