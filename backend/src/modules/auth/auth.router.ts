import { Router } from "express";
import * as AuthController from "./auth.controller";
import { authMiddleware } from "../../middlewares/auth";
import { requireRole } from "../../middlewares/roles";
import { validateBody } from "../../middlewares/validation";
import * as AuthSchema from "./auth.validation";

const router = Router();

router.post("/login", validateBody(AuthSchema.login), AuthController.login);
router.post("/logout", AuthController.logout);
router.get(
  "/me",
  authMiddleware,
  requireRole("ADMIN", "ORGANIZATION_MANAGER", "PRODUCT_OWNER", "SCRUM_MASTER", "DEVELOPER"),
  AuthController.getMe
);

export default router;
