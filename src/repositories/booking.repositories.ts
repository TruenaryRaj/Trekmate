import { eq } from 'drizzle-orm';
import { db } from '../db/db';
import { booking } from '../db/schema';
import { BookingInput } from '../types/booking.types';
export const bookingRepositories = {
    async createBooking(input: BookingInput) {
        const { userId, serviceType, serviceId, date} = input;
       const [result] = await db.insert(booking).values({
        userId,
        serviceType,
        serviceId,
        date
       });
       return result.insertId;
    },
    async editBooking(input: BookingInput) {
        const { userId, serviceType, serviceId, date} = input;
        const [result] = await db.update(booking).set({
        serviceType,
        serviceId,
        date
       }).where(eq(booking.userId, userId));
       return result.insertId;
    }
}