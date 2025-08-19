import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { timestamps } from "./timestamp.columns";
import { destination } from "./destinations";
import { vehicleType } from "./vehicles-type.schema";
import { relations } from "drizzle-orm";
import { transportationBooking } from "./bookings.schema";

export const transportation = mysqlTable('transportation', {
    id: int().primaryKey().autoincrement(),
    destinationId: int().references( ()=> destination.id).notNull(),
    price: int().notNull(),
    time: varchar({ length: 50 }),
    vechileTypeId: int().references( ()=> vehicleType.id),
    ...timestamps
})

export const transportationRelation = relations(transportation, ({ many, one }) => ({
    transportationBookings: many(transportationBooking),
    destination: one(destination, ({
        fields: [transportation.destinationId],
        references: [destination.id]
    }))
})
)