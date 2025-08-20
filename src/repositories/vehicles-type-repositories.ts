import { db } from "../db/db";
import { VehiclesType } from "../types";
import { vehicleType } from "../db/schema";

export const vehiclesTypeRepositories = {
    async addVehiclesType(input: VehiclesType) {
        const{ name, capacity } = input;
        console.log("Adding vehicles type:", input);
        const [result] = await db.insert(vehicleType).values({
            name,
            capacity
        });

        return result.insertId;
    }
}