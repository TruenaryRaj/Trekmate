import { Router } from 'express';
import userRoutes from './user.routes';
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import adminRoutes from './admin.routes';
import creationRoutes from './creation.routes';

const router = Router();

router.use('/user', userRoutes); 
router.use('/admin', adminRoutes );
router.use('', creationRoutes)

export default router;
