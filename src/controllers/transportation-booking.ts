import { Request, Response } from 'express';
import { transportationBookingRepositories } from '../repositories';
import { th } from 'zod/locales';

export const transportationBookingController = {
    async createBooking(req: Request, res: Response) {
        const { transportationId, date } = req.body;    
        const userId = req.user?.id;
        if (!userId || !transportationId || !date) {
            throw new Error('Missing required fields');
        }

        try {
            const bookingId = await transportationBookingRepositories.createBooking({
                userId,
                transportationId,
                date
            });
            res.status(201).json({ message: 'Booking created successfully', bookingId });
        } catch (error) {
            res.status(500).json({ error: 'Failed to create booking' });
        }
    },

    async getBookingsByTransportationId(req: Request, res: Response) {
        const transportationId = parseInt(req.params.id);
        const { page, limit, sortBy } = req.body;

        if (!transportationId) {
            throw new Error('Transportation ID is required');
        }

        try {
            const bookings = await transportationBookingRepositories.getBookingsByTransportationId(transportationId, {
                page,
                limit,
                sortBy
            });
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve bookings' });
        }
    },

    async getBookingsByUserId(req: Request, res: Response) {
        const userId = req.user?.id;
        const { page, limit, sortBy } = req.body;

        if (!userId) {
            throw new Error('Transportation ID is required');
        }

        try {
            const bookings = await transportationBookingRepositories.getBookingsByUserId(userId, {
                page,
                limit,
                sortBy
            });
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve bookings' });
        }
    },

    async getAllBookings(req: Request, res: Response) {
        const { page, limit, sortBy } = req.body;

        try {
            const bookings = await transportationBookingRepositories.getAllBookings({
                page,
                limit,
                sortBy
            });
            res.status(200).json(bookings);
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve all bookings' });
        }
    }

}