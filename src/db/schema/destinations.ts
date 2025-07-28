import { relations } from "drizzle-orm";
import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { location } from "./locations.schema";
import { timestamps } from "./timestamp.columns";

export const destination = mysqlTable('destination', {
    id: int().primaryKey().autoincrement(),
    name: varchar({ length: 50}),
    description: varchar({ length: 255}),
    ...timestamps
})

export const destinationRelations = relations(destination,({ many }) => ({
    locations: many(location)
}) )