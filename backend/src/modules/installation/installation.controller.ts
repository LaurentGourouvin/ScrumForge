import { Request, Response, NextFunction } from "express";
import { installationInputSchema } from "./installation.schema";
import * as installationService from "./installation.service";
import { InstallationInput } from "./installation.type";

export async function installationHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const input: InstallationInput = installationInputSchema.parse(req.body);
    await installationService.runInitialInstallation(input);

    return res.status(201).json({
      instanceName: input.instanceName ?? "ScrumForge",
      adminEmail: input.adminEmail,
      isInstalled: true,
    });
  } catch (error) {
    next(error);
  }
}

export async function installationStatusHandler(req: Request, res: Response, next: NextFunction) {
  try {
    const status = await installationService.getInstallationStatus();

    return res.status(200).json(status);
  } catch (error) {
    next(error);
  }
}
