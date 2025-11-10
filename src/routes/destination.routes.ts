import { Router } from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorize.middleware';
import { destinationController } from '../controllers/destination.controller';
import upload from '../utils/uploadHelper';

const router = Router();

router.post(
  "/test",
  upload.array("images", 5),
  (req, res) => {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    res.json({ body: req.body, files: req.files });
  }
);

router.post('/add',
    authenticateToken,
    authorize(['admin']),
    upload.array("images", 5),   
    destinationController.addDestination 
);

export default router;
