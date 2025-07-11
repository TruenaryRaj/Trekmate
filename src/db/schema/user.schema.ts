import { int, mysqlTable, varchar, mysqlEnum } from "drizzle-orm/mysql-core";
import { timestamps } from "./timestamp.columns";

export const user = mysqlTable('user', {
    id: int().primaryKey().autoincrement(),
    name: varchar({ length: 255 }),
    email: varchar({ length: 255}).unique(),
    password: varchar({ length: 255}),
    role: mysqlEnum(['user', 'admin']).default('user'),
    phone: varchar({ length: 10}),
    ...timestamps
});