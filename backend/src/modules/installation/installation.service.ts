import { AppError } from "../../lib/appError";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import { InstallationInput, InstallationStatus } from "./installation.type";

export async function getInstallationStatus(): Promise<InstallationStatus> {
  const settings = await prisma.appSettings.findUnique({
    where: { id: 1 },
  });

  if (settings?.isInstalled) {
    throw new AppError("INSTANCE_ALREADY_INSTALLED", 409);
  }

  const userCount = await prisma.user.count();

  if (userCount > 0) {
    throw new AppError("USERS_ALREADY_EXIST", 409);
  }

  return {
    isInstalled: settings?.isInstalled ?? false,
    instanceName: settings?.instanceName ?? null,
  };
}

export async function runInitialInstallation(input: InstallationInput): Promise<void> {
  const { adminEmail, adminPassword, instanceName } = input;

  if (!adminEmail || !adminPassword) {
    throw new AppError("MISSING_ADMIN_CREDENTIALS");
  }

  await getInstallationStatus();

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.$transaction(async (transaction) => {
    await transaction.user.create({
      data: {
        email: adminEmail,
        passwordHash: passwordHash,
        role: "ADMIN",
      },
    });

    await transaction.appSettings.upsert({
      where: { id: 1 },
      update: {
        isInstalled: true,
        instanceName: instanceName ?? "ScrumForge",
      },
      create: {
        id: 1,
        isInstalled: true,
        instanceName: instanceName ?? "ScrumForge",
      },
    });
  });
}
