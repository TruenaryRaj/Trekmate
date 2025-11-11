import { db } from "../db/db";
import { VehiclesType } from "../types";
import { vehicleType } from "../db/schema";
import { eq } from "drizzle-orm";

export const vehiclesTypeRepositories = {
    async addVehiclesType(input: VehiclesType) {
        try {
            const{ name, capacity } = input;
            console.log("Adding vehicles type:", input);
            const [result] = await db.insert(vehicleType).values({
                name,
                capacity
            });

            return result.insertId;
        } catch {
            throw new Error('Failed to add vehicles type');
        }
    },

    async deleteVehiclesType(id: number) {
        try {
            await db.delete(vehicleType).where(eq(vehicleType.id, id));
        } catch {
            throw new Error('Failed to delete vehicles type');
        }
    }
}