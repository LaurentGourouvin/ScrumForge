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

  describe("POST /api/users", () => {
    it("should create a new user with valid data and cookie", async () => {
      const prisma = getTestPrisma();

      const cookies = await loginAsAdmin(app, prisma);
      const newUser = {
        email: "test@scrumforge.com",
        password: "SecurePass123!",
        role: "DEVELOPER",
        name: "Test User",
      };

      const response = await request(app).post("/api/users").set("Cookie", cookies).send(newUser);

      expect(response.status).toBe(201);
      expect(response.body.email).toBe(newUser.email);
      expect(response.body.role).toBe(newUser.role);
      expect(response.body.name).toBe(newUser.name);
    });

    it("should reject user creation without cookie", async () => {
      const newUser = {
        email: "test@scrumforge.com",
        password: "SecurePass123!",
        role: "DEVELOPER",
        name: "Test User",
      };

      const response = await request(app).post("/api/users").send(newUser);
      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/users/:id", () => {
    it("should return user details with valid cookie", async () => {
      const prisma = getTestPrisma();

      const cookies = await loginAsAdmin(app, prisma);
      const newUser = {
        email: "test@scrumforge.com",
        password: "SecurePass123!",
        role: "DEVELOPER",
        name: "Test User",
      };

      const response = await request(app).post("/api/users").set("Cookie", cookies).send(newUser);
      const { id } = response.body;

      const userResponse = await request(app).get(`/api/users/${id}`).set("Cookie", cookies);
      expect(userResponse.status).toBe(200);
      expect(userResponse.body.email).toBe(newUser.email);
      expect(userResponse.body.role).toBe(newUser.role);
      expect(userResponse.body.name).toBe(newUser.name);
      expect(userResponse.body.id).toBe(id);
    });
  });

  describe("DELETE /api/users/:id", () => {
    it("should delete user with valid cookie", async () => {
      const prisma = getTestPrisma();

      const cookies = await loginAsAdmin(app, prisma);
      const newUser = {
        email: "test@scrumforge.com",
        password: "SecurePass123!",
        role: "DEVELOPER",
        name: "Test User",
      };

      const response = await request(app).post("/api/users").set("Cookie", cookies).send(newUser);
      const { id } = response.body;

      const deleteResponse = await request(app).delete(`/api/users/${id}`).set("Cookie", cookies);
      expect(deleteResponse.status).toBe(200);
      expect(deleteResponse.body.message).toBe("User deleted successfully");
    });

    it("should reject user deletion without cookie", async () => {
      const deleteResponse = await request(app).delete(`/api/users/some-user-id`);
      expect(deleteResponse.status).toBe(401);
    });
  });
});
