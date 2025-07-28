import { int, mysqlEnum, mysqlTable } from "drizzle-orm/mysql-core";
import { timestamps } from "./timestamp.columns";
import { user } from './user.schema'

export const booking = mysqlTable('booking', {
    id: int().primaryKey().autoincrement(),
    userId: int().references( () => user.id).notNull(),
    serviceType: mysqlEnum(['accomodation', 'transportation']).notNull(),
    serviceId: int().notNull(),
    status: mysqlEnum(['pending', 'conformed', 'cancelled']).default('pending'),
    ...timestamps
})