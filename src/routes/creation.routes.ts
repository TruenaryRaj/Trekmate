import { Router } from "express";
import { userController } from "../controllers/user.controllers";
import upload from "../utils/uploadHelper";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post('/signup', upload.array("images", 1), userController.signup);
router.post('/verifyEmail', authenticateToken, userController.verifyEmail);
router.post('/login', userController.login);

export default router;
