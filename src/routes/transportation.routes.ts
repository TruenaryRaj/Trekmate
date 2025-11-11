import { Router } from "express";
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { transportationController } from "../controllers/transportation.controller";
import upload from "../utils/uploadHelper";

const router = Router();

router.post('/add', 
    authenticateToken, 
    authorize(['admin']), 
    upload.array("images", 5),   
    transportationController.addTransportation 
);

router.delete('/transportation/:id', authenticateToken, authorize(['admin']), transportationController.deleteTransportation);


export default router;