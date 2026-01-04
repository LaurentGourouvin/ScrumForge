import { describe, it, expect, beforeAll, afterAll, beforeEach, expectTypeOf } from "vitest";
import request from "supertest";
import { setupTestDatabase, cleanDatabase, closeTestDatabase, getTestPrisma } from "./helpers/db";
import { app } from "../../src/index";
import { loginAsAdmin } from "./helpers/login";

describe("Teams API Integration Tests", () => {
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

  describe("POST /api/teams", () => {
    it("should create a new team", async () => {
      const prisma = getTestPrisma();
      const adminToken = await loginAsAdmin(app, prisma);

      const newTeamData = {
        name: "Development Team",
        description: "Handles all development tasks",
      };

      const response = await request(app).post("/api/teams").set("Cookie", adminToken).send(newTeamData);

      expect(response.status).toBe(201);
      expect(response.body.team).toBeDefined();
      expect(response.body.team.name).toBe(newTeamData.name);
      expect(response.body.team.description).toBe(newTeamData.description);
    });
  });

  describe("GET /api/teams/:id", () => {
    it("should retrieve a team by ID", async () => {
      const prisma = getTestPrisma();
      const adminToken = await loginAsAdmin(app, prisma);

      const team = await prisma.team.create({
        data: {
          name: "QA Team",
          description: "Handles all quality assurance tasks",
        },
      });

      const response = await request(app).get(`/api/teams/${team.id}`).set("Cookie", adminToken);

      expect(response.status).toBe(200);
      expect(response.body.team).toBeDefined();
      expect(response.body.team.id).toBe(team.id);
      expect(response.body.team.name).toBe(team.name);
    });
  });

  describe("GET /api/teams", () => {
    it("should retrieve all teams", async () => {
      const prisma = getTestPrisma();
      const adminToken = await loginAsAdmin(app, prisma);

      await prisma.team.create({
        data: {
          name: "QA Team",
          description: "Handles all quality assurance tasks",
        },
      });
      await prisma.team.create({
        data: {
          name: "Development Team",
          description: "Handles all development tasks",
        },
      });

      const response = await request(app).get(`/api/teams`).set("Cookie", adminToken);
      expect(response.status).toBe(200);
      expect(response.body.teams).toBeDefined();
      expect(response.body.count).toBe(2);
    });
  });

  describe("DELETE /api/teams/:id", () => {
    it("should delete a team by ID", async () => {
      const prisma = getTestPrisma();
      const adminToken = await loginAsAdmin(app, prisma);

      const team = await prisma.team.create({
        data: {
          name: "QA Team",
          description: "Handles all quality assurance tasks",
        },
      });

      const response = await request(app).delete(`/api/teams/${team.id}`).set("Cookie", adminToken);
      expect(response.status).toBe(200);
    });
  });

  describe("PATCH /api/teams/:id", () => {
    it("should update a team by ID", async () => {
      const prisma = getTestPrisma();
      const adminToken = await loginAsAdmin(app, prisma);

      const team = await prisma.team.create({
        data: {
          name: "QA Team",
          description: "Handles all quality assurance tasks",
        },
      });

      const updateTeam = await request(app)
        .patch(`/api/teams/${team.id}`)
        .set("Cookie", adminToken)
        .send({ name: "Updated QA Team", description: "Updated description" });

      expect(updateTeam.status).toBe(200);
      expect(updateTeam.body).toBeDefined();
      expect(updateTeam.body.name).toBe("Updated QA Team");
      expect(updateTeam.body.description).toBe("Updated description");
    });
  });
});
