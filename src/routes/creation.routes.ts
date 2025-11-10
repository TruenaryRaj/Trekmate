import { Router } from "express";
import { userController } from "../controllers/user.controllers";
import upload from "../utils/uploadHelper";
import { authorize } from "../middleware/authorize.middleware";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

router.post('/signup', upload.array("images", 1), userController.signup);
router.post('/verifyEmail', authenticateToken, authorize(['admin', 'user']), userController.verifyEmail);
router.post('/login', userController.login);

export default router;
