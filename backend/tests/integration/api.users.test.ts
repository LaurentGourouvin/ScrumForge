import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import { setupTestDatabase, cleanDatabase, closeTestDatabase, getTestPrisma } from "./helpers/db";
import { app } from "../../src/index";
import { loginAsAdmin } from "./helpers/login";

describe("User API Integration Tests", () => {
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
  describe("GET /api/users", () => {
    it("should return users with valid cookie", async () => {
      const prisma = getTestPrisma();

      const cookies = await loginAsAdmin(app, prisma);
      const response = await request(app).get("/api/users").set("Cookie", cookies);

      expect(response.status).toBe(200);
      expect(response.body.users).toBeDefined();
    });

    it("should reject request without cookie", async () => {
      const response = await request(app).get("/api/users");
      expect(response.status).toBe(401);
    });
  });
});
