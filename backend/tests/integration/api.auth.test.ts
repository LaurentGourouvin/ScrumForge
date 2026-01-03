import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import { setupTestDatabase, cleanDatabase, closeTestDatabase, getTestPrisma } from "./helpers/db";
import * as Fixture from "./helpers/fixtures";
import { app } from "../../src/index";
import { loginAsAdmin } from "./helpers/login";

describe("AUTH API Integration Tests", () => {
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

  describe("POST /api/auth/logout", () => {
    it("should logout and clear cookie", async () => {
      const prisma = getTestPrisma();
      const cookies = await loginAsAdmin(app, prisma);

      const response = await request(app).post("/api/auth/logout").set("Cookie", cookies);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Logout successful.");

      const clearedCookies = response.headers["set-cookie"];
      expect(clearedCookies).toBeDefined();
      const cleared = Array.isArray(clearedCookies) ? clearedCookies : clearedCookies ? [clearedCookies] : [];
      expect(cleared.some((cookie: string) => cookie.startsWith("token=;"))).toBe(true);
    });
  });

  describe("GET /api/auth/me", () => {
    it("should get current user with valid cookie", async () => {
      const prisma = getTestPrisma();

      const cookies = await loginAsAdmin(app, prisma);
      const response = await request(app).get("/api/auth/me").set("Cookie", cookies);

      expect(response.status).toBe(200);
      expect(response.body.email).toBe("admin@scrumforge.com");
      expect(response.body.role).toBe("ADMIN");
      expect(response.body.name).toBe("Admin User");
      expect(response.body.id).toBeDefined();
    });
  });
});
