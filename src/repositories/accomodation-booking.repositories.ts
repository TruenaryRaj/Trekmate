import { desc, eq } from 'drizzle-orm';
import { db } from '../db/db';
import { accomodationBooking } from '../db/schema';
import { AccomodationBooking, StatusEnum } from '../types/booking.types';
import { PaginationInput } from '../types';
import { userRepositories } from './user.repositories';
import { sendEmail } from '../utils';

export const accomodationBookingRepositories = {
    async createBooking(input: AccomodationBooking) {
        const { userId, accomodationId, endingDate, startingDate} = input;
        const [result] = await db.insert(accomodationBooking).values({
            userId,
            accomodationId,
            startingDate,
            endingDate
        });
       return result.insertId;
    },
    async editBooking(input: AccomodationBooking) {
        const { userId, startingDate, endingDate} = input;
        const [result] = await db.update(accomodationBooking).set({
        startingDate,
        endingDate
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
            .orderBy(accomodationBooking.createdAt, sortBy === 'asc' ? (accomodationBooking.createdAt) : (desc(accomodationBooking.createdAt)));
    },

    getBookingsByAccomodationId: async (accomodationId: number, input: PaginationInput) => {
        const { page = 1, limit = 5, sortBy = 'asc' } = input;
        const offset = (page - 1) * limit;      
        return await db.select().from(accomodationBooking)
            .where(eq(accomodationBooking.accomodationId, accomodationId))
            .limit(limit)
            .offset(offset)
            .orderBy(accomodationBooking.createdAt, sortBy === 'asc' ? (accomodationBooking.createdAt) : (desc(accomodationBooking.createdAt)));
    },

    getAllBookings: async (input: PaginationInput) => {
        const { page = 1, limit = 5, sortBy = 'asc' } = input;
        const offset = (page - 1) * limit;
        return await db.select().from(accomodationBooking)
            .limit(limit)
            .offset(offset)
            .orderBy(accomodationBooking.createdAt, sortBy === 'asc' ? (accomodationBooking.createdAt) : (desc(accomodationBooking.createdAt)));
    },

    getBooking: async (bookingId: number) => {
        try{ 
            return await db.select().from(accomodationBooking)
                .where(eq(accomodationBooking.id, bookingId));
        } catch {
            throw new Error("Error in fetching booking details");
        }
    },

    bookingConformation: async (bookingId: number, status: StatusEnum, userId: number ) => {
        try{
            const bookedAccomodation =  await accomodationBookingRepositories.getBooking(bookingId);
            await db.update(accomodationBooking).set({
                status: status
            }).where(eq(accomodationBooking.id, bookingId));

            const userInfo = await userRepositories.me(userId);
                    
            sendEmail({
                receiver: userInfo[0].email!,
                topic: "BOOKING_CONFIRMATION",
                subject: "Booking confirmation",
                name: userInfo[0].name!,
                bookingDetails: {
                    startDate: bookedAccomodation[0].startingDate,
                    endDate: bookedAccomodation[0].endingDate,
                }
            })
        } catch {
            throw new Error("Error in booking conformation");
        }
    }
}