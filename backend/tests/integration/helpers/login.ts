import { Application } from "express";
import { PrismaClient } from "../../../prisma/generated/prisma/client";
import { createAdminUser } from "./fixtures";
import request from "supertest";

export const loginAsAdmin = async (app: Application, prisma: PrismaClient): Promise<string[]> => {
  const adminUser = await createAdminUser(prisma);
  const response = await request(app).post("/api/auth/login").send({
    email: adminUser.email,
    password: "TestPassword123!",
  });

  return response.headers["set-cookie"];
};
