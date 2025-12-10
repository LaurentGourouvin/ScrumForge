import { vi } from "vitest";

export const prismaMock = {
  appSettings: {
    findUnique: vi.fn(),
    upsert: vi.fn(),
  },
  user: {
    count: vi.fn(),
    create: vi.fn(),
    findUnique: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  team: {
    count: vi.fn(),
    create: vi.fn(),
    findUnique: vi.fn(),
    findMany: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  teamMember: {
    findMany: vi.fn(),
  },
  $transaction: vi.fn(async (callback: any) => {
    return callback(prismaMock);
  }),
};

vi.mock("../../src/lib/prisma", () => ({
  prisma: prismaMock,
}));
