import { vi } from "vitest";

export const prismaMock = {
  appSettings: {
    findUnique: vi.fn(),
    upsert: vi.fn(),
  },
  user: {
    count: vi.fn(),
    create: vi.fn(),
  },
  $transaction: vi.fn(async (callback: any) => {
    return callback(prismaMock);
  }),
};

vi.mock("../../src/lib/prisma", () => ({
  prisma: prismaMock,
}));
