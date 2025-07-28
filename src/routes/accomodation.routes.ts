import { Router } from "express";
import { authenticateToken } from '../middleware/auth.middleware'
import { authorize } from '../middleware/authorize.middleware'
import { accomodationController } from "../controllers/accomodation.controller";

const router = Router();

router.post('/add', authenticateToken, authorize(['admin']), accomodationController.addAccomodation)

export default router;