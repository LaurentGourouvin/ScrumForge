import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { setupTestDatabase, cleanDatabase, closeTestDatabase, getTestPrisma } from "./helpers/db";

describe("Database Helpers", () => {
  beforeAll(async () => {
    await setupTestDatabase();
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  it("should connect to test database", async () => {
    const prisma = getTestPrisma();
    const result = await prisma.$queryRaw`SELECT 1 as value`;

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should clean database without errors", async () => {
    const prisma = getTestPrisma();

    await prisma.user.create({
      data: {
        email: "test@example.com",
        name: "Test User",
        role: "DEVELOPER",
        passwordHash: "hash123",
      },
    });

    let users = await prisma.user.findMany();
    expect(users.length).toBeGreaterThan(0);

    await cleanDatabase(prisma);

    users = await prisma.user.findMany();
    expect(users.length).toBe(0);
  });

  it("should get Prisma instance", () => {
    const prisma = getTestPrisma();
    expect(prisma).toBeDefined();
    expect(typeof prisma.$connect).toBe("function");
  });
});
