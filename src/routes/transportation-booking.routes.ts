import { Router } from "express";
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { transportationBookingController } from "../controllers/transportation-booking";

const router = Router();

router.post('/transportation', authenticateToken, authorize(['user']), transportationBookingController.createBooking);
router.get('/transportation/:id', authenticateToken, authorize(['admin']), transportationBookingController.getBookingsByTransportationId);
router.get('/trans/user/:id', authenticateToken, authorize(['admin', 'user']), transportationBookingController.getBookingsByUserId);
router.get('/transportation', authenticateToken, authorize(['admin']), transportationBookingController.getAllBookings);

export default router;