import { Router } from "express";
import * as TeamsController from "./teams.controller";
import { authMiddleware } from "../../middlewares/auth";
import { validateBody } from "../../middlewares/validation";
import * as TeamsValidation from "./teams.validation";
const teamsRouter = Router();

teamsRouter.get("/", authMiddleware, TeamsController.getAllTeamController);
teamsRouter.get("/:id", authMiddleware, TeamsController.getTeamByIdController);
teamsRouter.post("/", authMiddleware, validateBody(TeamsValidation.create), TeamsController.createTeamController);
teamsRouter.patch("/:id", authMiddleware, TeamsController.updateTeamController);
teamsRouter.delete("/:id", authMiddleware, TeamsController.deleteTeamController);

export default teamsRouter;
