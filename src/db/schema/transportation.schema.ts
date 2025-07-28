import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { timestamps } from "./timestamp.columns";

export const transportation = mysqlTable('transportation', {
    id: int().primaryKey().autoincrement(),
    numberPlate: varchar({ length: 20 }).notNull().unique(),
    phone: varchar({ length: 10}),
    ownerName: varchar({ length: 50}),  
    ...timestamps
})
