import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import { setupTestDatabase, cleanDatabase, closeTestDatabase, getTestPrisma } from "./helpers/db";
import * as Fixture from "./helpers/fixtures";
import { app } from "../../src/index";
import { loginAsAdmin } from "./helpers/login";

describe("User API Integration Tests", () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  beforeEach(async () => {
    const prisma = getTestPrisma();
    await cleanDatabase(prisma);
  });

  describe("POST /api/auth/login", () => {
    it("should login as Admin and set cookie", async () => {
      const prisma = getTestPrisma();
      const adminUser = await Fixture.createAdminUser(prisma);

      const response = await request(app).post("/api/auth/login").send({
        email: adminUser.email,
        password: "TestPassword123!",
      });

      expect(response.status).toBe(200);

      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Login successful");

      const user = response.body.user;
      expect(user).toBeDefined();
      expect(user.email).toBe(adminUser.email);
      expect(user.role).toBe("ADMIN");

      expect(response.headers["set-cookie"]).toBeDefined();
      const headers = response.headers["set-cookie"];
      const cookies = Array.isArray(headers) ? headers : headers ? [headers] : [];
      expect(cookies.some((cookie: string) => cookie.startsWith("token="))).toBe(true);
    });
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
