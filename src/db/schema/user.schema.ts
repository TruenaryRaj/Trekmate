import { int, mysqlTable, varchar, mysqlEnum, boolean } from "drizzle-orm/mysql-core";
import { timestamps } from "./timestamp.columns";
import { relations } from "drizzle-orm";
import { accomodationBooking, transportationBooking } from "./bookings.schema";

export const user = mysqlTable('user', {
    id: int().primaryKey().autoincrement(),
    name: varchar({ length: 255 }),
    email: varchar({ length: 255}).unique(),
    password: varchar({ length: 255}),
    role: mysqlEnum(['user', 'admin']).default('user'),
    phone: varchar({ length: 10}),
    isValidEmail: boolean().default(false),
    ...timestamps
});

export const userRelations = relations(user, ({many}) => ({
    accomodationBookings: many(accomodationBooking),
    transportationBookings: many(transportationBooking)
}))