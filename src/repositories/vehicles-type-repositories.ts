import { db } from "../db/db";
import { VehiclesType } from "../types";
import { vehicleType } from "../db/schema";

export const vehiclesTypeRepositories = {
    async addVehiclesType(input: VehiclesType) {
        const{ name, capacity } = input;

        const [result] = await db.insert(vehicleType).values({
            name,
            capacity
        });

        return result.insertId;
    }
}