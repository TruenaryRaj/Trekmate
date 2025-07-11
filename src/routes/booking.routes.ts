import { Router } from "express";
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { bookingController } from "../controllers/booking.controller";

const router = Router();

router.post('/create', authenticateToken, authorize(['user']), bookingController.createBooking);

export default router;