import { Router } from "express";
import { installationHandler, installationStatusHandler } from "./installation.controller";

const installationRouter = Router();

installationRouter.post("/process", installationHandler);
installationRouter.get("/status", installationStatusHandler);

export default installationRouter;
