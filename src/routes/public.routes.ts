import { Router } from "express";
import { destinationController } from '../controllers/destination.controller';
import { accomodationController } from "../controllers/accomodation.controller";
import { transportationController } from "../controllers/transportation.controller";

const router = Router();

router.get(
  "/destinations",
  destinationController.getAllDestinations
);
router.get(
  "/destination/:id",
  destinationController.getDestinationById
);


router.get(
  "/accomodations",
  accomodationController.getAccomodations
);

router.get(
    "/accomodation/:id",
    accomodationController.getAccomodationById
);

router.get(
    "/transportations",
    transportationController.getTransportations
);

router.get(
    "/transportation/:id",
    transportationController.getTranspotrationById
);
export default router;
