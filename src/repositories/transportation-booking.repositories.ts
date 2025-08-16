import { eq } from 'drizzle-orm';
import { db } from '../db/db';
import { transportationBooking } from '../db/schema';
import { TransportationBooking } from '../types/booking.types';
export const transportationBookingRepositories = {
    async createBooking(input: TransportationBooking) {
        const { userId, transportationId, date} = input;
       const [result] = await db.insert(transportationBooking).values({
        userId,
        transportationId,
        date
       });
       return result.insertId;
    },
    async editBooking(input: TransportationBooking) {
        const { userId, date} = input;
        const [result] = await db.update(transportationBooking).set({
        date
       }).where(eq(transportationBooking.userId, userId));
       return result.insertId;
    }
}