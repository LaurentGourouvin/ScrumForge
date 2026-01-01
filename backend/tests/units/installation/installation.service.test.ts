import { describe, it, expect, beforeEach } from "vitest";
import { prismaMock } from "../../prisma/prisma.mock";
import { AppError } from "../../../src/lib/appError";

import {
  runInitialInstallation,
  assertInstallationNotDone,
} from "../../../src/modules/installation/installation.service";

describe("Installation Service", () => {
  beforeEach(() => {
    // Reset all mock functions before each test
    Object.values(prismaMock).forEach((section: any) => {
      if (typeof section === "object") {
        Object.values(section).forEach((fn: any) => fn?.mockReset?.());
      }
    });
  });

  // -----------------------------------------------------
  // TEST assertInstallationNotDone()
  // -----------------------------------------------------

  it("returns isInstalled=false when no settings and 0 users", async () => {
    prismaMock.appSettings.findUnique.mockResolvedValue(null);
    prismaMock.user.count.mockResolvedValue(0);

    const result = await assertInstallationNotDone();

    expect(result).toEqual({
      isInstalled: false,
      instanceName: null,
    });
  });

  it("throws INSTANCE_ALREADY_INSTALLED when settings.isInstalled = true", async () => {
    prismaMock.appSettings.findUnique.mockResolvedValue({
      isInstalled: true,
    });

    await expect(assertInstallationNotDone()).rejects.toEqual(new AppError("INSTANCE_ALREADY_INSTALLED", 409));
  });

  it("throws USERS_ALREADY_EXIST when userCount > 0", async () => {
    prismaMock.appSettings.findUnique.mockResolvedValue({
      isInstalled: false,
    });
    prismaMock.user.count.mockResolvedValue(1);

    await expect(assertInstallationNotDone()).rejects.toEqual(new AppError("USERS_ALREADY_EXIST", 409));
  });

  // -----------------------------------------------------
  // TEST runInitialInstallation()
  // -----------------------------------------------------

  it("throws MISSING_ADMIN_CREDENTIALS when email/password missing", async () => {
    await expect(
      runInitialInstallation({
        adminEmail: "",
        adminPassword: "",
        instanceName: "ScrumForge",
      })
    ).rejects.toEqual(new AppError("MISSING_ADMIN_CREDENTIALS", 400));
  });

  it("throws INSTANCE_ALREADY_INSTALLED when settings.isInstalled = true", async () => {
    prismaMock.appSettings.findUnique.mockResolvedValue({
      isInstalled: true,
    });

    await expect(
      runInitialInstallation({
        adminEmail: "admin@test.com",
        adminPassword: "xxxxx",
        instanceName: "ScrumForge",
      })
    ).rejects.toEqual(new AppError("INSTANCE_ALREADY_INSTALLED", 409));
  });

  it("throws USERS_ALREADY_EXIST when userCount > 0", async () => {
    prismaMock.appSettings.findUnique.mockResolvedValue({
      isInstalled: false,
    });
    prismaMock.user.count.mockResolvedValue(2);

    await expect(
      runInitialInstallation({
        adminEmail: "admin@test.com",
        adminPassword: "xxxxx",
        instanceName: "ScrumForge",
      })
    ).rejects.toEqual(new AppError("USERS_ALREADY_EXIST", 409));
  });

  it("creates admin user + AppSettings inside a transaction", async () => {
    prismaMock.appSettings.findUnique.mockResolvedValue(null);
    prismaMock.user.count.mockResolvedValue(0);

    await runInitialInstallation({
      adminEmail: "admin@example.com",
      adminPassword: "supersecret",
      instanceName: "ScrumForge Dev",
    });

    // ensure transaction was used
    expect(prismaMock.$transaction).toHaveBeenCalledTimes(1);

    // ensure admin user was inserted
    expect(prismaMock.user.create).toHaveBeenCalledTimes(1);
    expect(prismaMock.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          email: "admin@example.com",
          role: "ADMIN",
        }),
      })
    );

    // ensure AppSettings was updated/created
    expect(prismaMock.appSettings.upsert).toHaveBeenCalledTimes(1);
    expect(prismaMock.appSettings.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: 1 },
        update: expect.any(Object),
        create: expect.any(Object),
      })
    );
  });
});
