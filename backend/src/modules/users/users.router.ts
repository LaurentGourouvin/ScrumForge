import { Router } from "express";
import * as UsersController from "./users.controller";
import { authMiddleware } from "../../middlewares/auth";
import { requireRole } from "../../middlewares/roles";
import { validateBody, validateParams } from "../../middlewares/validation";
import * as UserSchema from "./users.validation";

const userRouter = Router();

userRouter.get("/", authMiddleware, UsersController.getAllUsers);
userRouter.get("/:id", authMiddleware, UsersController.getUserById);
userRouter.get("/by-team/:id", authMiddleware, UsersController.getUsersByTeamId);
userRouter.patch("/me", authMiddleware, UsersController.updateCurrentUser);

/** ============================ */
/**     Admin and manager routes */
/** ============================ */
userRouter.post(
  "/",
  authMiddleware,
  requireRole("ADMIN", "ORGANIZATION_MANAGER"),
  validateBody(UserSchema.create),
  UsersController.createUser
);

userRouter.patch("/:id", authMiddleware, requireRole("ADMIN", "ORGANIZATION_MANAGER"), UsersController.updateUser);
userRouter.delete(
  "/:id",
  authMiddleware,
  requireRole("ADMIN"),
  validateParams(UserSchema.uuidParams),
  UsersController.deleteUser
);

export default userRouter;
