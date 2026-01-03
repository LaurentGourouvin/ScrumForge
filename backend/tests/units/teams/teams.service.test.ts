import { describe, it, expect, beforeEach } from "vitest";
import { prismaMock } from "../../prisma/prisma.mock";
import { AppError } from "../../../src/lib/appError";

import { getAllTeams, getTeamById, createTeam, updateTeam, deleteTeam } from "../../../src/modules/teams/teams.service";

describe("Teams Service", () => {
  const baseTeam = {
    id: "team-123",
    name: "Team Alpha",
    description: "Frontend team",
  };

  beforeEach(() => {
    // Reset all prisma mocks
    Object.values(prismaMock).forEach((section: any) => {
      if (typeof section === "object") {
        Object.values(section).forEach((fn: any) => fn?.mockReset?.());
      }
    });
  });

  // -----------------------------------------------------
  // getAllTeams()
  // -----------------------------------------------------

  it("returns all teams with count", async () => {
    prismaMock.team.findMany.mockResolvedValue([baseTeam] as any);

    const result = await getAllTeams();

    expect(prismaMock.team.findMany).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      teams: [baseTeam],
      count: 1,
    });
  });

  // -----------------------------------------------------
  // getTeamById()
  // -----------------------------------------------------

  it("throws MISSING_ID_TEAM_PARAMETER when id is empty", async () => {
    await expect(getTeamById("")).rejects.toEqual(new AppError("MISSING_ID_TEAM_PARAMETER", 400));

    expect(prismaMock.team.findUnique).not.toHaveBeenCalled();
  });

  it("throws TEAM_NOT_FOUND when prisma returns null", async () => {
    prismaMock.team.findUnique.mockResolvedValue(null);

    await expect(getTeamById("unknown-id")).rejects.toEqual(new AppError("TEAM_NOT_FOUND", 404));

    expect(prismaMock.team.findUnique).toHaveBeenCalledWith({
      where: { id: "unknown-id" },
    });
  });

  it("returns the team wrapped in TeamResult when it exists", async () => {
    prismaMock.team.findUnique.mockResolvedValue(baseTeam as any);

    const result = await getTeamById(baseTeam.id);

    expect(prismaMock.team.findUnique).toHaveBeenCalledWith({
      where: { id: baseTeam.id },
    });

    expect(result).toEqual({
      team: baseTeam,
    });
  });

  // -----------------------------------------------------
  // createTeam()
  // -----------------------------------------------------

  it("throws MISSING_TEAM_NAME when name is missing", async () => {
    await expect(
      createTeam({
        name: "",
        description: "desc",
      })
    ).rejects.toEqual(new AppError("MISSING_TEAM_NAME", 400));

    expect(prismaMock.team.create).not.toHaveBeenCalled();
  });

  it("creates team successfully with name and optional description", async () => {
    prismaMock.team.create.mockResolvedValue(baseTeam as any);

    const result = await createTeam({
      name: "Team Alpha",
      description: "Frontend team",
    });

    expect(prismaMock.team.create).toHaveBeenCalledWith({
      data: {
        name: "Team Alpha",
        description: "Frontend team",
      },
    });

    expect(result).toEqual({
      team: baseTeam,
    });
  });

  it("creates team successfully with description omitted (null in DB)", async () => {
    prismaMock.team.create.mockResolvedValue({
      ...baseTeam,
      description: null,
    } as any);

    const result = await createTeam({
      name: "Team Beta",
    });

    expect(prismaMock.team.create).toHaveBeenCalledWith({
      data: {
        name: "Team Beta",
        description: null,
      },
    });

    expect(result).toEqual({
      team: {
        ...baseTeam,
        description: null,
      },
    });
  });

  it("throws TEAM_NAME_ALREADY_EXISTS when unique constraint fails (P2002)", async () => {
    prismaMock.team.create.mockRejectedValue({ code: "P2002" });

    await expect(
      createTeam({
        name: "Existing Team",
        description: "Whatever",
      })
    ).rejects.toEqual(new AppError("TEAM_NAME_ALREADY_EXISTS", 409));
  });

  // -----------------------------------------------------
  // updateTeam()
  // -----------------------------------------------------

  it("throws MISSING_ID_TEAM_PARAMETER when id is missing", async () => {
    await expect(
      updateTeam({
        id: "",
      })
    ).rejects.toEqual(new AppError("MISSING_ID_TEAM_PARAMETER", 400));

    expect(prismaMock.team.update).not.toHaveBeenCalled();
  });

  it("throws NO_FIELDS_TO_UPDATE when neither name nor description provided", async () => {
    await expect(
      updateTeam({
        id: "team-123",
      })
    ).rejects.toEqual(new AppError("NO_FIELDS_TO_UPDATE", 400));

    expect(prismaMock.team.update).not.toHaveBeenCalled();
  });

  it("updates only the description when name is not provided", async () => {
    prismaMock.team.update.mockResolvedValue({
      ...baseTeam,
      description: "Updated description",
    } as any);

    const result = await updateTeam({
      id: baseTeam.id,
      description: "Updated description",
    });

    expect(prismaMock.team.update).toHaveBeenCalledWith({
      where: { id: baseTeam.id },
      data: {
        description: "Updated description",
      },
    });

    expect(result).toEqual({
      ...baseTeam,
      description: "Updated description",
    });
  });

  it("updates both name and description when provided", async () => {
    prismaMock.team.update.mockResolvedValue({
      ...baseTeam,
      name: "Team Beta",
      description: "Backend team",
    } as any);

    const result = await updateTeam({
      id: baseTeam.id,
      name: "Team Beta",
      description: "Backend team",
    });

    expect(prismaMock.team.update).toHaveBeenCalledWith({
      where: { id: baseTeam.id },
      data: {
        name: "Team Beta",
        description: "Backend team",
      },
    });

    expect(result).toEqual({
      ...baseTeam,
      name: "Team Beta",
      description: "Backend team",
    });
  });

  it("throws TEAM_NOT_FOUND when prisma.update fails with P2025", async () => {
    prismaMock.team.update.mockRejectedValue({ code: "P2025" });

    await expect(
      updateTeam({
        id: "unknown-id",
        name: "New Name",
      })
    ).rejects.toEqual(new AppError("TEAM_NOT_FOUND", 404));
  });

  it("throws TEAM_NAME_ALREADY_EXISTS when prisma.update fails with P2002", async () => {
    prismaMock.team.update.mockRejectedValue({ code: "P2002" });

    await expect(
      updateTeam({
        id: baseTeam.id,
        name: "Existing Name",
      })
    ).rejects.toEqual(new AppError("TEAM_NAME_ALREADY_EXISTS", 409));
  });

  // -----------------------------------------------------
  // deleteTeam()
  // -----------------------------------------------------

  it("throws MISSING_ID_TEAM_PARAMETER when id is empty", async () => {
    await expect(deleteTeam("")).rejects.toEqual(new AppError("MISSING_ID_TEAM_PARAMETER", 400));

    expect(prismaMock.team.delete).not.toHaveBeenCalled();
  });

  it("returns success=true when team is deleted", async () => {
    prismaMock.team.delete.mockResolvedValue({} as any);

    const result = await deleteTeam("team-123");

    expect(prismaMock.team.delete).toHaveBeenCalledWith({
      where: { id: "team-123" },
    });

    expect(result).toEqual({ success: true });
  });

  it("throws TEAM_NOT_FOUND when delete fails with P2025", async () => {
    prismaMock.team.delete.mockRejectedValue({ code: "P2025" });

    await expect(deleteTeam("unknown-id")).rejects.toEqual(new AppError("TEAM_NOT_FOUND", 404));
  });
});
