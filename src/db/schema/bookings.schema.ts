import { int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { timestamps } from "./timestamp.columns";
import { user } from './user.schema'
import { relations } from "drizzle-orm";
import { accomodation } from "./accomodations.schema";
import { transportation } from './transportation.schema'

export const accomodationBooking = mysqlTable('accomodation_booking', {
    id: int().primaryKey().autoincrement(),
    userId: int().references( () => user.id).notNull(),
    accomodationId: int().references( ()=> accomodation.id).notNull(),
    date: varchar({ length: 50}),
    status: mysqlEnum(['pending', 'conformed', 'cancelled', 'completed']).default('pending'),
    ...timestamps
})


export const transportationBooking = mysqlTable('transportation_booking', {
    id: int().primaryKey().autoincrement(),
    userId: int().references( () => user.id).notNull(),
    transportationId: int().references( ()=> transportation.id).notNull(),
    date: varchar({ length: 50}),
    status: mysqlEnum(['pending', 'conformed', 'cancelled', 'completed']).default('pending'),
    ...timestamps
})


export const accomodationBookingRelation = relations(accomodationBooking, ({one}) => ({
    transportation: one(accomodation,{
        fields: [accomodationBooking.accomodationId],
        references: [accomodation.id]
    })
})
)

export const transportationBookingRelation = relations(transportationBooking, ({one}) => ({
    transportation: one(transportation,{
        fields: [transportationBooking.transportationId],
        references: [transportation.id]
    })
})
)