import { Router } from "express";
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { transportationController } from "../controllers/transportation.controller";

const router = Router();

router.post('/add', authenticateToken, authorize(['admin']), transportationController.addTransportation );

export default router;