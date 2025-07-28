import { timestamp } from "drizzle-orm/mysql-core";

export const timestamps ={
    createdAt: timestamp({ fsp: 0 }).defaultNow().notNull(),
    updatedAt: timestamp({ fsp: 0}).defaultNow().onUpdateNow()
}