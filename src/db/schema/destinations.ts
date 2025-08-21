import { relations } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { timestamps } from "./timestamp.columns";
import { transportation } from "./transportation.schema";
import { accomodation } from "./accomodations.schema";

export const destination = mysqlTable('destination', {
    id: int().primaryKey().autoincrement(),
    name: varchar({ length: 50}).notNull(),
    shortDescription: varchar({ length: 255}),
    description: varchar({ length: 255}).notNull(),
    highestElivation: int().notNull(),
    region: varchar({ length: 50}).notNull(),
    ...timestamps
})

export const destinationRelations = relations(destination,({ many }) => ({
    transportations: many(transportation),
    accomodations: many(accomodation)
}) )