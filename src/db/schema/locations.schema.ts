import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";
import { destination } from "./destinations";
import { relations } from "drizzle-orm";

export const location = mysqlTable('subLocation', {
    id: int().primaryKey().autoincrement(),
    name: varchar({ length: 50}),
    description: varchar({ length: 255}),
    estimatedDay: int(),
    destinationId: int().references( () => destination.id).notNull() 
})

export const locationRelation = relations( location, ({ one}) => ({
    destination: one(destination, {
        fields: [location.destinationId],
        references: [destination.id]
    })
}))