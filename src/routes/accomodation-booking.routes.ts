import { Router } from "express";
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { accomodationBookingController } from "../controllers/accomodation-booking.controller";

const router = Router();

router.post('/book', authenticateToken, authorize(['user']), accomodationBookingController.createBooking);
router.get('/booking/:id', authenticateToken, authorize(['admin']), accomodationBookingController.getBookingsByAccomodationId);
router.get('/booking/user/:id', authenticateToken, authorize(['admin', 'user']), accomodationBookingController.getBookings);
router.get('/bookings', authenticateToken, authorize(['admin']), accomodationBookingController.getAllBookings);
router.delete('/booking/:id', authenticateToken, authorize(['user']), accomodationBookingController.cancelBooking);
router.put('/conformation', authenticateToken, authorize(['admin']), accomodationBookingController.bookingConformation);

export default router;