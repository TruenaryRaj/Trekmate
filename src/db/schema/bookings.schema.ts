import { int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { timestamps } from "./timestamp.columns";
import { user } from './user.schema'
import { relations } from "drizzle-orm";

export const booking = mysqlTable('booking', {
    id: int().primaryKey().autoincrement(),
    userId: int().references( () => user.id).notNull(),
    serviceType: mysqlEnum(['accomodation', 'transportation']).notNull(),
    serviceId: int().notNull(),
    date: varchar({ length: 50}),
    status: mysqlEnum(['pending', 'conformed', 'cancelled']).default('pending'),
    ...timestamps
})

export const bookingRelation = relations(booking, ({one}) => ({
    user: one(user, {
        references: [user.id],
        fields: [booking.userId]
    }),
    })
)