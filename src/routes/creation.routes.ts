import { Router } from "express";
import { userController } from "../controllers/user.controllers";

const router = Router();

router.post('/create', userController.addUser);
router.post('/login', userController.userLogin);

export default router;
