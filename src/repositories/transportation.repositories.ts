import { Transportation } from "../types";
import { db } from "../db/db";
import { image, transportation, transportationBooking } from "../db/schema";
import { vehiclesTypeRepositories } from "./vehicles-type-repositories";
import { imageRepositories } from "./image.repositories";
import { and, eq } from "drizzle-orm";

export const transportationRepositories = {
    async addTransportation( input: Transportation) {

        const { destinationId, price, vehiclesType, grade, urls } = input;

        // Parse vehiclesType if it's a string
        const vehiclesTypeObj = typeof vehiclesType === 'string' ? JSON.parse(vehiclesType) : vehiclesType;

        const vehiclesTypeId = await vehiclesTypeRepositories.addVehiclesType(vehiclesTypeObj);
        try {
            const [result] = await db.insert(transportation).values({
            destinationId,
            price,
            grade,
            vechileTypeId: vehiclesTypeId
        });

        for(const url of urls) {
            await imageRepositories.addImage({
                url,
                relatedId: result.insertId,
                relatedTypes: 'transportation'
            });
        }

        return result.insertId;
        } catch (error) {
            throw new Error('Failed to add transportation');
        }
    },

    async getAllTransportation() {
        const result = await db.select().from(transportation)
        .leftJoin(image, and(eq(transportation.id , image.relatedId), eq(image.relatedTypes, 'transportation')));
        return result;
    },

    async deleteTransportation(id: number) {
        try {
            const bookedEntries =  await db.select().from(transportationBooking).where(eq(transportationBooking.transportationId, id));
            if(bookedEntries.length > 0) {
                throw new Error('Cannot delete transportation with existing bookings');
            }            
            const trasnportationExist = await db.select().from(transportation).where(eq(transportation.id, id)).limit(1);
            if(!trasnportationExist.length) {
                throw new Error('Transportation not found');
            }
            await imageRepositories.deleteImageByRelatedId(id, 'transportation');
            await db.delete(transportation).where(eq(transportation.id, id));
            await vehiclesTypeRepositories.deleteVehiclesType(trasnportationExist[0].vechileTypeId!);
        } catch (error) {
            throw error;
        }
    }
}