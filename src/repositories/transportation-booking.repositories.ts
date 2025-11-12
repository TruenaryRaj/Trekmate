import { and, desc, eq } from 'drizzle-orm';
import { db } from '../db/db';
import { transportationBooking } from '../db/schema';
import { StatusEnum, TransportationBooking } from '../types/booking.types';
import { PaginationInput } from '../types';
import { userRepositories } from './user.repositories';
import { sendEmail } from '../utils';
export const transportationBookingRepositories = {
    async createBooking(input: TransportationBooking) {
       const { userId, transportationId, dispatchDate, returnDate} = input;
       try{
        const [result] = await db.insert(transportationBooking).values({
            userId,
            transportationId,
            dispatchDate: new Date(dispatchDate),
            returnDate: new Date(returnDate)
       });
       return result.insertId;
        } catch (error) {
            console.log(error);
            throw new Error('Failed to create transportation booking'); 
         }
    },

    async editBooking(input: TransportationBooking) {
        const { userId, dispatchDate, returnDate} = input;
        const [result] = await db.update(transportationBooking).set({
        dispatchDate,
        returnDate
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
        .orderBy(transportationBooking.createdAt, sortBy === 'asc' ? (transportationBooking.createdAt) : (desc(transportationBooking.createdAt)));
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
        .orderBy(transportationBooking.createdAt, sortBy === 'asc' ? (transportationBooking.createdAt) : (desc(transportationBooking.createdAt)));
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
        .orderBy(transportationBooking.createdAt, sortBy === 'asc' ? (transportationBooking.createdAt) : (desc(transportationBooking.createdAt)));
        } catch (error) {
            throw new Error('Failed to retrieve all bookings');
        }
    },

    getBooking: async(id: number) => {
        try{
            return await db.select().from(transportationBooking).where(eq(transportationBooking.id, id));
        } catch {
            throw new Error("Error in fetching booking");
        }
    },
    bookingConformation: async (bookingId: number, status: StatusEnum, userId: number ) => {
        try{
            const bookedTransportation = await transportationBookingRepositories.getBooking(bookingId);
            await db.update(transportationBooking).set({
                status: status
            }).where(eq(transportationBooking.id, bookingId));
            const userInfo = await userRepositories.me(userId);
        
            sendEmail({
            receiver: userInfo[0].email!,
            topic: "BOOKING_CONFIRMATION",
                subject: "Booking confirmation",
                name: userInfo[0].name!,
                bookingDetails: {
                    dispatchDate: bookedTransportation[0].dispatchDate
                }
            })
        } catch {
            throw new Error("Error in booking conformation");
        }
    },

    cancelBooking: async (id: number) => {
        try{
            const bookingDetails = await transportationBookingRepositories.getBooking(id);
            if(bookingDetails[0].status == 'conformed') {
                throw new Error("Cannot cancel a conformed booking, contact via mail to customer support");
            }
            await db.delete(transportationBooking)
            .where(eq(transportationBooking.id, id));
        } catch {
            throw new Error("Error in deleting booking");
        }
    }
}