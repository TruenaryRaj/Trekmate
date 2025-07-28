import { db } from '../db/db';
import { booking } from '../db/schema';
import { Service } from '../types/booking.types';
export const bookingRepositories = {
    async createBooking(userId: number, serviceType: Service, serviceId: number) {
       const [result] = await db.insert(booking).values({
        userId,
        serviceType,
        serviceId
       });
       return result.insertId;
    }
}