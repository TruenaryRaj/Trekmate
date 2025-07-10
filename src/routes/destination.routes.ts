import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { destinationController } from '../controllers/destination.controller';

const router = Router();

router.post('/add', authenticateToken, authorize(['admin']), destinationController.addDestination )

export default router;
