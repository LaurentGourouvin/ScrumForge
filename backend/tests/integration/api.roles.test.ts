import { describe, beforeAll, beforeEach, afterAll, it, expect } from "vitest";
import request from "supertest";
import { setupTestDatabase, cleanDatabase, closeTestDatabase, getTestPrisma } from "./helpers/db";
import { app } from "../../src/index";
import { loginAsAdmin } from "./helpers/login";

describe("Role API Integration Tests", () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  beforeEach(async () => {
    const prisma = getTestPrisma();
    await cleanDatabase(prisma);
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  describe("GET /api/roles", () => {
    it("should return roles with valid cookie", async () => {
      const prisma = getTestPrisma();

      const cookies = await loginAsAdmin(app, prisma);
      const response = await request(app).get("/api/roles").set("Cookie", cookies);

      expect(response.status).toBe(200);
      expect(response.body).toStrictEqual([
        "ADMIN",
        "ORGANIZATION_MANAGER",
        "PRODUCT_OWNER",
        "SCRUM_MASTER",
        "DEVELOPER",
      ]);
    });

    it("should reject request without cookie", async () => {
      const response = await request(app).get("/api/roles");
      expect(response.status).toBe(401);
    });
  });
});
