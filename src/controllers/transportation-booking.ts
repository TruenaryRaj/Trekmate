import { Request, Response } from 'express';
import { transportationBookingRepositories } from '../repositories';

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
    }
}