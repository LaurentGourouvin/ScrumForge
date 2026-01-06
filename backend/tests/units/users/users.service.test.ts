import { describe, it, expect, beforeEach, vi } from "vitest";
import { prismaMock } from "../../prisma/prisma.mock";
import { AppError } from "../../../src/lib/appError";

import {
  getAllUsers,
  getUserById,
  getUsersByTeamId,
  create,
  update,
  deleteUser,
} from "../../../src/modules/users/users.service";

import { hashPassword } from "../../../src/lib/auth.utils";

vi.mock("../../../src/lib/auth.utils", () => ({
  hashPassword: vi.fn(),
}));

const hashPasswordMock = hashPassword as unknown as ReturnType<typeof vi.fn>;

describe("Users Service", () => {
  const baseUser = {
    id: "user-123",
    email: "john.doe@example.com",
    name: "John Doe",
    role: "ADMIN",
    //passwordHash: "hashed-password",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const baseTeamMember = {
    id: "tm-1",
    teamId: "team-1",
    userId: baseUser.id,
    user: baseUser,
  };

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

  // -----------------------------------------------------
  // getAllUsers()
  // -----------------------------------------------------

  it("returns all users with count", async () => {
    prismaMock.user.findMany.mockResolvedValue([baseUser] as any);

    const result = await getAllUsers(undefined, 1);

    expect(prismaMock.user.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      users: [baseUser],
      total: 1,
    });
  });

  // -----------------------------------------------------
  // getUserById()
  // -----------------------------------------------------

  it("throws MISSING_ID_USER when id is empty", async () => {
    await expect(getUserById("")).rejects.toEqual(new AppError("MISSING_ID_USER", 400));
    expect(prismaMock.user.findUnique).not.toHaveBeenCalled();
  });

  it("throws USER_NOT_FOUND when prisma returns null", async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);

    await expect(getUserById("unknown-id")).rejects.toEqual(new AppError("USER_NOT_FOUND", 404));

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: "unknown-id" },
    });
  });

  it("returns the user when it exists", async () => {
    prismaMock.user.findUnique.mockResolvedValue(baseUser as any);

    const result = await getUserById(baseUser.id);

    expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
      where: { id: baseUser.id },
    });

    expect(result).toEqual(baseUser);
  });

  // -----------------------------------------------------
  // getUsersByTeamId()
  // -----------------------------------------------------

  it("throws MISSING_ID_TEAM when team id is empty", async () => {
    await expect(getUsersByTeamId("")).rejects.toEqual(new AppError("MISSING_ID_TEAM", 400));
    expect(prismaMock.teamMember.findMany).not.toHaveBeenCalled();
  });

  it("returns users by team id with count", async () => {
    prismaMock.teamMember.findMany.mockResolvedValue([baseTeamMember] as any);

    const result = await getUsersByTeamId("team-1");

    expect(prismaMock.teamMember.findMany).toHaveBeenCalledWith({
      where: { teamId: "team-1" },
      include: { user: true },
    });

    expect(result).toEqual({
      users: [baseTeamMember],
      count: 1,
    });
  });

  // -----------------------------------------------------
  // create()
  // -----------------------------------------------------

  it("throws MISSING_PASSWORD when password is missing", async () => {
    // @ts-expect-error test runtime case where password is missing
    await expect(
      create({
        email: "test@example.com",
        // password missing
        name: "Test User",
        role: "DEVELOPER" as any,
      })
    ).rejects.toEqual(new AppError("MISSING_PASSWORD", 400));

    expect(hashPasswordMock).not.toHaveBeenCalled();
    expect(prismaMock.user.create).not.toHaveBeenCalled();
  });

  it("creates user successfully with hashed password", async () => {
    hashPasswordMock.mockResolvedValue("hashed-secret");
    prismaMock.user.create.mockResolvedValue({
      ...baseUser,
      email: "new@example.com",
      name: "New User",
      role: "DEVELOPER",
      passwordHash: "hashed-secret",
    } as any);

    const result = await create({
      email: "new@example.com",
      password: "super-secret",
      name: "New User",
      role: "DEVELOPER" as any,
    });

    expect(hashPasswordMock).toHaveBeenCalledWith("super-secret");
    expect(prismaMock.user.create).toHaveBeenCalledWith({
      data: {
        email: "new@example.com",
        passwordHash: "hashed-secret",
        role: "DEVELOPER",
        name: "New User",
      },
    });

    expect(result).toEqual({
      ...baseUser,
      email: "new@example.com",
      name: "New User",
      role: "DEVELOPER",
      passwordHash: "hashed-secret",
    });
  });

  it("throws USER_ALREADY_EXIST when unique constraint fails", async () => {
    hashPasswordMock.mockResolvedValue("hashed-secret");
    prismaMock.user.create.mockRejectedValue({ code: "P2002" });

    await expect(
      create({
        email: "dup@example.com",
        password: "secret",
        name: "Dup User",
        role: "DEVELOPER" as any,
      })
    ).rejects.toEqual(new AppError("USER_ALREADY_EXIST", 409));
  });

  // -----------------------------------------------------
  // update()
  // -----------------------------------------------------

  it("throws USER_ID_MISSING when id is empty", async () => {
    // @ts-expect-error runtime check, id empty + newPassword missing
    await expect(
      update({
        id: "",
      })
    ).rejects.toEqual(new AppError("USER_ID_MISSING", 400));

    expect(prismaMock.user.update).not.toHaveBeenCalled();
  });

  it("throws NO_FIELDS_TO_UPDATE when no fields are provided", async () => {
    // @ts-expect-error runtime case where only id is provided
    await expect(
      update({
        id: "user-123",
      })
    ).rejects.toEqual(new AppError("NO_FIELDS_TO_UPDATE", 400));

    expect(prismaMock.user.update).not.toHaveBeenCalled();
  });

  it("updates user basic fields without changing password", async () => {
    prismaMock.user.update.mockResolvedValue({
      ...baseUser,
      email: "updated@example.com",
      name: "Updated Name",
    } as any);

    const result = await update({
      id: baseUser.id,
      email: "updated@example.com",
      name: "Updated Name",
      role: "ADMIN" as any,
      newPassword: "", // selon ton type, mais ignoré en pratique
    });

    expect(hashPasswordMock).not.toHaveBeenCalled();
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { id: baseUser.id },
      data: {
        email: "updated@example.com",
        name: "Updated Name",
        role: "ADMIN",
      },
    });

    expect(result).toEqual({
      ...baseUser,
      email: "updated@example.com",
      name: "Updated Name",
    });
  });

  it("updates user password when newPassword is provided", async () => {
    hashPasswordMock.mockResolvedValue("new-hash");
    prismaMock.user.update.mockResolvedValue({
      ...baseUser,
      passwordHash: "new-hash",
    } as any);

    const result = await update({
      id: baseUser.id,
      newPassword: "new-secret",
      // autres champs facultatifs
    } as any);

    expect(hashPasswordMock).toHaveBeenCalledWith("new-secret");
    expect(prismaMock.user.update).toHaveBeenCalledWith({
      where: { id: baseUser.id },
      data: {
        passwordHash: "new-hash",
      },
    });

    expect(result).toEqual({
      ...baseUser,
      passwordHash: "new-hash",
    });
  });

  it("throws USER_NOT_FOUND when prisma.update returns P2025", async () => {
    prismaMock.user.update.mockRejectedValue({ code: "P2025" });

    await expect(
      update({
        id: "unknown-id",
        email: "x@example.com",
        newPassword: "secret",
      } as any)
    ).rejects.toEqual(new AppError("USER_NOT_FOUND", 404));
  });

  it("throws USER_EMAIL_ALREADY_USE when prisma.update returns P2002", async () => {
    prismaMock.user.update.mockRejectedValue({ code: "P2002" });

    await expect(
      update({
        id: baseUser.id,
        email: "dup@example.com",
        newPassword: "secret",
      } as any)
    ).rejects.toEqual(new AppError("USER_EMAIL_ALREADY_USE", 409));
  });

  // -----------------------------------------------------
  // deleteUser()
  // -----------------------------------------------------

  it("throws MISSING_USER_ID when id is empty", async () => {
    await expect(deleteUser("")).rejects.toEqual(new AppError("MISSING_USER_ID", 400));
    expect(prismaMock.user.delete).not.toHaveBeenCalled();
  });

  it("returns success=true when user is deleted", async () => {
    prismaMock.user.delete.mockResolvedValue({} as any);

    const result = await deleteUser("user-123");

    expect(prismaMock.user.delete).toHaveBeenCalledWith({
      where: { id: "user-123" },
    });

    expect(result).toEqual({ success: true });
  });

  it("throws USER_NOT_FOUND when delete fails with P2025", async () => {
    prismaMock.user.delete.mockRejectedValue({ code: "P2025" });

    await expect(deleteUser("unknown-id")).rejects.toEqual(new AppError("USER_NOT_FOUND", 404));
  });
});
