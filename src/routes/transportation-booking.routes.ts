import { Router } from "express";
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { transportationBookingController } from "../controllers/transportation-booking.controller";

const router = Router();

router.post('/booking', authenticateToken, authorize(['user']), transportationBookingController.createBooking);
router.get('/booking/:id', authenticateToken, authorize(['admin']), transportationBookingController.getBookingsByTransportationId);
router.get('/booking/user/:id', authenticateToken, authorize(['admin', 'user']), transportationBookingController.getBookingsByUserId);
router.get('/bookings', authenticateToken, authorize(['admin']), transportationBookingController.getAllBookings);

export default router;