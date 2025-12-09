import { Router } from "express";
import * as AuthController from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth";

const router = Router();

router.post("/login", AuthController.loginController);
router.post("/logout", AuthController.logoutController);
router.get("/me", authMiddleware, AuthController.getMeController);

export default router;
