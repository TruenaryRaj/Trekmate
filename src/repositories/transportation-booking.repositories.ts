import { desc, eq } from 'drizzle-orm';
import { db } from '../db/db';
import { transportationBooking } from '../db/schema';
import { TransportationBooking } from '../types/booking.types';
import { PaginationInput } from '../types';
export const transportationBookingRepositories = {
    async createBooking(input: TransportationBooking) {
       const { userId, transportationId, date} = input;
       try{
        const [result] = await db.insert(transportationBooking).values({
        userId,
        transportationId,
        date
       });
    
       return result.insertId;
        } catch (error) {
            throw new Error('Failed to create transportation booking'); 
         }
    },

    async editBooking(input: TransportationBooking) {
        const { userId, date} = input;
        const [result] = await db.update(transportationBooking).set({
        date
       }).where(eq(transportationBooking.userId, userId));
       return result.insertId;
    },

    async getBookingsByTransportationId(transportationId: number, input: PaginationInput) {
        const { page =1 , limit = 5, sortBy } = input;
        const offset = (page - 1) * limit;
        try {
        return await db.select().from(transportationBooking)
        .where(eq(transportationBooking.transportationId, transportationId))
        .limit(limit)
        .offset(offset)
        .orderBy(transportationBooking.date, sortBy === 'asc' ? (transportationBooking.createdAt) : (desc(transportationBooking.createdAt)));
        } catch (error) {
            throw new Error('Failed to retrieve bookings by transportation ID');
        }
    },

    async getBookingsByUserId(userId: number, input: PaginationInput) {
        const { page = 1, limit = 5, sortBy } = input;
        const offset = (page - 1) * limit;
        try {
        return await db.select().from(transportationBooking)
        .where(eq(transportationBooking.userId, userId))
        .limit(limit)
        .offset(offset)
        .orderBy(transportationBooking.date, sortBy === 'asc' ? (transportationBooking.createdAt) : (desc(transportationBooking.createdAt)));
        } catch (error) {
            throw new Error('Failed to retrieve bookings by user ID');
        }
    },

    async getAllBookings(input: PaginationInput) {
        const { page = 1, limit = 5, sortBy } = input;
        const offset = (page - 1) * limit;
        try {
        return await db.select().from(transportationBooking)
        .limit(limit)
        .offset(offset)
        .orderBy(transportationBooking.date, sortBy === 'asc' ? (transportationBooking.createdAt) : (desc(transportationBooking.createdAt)));
        } catch (error) {
            throw new Error('Failed to retrieve all bookings');
        }
    },
}