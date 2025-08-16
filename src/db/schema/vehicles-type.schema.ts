import { mysqlTable, int, varchar } from "drizzle-orm/mysql-core";

export const vehicleType= mysqlTable('vehicle_type', {
    id: int().primaryKey(),
    name: varchar({ length: 50}).notNull(),
    capacity: int().notNull()
})