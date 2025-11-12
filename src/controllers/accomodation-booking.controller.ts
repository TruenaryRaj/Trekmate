import { Request, Response } from 'express';
import { accomodationBookingRepositories } from '../repositories';
import { SortOrder } from '../types/input.types';

export const accomodationBookingController = {
    async createBooking(req: Request, res: Response) {
        const { accomodationId, endingDate, startingDate } = req.body;    
        const userId = req.user?.id;
        if (!userId || !accomodationId || !endingDate || !startingDate) {
            throw new Error('Missing required fields');
        }

        try {
            const bookingId = await accomodationBookingRepositories.createBooking({
                userId,
                accomodationId,
                endingDate,
                startingDate
            });
            res.status(201).json({ message: 'Booking created successfully', bookingId });
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Failed to create booking' });
        }
    },

    async getBookings(req: Request, res: Response) {
        const userId = parseInt(req.params.id);
        if (!userId) {
           throw new Error('User ID is required');
        }
        const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
        const sortBy = req.query.sortBy as SortOrder || 'asc'; 
        
        try {
            const bookings = await accomodationBookingRepositories.getBookingsByUserId(userId, { page, limit, sortBy });
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve bookings' });
        }
    },

    async getBookingsByAccomodationId(req: Request, res: Response) {
        const accomodationId = parseInt(req.params.id);
        if (!accomodationId) {
             throw new Error('Accomodation ID is required');
        }
        const { page, limit, sortBy } = req.body;

        try {
            const bookings = await accomodationBookingRepositories.getBookingsByAccomodationId(accomodationId, { page, limit, sortBy });
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve bookings for the accomodation' });
        }
    },

    async getAllBookings(req: Request, res: Response) {
        const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
        const sortBy = req.query.sortBy as SortOrder || 'asc'; 

        try {
            const bookings = await accomodationBookingRepositories.getAllBookings({ page, limit, sortBy });
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve all bookings' });
        }
    },

    async cancelBooking(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        try {
            await accomodationBookingRepositories.cancelBooking(id);
            res.status(200).json({ message: 'Booking cancelled successfully' });
        } catch(error) {
            res.status(500).json({ error: (error as Error).message });
        }
    },
    
    async bookingConformation(req: Request, res: Response) {
        const { id, status, userId } = req.body;
        try{
            await accomodationBookingRepositories.bookingConformation(id, status, userId);
            res.status(200).json({ message: 'Booking status changed' });
        } catch(error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }   
}

