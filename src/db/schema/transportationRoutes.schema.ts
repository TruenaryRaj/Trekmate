import { int, mysqlTable } from "drizzle-orm/mysql-core";
import { transportation } from "./transportation.schema";
import { location } from "./locations.schema";

export const transportationRoutes = mysqlTable('transportationRoutes', {
    id: int().primaryKey().autoincrement(),
    tansportationId: int().references( () => transportation.id).notNull(),
    locationId: int().references( () => location.id).notNull()
})

