import { PrismaClient } from "../../../prisma/generated/prisma/client";
import { Role } from "../../../prisma/generated/prisma/client";
import { hashPassword } from "../../../src/lib/auth.utils";

export const createAdminUser = async (prisma: PrismaClient) => {
  const passwordHash = await hashPassword("TestPassword123!");

  return prisma.user.create({
    data: {
      email: "admin@scrumforge.com",
      name: "Admin User",
      passwordHash: passwordHash,
      role: Role.ADMIN,
    },
  });
};

export const createDeveloperUser = async (prisma: PrismaClient) => {
  const passwordHash = await hashPassword("DevPassword123!");

  return prisma.user.create({
    data: {
      email: "developer@scrumforge.com",
      name: "Developer User",
      passwordHash: passwordHash,
      role: Role.DEVELOPER,
    },
  });
};

export const createOrganizationManagerUser = async (prisma: PrismaClient) => {
  const passwordHash = await hashPassword("OrgManagerPassword123!");

  return prisma.user.create({
    data: {
      email: "orgmanager@scrumforge.com",
      name: "Organization Manager User",
      passwordHash: passwordHash,
      role: Role.ORGANIZATION_MANAGER,
    },
  });
};

export const createProductOwnerUser = async (prisma: PrismaClient) => {
  const passwordHash = await hashPassword("ProductOwnerPassword123!");

  return prisma.user.create({
    data: {
      email: "productowner@scrumforge.com",
      name: "Product Owner User",
      passwordHash: passwordHash,
      role: Role.PRODUCT_OWNER,
    },
  });
};

export const createScrumMasterUser = async (prisma: PrismaClient) => {
  const passwordHash = await hashPassword("ScrumMasterPassword123!");

  return prisma.user.create({
    data: {
      email: "scrummaster@scrumforge.com",
      name: "Scrum Master User",
      passwordHash: passwordHash,
      role: Role.SCRUM_MASTER,
    },
  });
};
