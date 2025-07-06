import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";


export const admin = mysqlTable('admin', {
    id: int().primaryKey().autoincrement(),
    email: varchar({ length: 255}).unique(),
    password: varchar({ length: 255})
});