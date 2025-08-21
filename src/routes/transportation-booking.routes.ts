import { Router } from "express";
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { transportationBookingController } from "../controllers/transportation-booking";

const router = Router();

router.post('/create', authenticateToken, authorize(['user']), transportationBookingController.createBooking);

export default router;