import { Router } from "express";
import * as UsersController from "./users.controller";
import { authMiddleware } from "../../middlewares/auth";

const userRouter = Router();

userRouter.get("/", authMiddleware, UsersController.getAllUsersController);
userRouter.get("/:id", authMiddleware, UsersController.getUserByIdController);
userRouter.get("/by-team/:id", authMiddleware, UsersController.getUsersByTeamIdController);
userRouter.post("/", authMiddleware, UsersController.createUserController);
userRouter.patch("/:id", authMiddleware, UsersController.updateUserController);
userRouter.delete("/:id", authMiddleware, UsersController.deleteUserController);

export default userRouter;
