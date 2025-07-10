import { Router } from "express";
import destinationRoutes from './destination.routes';
import locationRouter from './location.routes';
import accomodationRouter from './accomodation.routes';

const router = Router();

router.use('/destination', destinationRoutes);
router.use('/location', locationRouter);
router.use('/accomodation', accomodationRouter);

export default router;