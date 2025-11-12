import { and, desc, eq } from 'drizzle-orm';
import { db } from '../db/db';
import { accomodationBooking, user } from '../db/schema';
import { AccomodationBooking, StatusEnum } from '../types/booking.types';
import { PaginationInput } from '../types';
import { userRepositories } from './user.repositories';
import { sendEmail } from '../utils';

export const accomodationBookingRepositories = {
    async createBooking(input: AccomodationBooking) {
        const { userId, accomodationId, endingDate, startingDate} = input;
        try {
            const [result] = await db.insert(accomodationBooking).values({
                userId,
                accomodationId,
                startingDate: new Date(startingDate),
                endingDate: new Date(endingDate),
            });
            return result.insertId;
        } catch(error){
            console.log(error);
            throw new Error("database Error in creating booking");
        }
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
        try {
            return await db.select().from(accomodationBooking)
            .leftJoin(user, eq(accomodationBooking.userId, user.id))
            .limit(limit)
            .offset(offset)
            .orderBy(accomodationBooking.createdAt, sortBy === 'asc' ? (accomodationBooking.createdAt) : (desc(accomodationBooking.createdAt)));
        } catch {
            throw new Error("Error in fetching all bookings");
        }
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
    },

    async cancelBooking(id: number) {
        try {
            const bookingDetails = await accomodationBookingRepositories.getBooking(id);
            if(bookingDetails[0].status == 'conformed') {
                throw new Error("Cannot cancel a conformed booking, contact via mail to customer support");
            }
            await db.delete(accomodationBooking).where(eq(accomodationBooking.id, id));

        } catch (error) {
            throw error;
        }
    }
}