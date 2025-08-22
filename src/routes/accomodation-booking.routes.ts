import { Router } from "express";
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { accomodationBookingController } from "../controllers/accomodation-booking";

const router = Router();

router.post('/accomodation', authenticateToken, authorize(['user']), accomodationBookingController.createBooking);
router.get('/accomodation/:id', authenticateToken, authorize(['admin']), accomodationBookingController.getBookingsByAccomodationId);
router.get('/acc/user/:id', authenticateToken, authorize(['admin', 'user']), accomodationBookingController.getBookings);
router.get('/accomodation', authenticateToken, authorize(['admin']), accomodationBookingController.getAllBookings);


export default router;