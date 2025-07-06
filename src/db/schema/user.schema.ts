import { int, mysqlTable, varchar } from "drizzle-orm/mysql-core";


export const user = mysqlTable('user', {
    id: int().primaryKey().autoincrement(),
    name: varchar({ length: 255 }),
    email: varchar({ length: 255}).unique(),
    password: varchar({ length: 255}),
    phone: int()
});