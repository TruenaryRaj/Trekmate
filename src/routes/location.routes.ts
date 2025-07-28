import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import { authorize } from "../middleware/authorize.middleware";
import { locationController } from "../controllers/location.controller";

const router = Router();

router.post('/add', authenticateToken, authorize(['admin']), locationController.addLocation );

export default router;
