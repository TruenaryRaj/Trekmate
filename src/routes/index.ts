import { Router } from 'express';
import userRoutes from './user.routes';
import adminRoutes from './admin.routes';
import creationRoutes from './creation.routes';
import publicRoutes from './public.routes';

const router = Router();

router.use('/user', userRoutes); 
router.use('/admin', adminRoutes );
router.use('', creationRoutes);
router.use('', publicRoutes);

export default router;
