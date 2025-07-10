import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";
import { destination } from "./destinations";
import { relations } from "drizzle-orm";
import { accomodation } from './accomodations.schema';

export const location = mysqlTable('subLocation', {
    id: int().primaryKey().autoincrement(),
    name: varchar({ length: 50}),
    description: varchar({ length: 255}),
    estimatedTime: varchar({ length: 20}),
    destinationId: int().references( () => destination.id).notNull() 
})

export const locationRelation = relations( location, ({ one, many }) => ({
    destination: one(destination, {
        fields: [location.destinationId],
        references: [destination.id]
    }),
    accomodations: many(accomodation),
}))