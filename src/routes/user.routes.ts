import { Router } from "express";
import bookingRouter from './accomodation-booking.routes';

const router = Router();

router.use('/booking', bookingRouter);

export default router;