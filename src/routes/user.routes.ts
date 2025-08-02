import { Router } from "express";
import bookingRouter from './booking.routes';

const router = Router();

router.use('/booking', bookingRouter);

export default router;