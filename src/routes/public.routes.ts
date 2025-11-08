import { Router } from "express";
import { destinationController } from '../controllers/destination.controller';
import { accomodationController } from "../controllers/accomodation.controller";
import { transportationController } from "../controllers/transportation.controller";

const router = Router();

router.get(
  "/get",
  destinationController.getAllDestinations
);

router.get(
  "/get",
  accomodationController.getAccomodations
);

router.get(
    "/get",
    transportationController.getTransportations
);
export default router;
