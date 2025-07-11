import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";
import { destination } from "./destinations";
import { relations } from "drizzle-orm";
import { accomodation } from './accomodations.schema';
import { timestamps } from "./timestamp.columns";

export const location = mysqlTable('location', {
    id: int().primaryKey().autoincrement(),
    name: varchar({ length: 50}),
    description: varchar({ length: 255}),
    estimatedTime: varchar({ length: 20}),
    destinationId: int().references( () => destination.id).notNull(),
    ...timestamps 
})

export const locationRelation = relations( location, ({ one, many }) => ({
    destination: one(destination, {
        fields: [location.destinationId],
        references: [destination.id]
    }),
    accomodations: many(accomodation),
}))