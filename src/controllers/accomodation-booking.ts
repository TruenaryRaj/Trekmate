import { Request, Response } from 'express';
import { accomodationBookingRepositories } from '../repositories';

export const accomodationBookingController = {
    async createBooking(req: Request, res: Response) {
        console.log(req.body);
        const { accomodationId, date } = req.body;    
        const userId = req.user?.id;
        if (!userId || !accomodationId || !date) {
            throw new Error('Missing required fields');
        }

        try {
            const bookingId = await accomodationBookingRepositories.createBooking({
                userId,
                accomodationId,
                date
            });
            res.status(201).json({ message: 'Booking created successfully', bookingId });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create booking' });
        }
    },

    async getBookings(req: Request, res: Response) {
        const userId = req.user?.id;
        if (!userId) {
           throw new Error('User ID is required');
        }
        const { page, limit, sortBy } = req.body;

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
        const { page, limit, sortBy } = req.body;

        try {
            const bookings = await accomodationBookingRepositories.getAllBookings({ page, limit, sortBy });
            res.json(bookings);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve all bookings' });
        }
    }
}

