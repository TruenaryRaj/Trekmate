import { Router } from "express";
import accomodationBookingRouter from './accomodation-booking.routes';
import transportationBookingRouter from './transportation-booking.routes';

const router = Router();

router.use('/transportation', transportationBookingRouter);
router.use('/accomodation', accomodationBookingRouter);

export default router;