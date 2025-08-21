import z from "zod";
import { paginationInput } from "../validations";

export type PaginationInput = z.infer<typeof paginationInput>;