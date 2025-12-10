import { Router } from "express";
import * as RoleController from "./roles.controller";
import { authMiddleware } from "../../middlewares/auth";

const rolesRouter = Router();

rolesRouter.get("/", authMiddleware, RoleController.getAllRolesController);

export default rolesRouter;
