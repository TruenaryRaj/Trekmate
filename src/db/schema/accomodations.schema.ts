import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";
import { location } from "./locations.schema";
import { relations } from "drizzle-orm";
import { timestamps } from './timestamp.columns';

export const accomodation = mysqlTable('accomodation', {
    id: int().primaryKey().autoincrement(),
    name: varchar({ length: 50}),
    ownerName: varchar({ length: 50}),
    phone: varchar({ length: 10}),
    description: varchar({ length: 255}),
    locationId: int().references( () => location.id ),
    ...timestamps
})

export const accomodationRelation = relations(accomodation, ({ one }) => ({
    location: one(location, {
        fields: [accomodation.locationId],
        references: [location.id]
    })
}))