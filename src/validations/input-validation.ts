import z from "zod";

export const SortOrder = z.enum(['asc', 'desc']);

export const paginationInput = z.object({
    page: z.number(),
    limit: z.number(),
    sortBy: SortOrder,
});