import z from "zod";
import { paginationInput, SortOrder } from "../validations";

export type SortOrder = z.infer<typeof SortOrder>;
export type PaginationInput = z.infer<typeof paginationInput>;