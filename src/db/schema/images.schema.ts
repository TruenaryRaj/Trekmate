import { int, mysqlEnum, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { timestamps } from "./timestamp.columns";

export const image = mysqlTable("image", {
    id: int().primaryKey().autoincrement(),
    relatedId: int().notNull(),
    relatedTypes: mysqlEnum(['accomodation', 'transportation', 'destination','user']).notNull(),
    url: varchar({ length: 255 }).notNull(),
    ...timestamps
});