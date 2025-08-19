import { Transportation } from "../types";
import { db } from "../db/db";
import { transportation } from "../db/schema";
import { vehiclesTypeRepositories } from "./vehicles-type-repositories";

export const transportationRepositories = {
    async addTransportation( input: Transportation) {

        const { destinationId, price, time, vehiclesType } = input;
        const vehiclesTypeId = await vehiclesTypeRepositories.addVehiclesType(vehiclesType);
        const [result] = await db.insert(transportation).values({
            destinationId,
            price,
            time,
            vechileTypeId: vehiclesTypeId
        });
        return result.insertId;
    }
}