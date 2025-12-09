import { describe, it, expect, beforeEach, vi } from "vitest";
import { prismaMock } from "../prisma/prisma.mock";
import { AppError } from "../../src/lib/appError";

import { login, getCurrentUser } from "../../src/modules/auth/auth.service";
import { comparePassword, generateToken } from "../../src/lib/auth.utils";

vi.mock("../../src/lib/auth.utils", () => ({
  comparePassword: vi.fn(),
  generateToken: vi.fn(),
}));

const comparePasswordMock = comparePassword as unknown as ReturnType<typeof vi.fn>;
const generateTokenMock = generateToken as unknown as ReturnType<typeof vi.fn>;

describe("Auth Service", () => {
  beforeEach(() => {
    // Reset all prisma mocks
    Object.values(prismaMock).forEach((section: any) => {
      if (typeof section === "object") {
        Object.values(section).forEach((fn: any) => fn?.mockReset?.());
      }
    });

    // Reset other mocks (auth.utils)
    vi.clearAllMocks();
  });

  const baseUser = {
    id: "user-123",
    email: "john.doe@example.com",
    name: "John Doe",
    role: "ADMIN",
    passwordHash: "hashed-password",
  };

  // -----------------------------------------------------
  // TEST login()
  // -----------------------------------------------------

  it("throws Invalid credentials when user is not found", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    await expect(login("unknown@example.com", "password")).rejects.toEqual(new AppError("Invalid credentials.", 401));

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: "unknown@example.com" },
    });
  });

  it("throws Invalid credentials when password is incorrect", async () => {
    prismaMock.user.findUnique.mockResolvedValue(baseUser as any);
    comparePasswordMock.mockResolvedValue(false);

    await expect(login(baseUser.email, "wrong-password")).rejects.toEqual(new AppError("Invalid credentials.", 401));

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: baseUser.email },
    });
    expect(comparePasswordMock).toHaveBeenCalledWith("wrong-password", baseUser.passwordHash);
  });

  it("returns token and user data when credentials are valid", async () => {
    prismaMock.user.findUnique.mockResolvedValue(baseUser as any);
    comparePasswordMock.mockResolvedValue(true);
    generateTokenMock.mockReturnValue("mocked-jwt-token");

    const result = await login(baseUser.email, "correct-password");

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { email: baseUser.email },
    });
    expect(comparePasswordMock).toHaveBeenCalledWith("correct-password", baseUser.passwordHash);
    expect(generateTokenMock).toHaveBeenCalledWith({
      userId: baseUser.id,
      email: baseUser.email,
      role: baseUser.role,
    });

    expect(result).toEqual({
      token: "mocked-jwt-token",
      user: {
        id: baseUser.id,
        email: baseUser.email,
        name: baseUser.name,
        role: baseUser.role,
      },
    });
  });

  // -----------------------------------------------------
  // TEST getCurrentUser()
  // -----------------------------------------------------

  it("throws User not found when prisma returns null", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    await expect(getCurrentUser("unknown-id")).rejects.toEqual(new AppError("User not found.", 404));

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: "unknown-id" },
    });
  });

  it("returns simplified user when user exists", async () => {
    prismaMock.user.findUnique.mockResolvedValue(baseUser as any);

    const result = await getCurrentUser(baseUser.id);

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: baseUser.id },
    });

    expect(result).toEqual({
      id: baseUser.id,
      email: baseUser.email,
      name: baseUser.name,
      role: baseUser.role,
    });
  });
});
