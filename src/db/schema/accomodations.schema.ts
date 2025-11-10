import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm";
import { timestamps } from './timestamp.columns';
import { destination } from "./destinations";
import { accomodationBooking } from "./bookings.schema";

export const accomodation = mysqlTable('accomodation', {
    id: int().primaryKey().autoincrement(),
    name: varchar({ length: 50}),
    description: varchar({ length: 255}),
    destinationId: int().references( ()=> destination.id),
    price: int().notNull(),
    ...timestamps
})

export const accomodationRelation = relations(accomodation, ({ many, one }) => ({
   accomodationBookings: many(accomodationBooking),
   destination: one(destination, ({
    fields: [accomodation.destinationId],
    references: [destination.id]
   }))
}))