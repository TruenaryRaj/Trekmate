import { desc, eq } from 'drizzle-orm';
import { db } from '../db/db';
import { accomodationBooking } from '../db/schema';
import { AccomodationBooking } from '../types/booking.types';
import { PaginationInput } from '../types';
export const accomodationBookingRepositories = {
    async createBooking(input: AccomodationBooking) {
        const { userId, accomodationId, date} = input;
       const [result] = await db.insert(accomodationBooking).values({
        userId,
        accomodationId,
        date
       });
       return result.insertId;
    },
    async editBooking(input: AccomodationBooking) {
        const { userId, date} = input;
        const [result] = await db.update(accomodationBooking).set({
        date
       }).where(eq(accomodationBooking.userId, userId));
       return result.insertId;
    },

    getBookingsByUserId: async (userId: number, input: PaginationInput) => {
        const { page = 1, limit = 5, sortBy = 'asc' } = input;
        const offset = (page - 1) * limit;
        return await db.select().from(accomodationBooking)
            .where(eq(accomodationBooking.userId, userId))
            .limit(limit)
            .offset(offset)
            .orderBy(accomodationBooking.date, sortBy === 'asc' ? (accomodationBooking.createdAt) : (desc(accomodationBooking.createdAt)));
    },

    getBookingsByAccomodationId: async (accomodationId: number, input: PaginationInput) => {
        const { page = 1, limit = 5, sortBy = 'asc' } = input;
        const offset = (page - 1) * limit;      
        return await db.select().from(accomodationBooking)
            .where(eq(accomodationBooking.accomodationId, accomodationId))
            .limit(limit)
            .offset(offset)
            .orderBy(accomodationBooking.date, sortBy === 'asc' ? (accomodationBooking.createdAt) : (desc(accomodationBooking.createdAt)));
    },

    getAllBookings: async (input: PaginationInput) => {
        const { page = 1, limit = 5, sortBy = 'asc' } = input;
        const offset = (page - 1) * limit;
        return await db.select().from(accomodationBooking)
            .limit(limit)
            .offset(offset)
            .orderBy(accomodationBooking.date, sortBy === 'asc' ? (accomodationBooking.createdAt) : (desc(accomodationBooking.createdAt)));
    }
}