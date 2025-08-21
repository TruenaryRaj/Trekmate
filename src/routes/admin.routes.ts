import { Router } from "express";
import destinationRoutes from './destination.routes';
import accomodationRouter from './accomodation.routes';
import transportationRouter from './transportation.routes';
import accomodationBooking from './accomodation-booking.routes';

const router = Router();

router.use('/destination', destinationRoutes);
router.use('/accomodation', accomodationRouter);
router.use('/transportation', transportationRouter)
router.use('/booking', accomodationBooking);

export default router;