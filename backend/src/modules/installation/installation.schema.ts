import { z } from "zod";
import type { InstallationInput } from "./installation.type";

export const installationInputSchema: z.ZodType<InstallationInput> = z.object({
  adminEmail: z.email(),
  adminPassword: z.string().min(8),
  instanceName: z.string().min(1).nullable(),
});

// Si tu veux garder un alias DTO :
export type InstallationInputDto = InstallationInput;
