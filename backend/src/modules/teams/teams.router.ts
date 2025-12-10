import { Router } from "express";
import * as TeamsController from "./teams.controller";
import { authMiddleware } from "../../middlewares/auth";

const teamsRouter = Router();

teamsRouter.get("/", authMiddleware, TeamsController.getAllTeamController);
teamsRouter.get("/:id", authMiddleware, TeamsController.getTeamByIdController);
teamsRouter.post("/", authMiddleware, TeamsController.createTeamController);
teamsRouter.patch("/:id", authMiddleware, TeamsController.updateTeamController);
teamsRouter.delete("/:id", authMiddleware, TeamsController.deleteTeamController);

export default teamsRouter;
