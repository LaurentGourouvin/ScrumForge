import { Router } from "express";
import * as TeamsController from "./teams.controller";
import { authMiddleware } from "../../middlewares/auth";
import { validateBody, validateParams } from "../../middlewares/validation";
import * as TeamsValidation from "./teams.validation";
import { requireRole } from "../../middlewares/roles";
const teamsRouter = Router();

// Team Members
teamsRouter.get(
  "/:id/member",
  authMiddleware,
  validateParams(TeamsValidation.getTeamMember),
  TeamsController.getTeamMembers
);
teamsRouter.post(
  "/:id/member",
  authMiddleware,
  validateParams(TeamsValidation.getTeamMember),
  validateBody(TeamsValidation.getTeamMember),
  requireRole("ADMIN", "ORGANIZATION_MANAGER"),
  TeamsController.addTeamMember
);
teamsRouter.delete(
  "/:id/member/:memberId",
  authMiddleware,
  validateParams(TeamsValidation.removeTeamMember),
  requireRole("ADMIN", "ORGANIZATION_MANAGER"),
  TeamsController.removeTeamMember
);

// Teams
teamsRouter.get("/", authMiddleware, TeamsController.getAllTeamController);
teamsRouter.get("/:id", authMiddleware, TeamsController.getTeamByIdController);
teamsRouter.post("/", authMiddleware, validateBody(TeamsValidation.create), TeamsController.createTeamController);
teamsRouter.patch("/:id", authMiddleware, TeamsController.updateTeamController);
teamsRouter.delete("/:id", authMiddleware, TeamsController.deleteTeamController);

export default teamsRouter;
