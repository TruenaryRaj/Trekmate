import { Router, Request, Response, NextFunction } from "express";
import { authenticateToken } from '../middleware/auth.middleware'
import { authorize } from '../middleware/authorize.middleware'
import { accomodationController } from "../controllers/accomodation.controller";
import upload from '../utils/uploadHelper';
const router = Router();

router.post(
  "/test-upload",
  upload.array("images", 5),
  (req, res) => {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);
    res.json({ body: req.body, files: req.files });
  }
);

router.post(
  "/add",
  authenticateToken,
  authorize(["admin"]), 
  upload.array("images", 5),    
  accomodationController.addAccomodation
);

router.delete('/accomodation/:id', 
    authenticateToken, 
    authorize(['admin']),
    accomodationController.deleteAccomodation
);

export default router;