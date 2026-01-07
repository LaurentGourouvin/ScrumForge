import { TeamsResult, TeamResult, TeamCreationPayload, TeamUpdatePayload, GetTeamMembersResult } from "./teams.type";
import { prisma } from "../../lib/prisma";
import { AppError } from "../../lib/appError";
import { Team, TeamMember } from "../../../prisma/generated/prisma/client";

/**
 * Retrieves all teams from the database.
 *
 * @returns {Promise<TeamsResult>} An object containing the list of teams and the total count
 * @throws {Error} Prisma error if database connection fails
 *
 * @example
 * const result = await getAllTeams();
 */
export async function getAllTeams(): Promise<TeamsResult> {
  const teams = await prisma.team.findMany();

  return {
    teams,
    count: teams.length,
  };
}

/**
 * Retrieves a team by its identifier.
 *
 * @param {string} id - The UUID identifier of the team
 * @returns {Promise<TeamResult>} An object containing the found team
 * @throws {AppError} MISSING_ID_TEAM_PARAMETER (400) if ID is not provided
 * @throws {AppError} TEAM_NOT_FOUND (404) if team does not exist
 *
 * @example
 * const result = await getTeamById("550e8400-e29b-41d4-a716-446655440000");
 */
export async function getTeamById(id: string): Promise<TeamResult> {
  if (!id) {
    throw new AppError("MISSING_ID_TEAM_PARAMETER", 400);
  }

  const team = await prisma.team.findUnique({ where: { id: id } });

  if (!team) {
    throw new AppError("TEAM_NOT_FOUND", 404);
  }

  return {
    team,
  };
}

/**
 * Creates a new team.
 *
 * @param {TeamCreationPayload} team - The team data to create
 * @param {string} team.name - The team name (required, unique)
 * @param {string} [team.description] - The team description (optional)
 * @returns {Promise<TeamResult>} An object containing the created team
 * @throws {AppError} MISSING_TEAM_NAME (400) if name is not provided
 * @throws {AppError} TEAM_NAME_ALREADY_EXISTS (409) if name already exists
 *
 * @example
 * const result = await createTeam({
 *   name: "Team Alpha",
 *   description: "Frontend development team"
 * });
 */
export async function createTeam(team: TeamCreationPayload): Promise<TeamResult> {
  if (!team.name) {
    throw new AppError("MISSING_TEAM_NAME", 400);
  }

  try {
    const create = await prisma.team.create({
      data: {
        name: team.name,
        description: team.description ?? null,
      },
    });

    return {
      team: create,
    };
  } catch (error: any) {
    if (error.code === "P2002") {
      throw new AppError("TEAM_NAME_ALREADY_EXISTS", 409);
    }
    throw error;
  }
}

/**
 * Updates an existing team.
 * Only provided fields will be updated (partial update).
 *
 * @param {TeamUpdatePayload} team - The team data to update
 * @param {string} team.id - The UUID identifier of the team (required)
 * @param {string} [team.name] - The new team name (optional)
 * @param {string} [team.description] - The new description (optional)
 * @returns {Promise<Team>} The updated team
 * @throws {AppError} MISSING_ID_TEAM_PARAMETER (400) if ID is not provided
 * @throws {AppError} TEAM_NOT_FOUND (404) if team does not exist
 * @throws {AppError} TEAM_NAME_ALREADY_EXISTS (409) if new name already exists
 *
 * @example
 * // Update only the description
 * const updated = await updateTeam({
 *   id: "550e8400-e29b-41d4-a716-446655440000",
 *   description: "Updated description"
 * });
 *
 * @example
 * // Update both name and description
 * const updated = await updateTeam({
 *   id: "550e8400-e29b-41d4-a716-446655440000",
 *   name: "Team Beta",
 *   description: "Backend team"
 * });
 */
export async function updateTeam(team: TeamUpdatePayload): Promise<Team> {
  if (!team.id) {
    throw new AppError("MISSING_ID_TEAM_PARAMETER", 400);
  }

  const data: Partial<{ name: string; description: string | null }> = {};

  if (team.name) data.name = team.name;
  if (team.description !== undefined) data.description = team.description;

  if (Object.keys(data).length === 0) {
    throw new AppError("NO_FIELDS_TO_UPDATE", 400);
  }

  try {
    const update = await prisma.team.update({
      where: { id: team.id },
      data,
    });

    return update;
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new AppError("TEAM_NOT_FOUND", 404);
    }
    if (error.code === "P2002") {
      throw new AppError("TEAM_NAME_ALREADY_EXISTS", 409);
    }
    throw error;
  }
}

/**
 * Deletes a team from the database.
 * All associated members (TeamMember) will be automatically deleted (CASCADE).
 *
 * @param {string} id - The UUID identifier of the team to delete
 * @returns {Promise<{ success: boolean }>} An object confirming the deletion
 * @throws {AppError} MISSING_ID_TEAM_PARAMETER (400) if ID is not provided
 * @throws {AppError} TEAM_NOT_FOUND (404) if team does not exist
 *
 * @example
 * const result = await deleteTeam("550e8400-e29b-41d4-a716-446655440000");
 */
export async function deleteTeam(id: string): Promise<{ success: boolean }> {
  if (!id) {
    throw new AppError("MISSING_ID_TEAM_PARAMETER", 400);
  }

  try {
    await prisma.team.delete({ where: { id: id } });

    return {
      success: true,
    };
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new AppError("TEAM_NOT_FOUND", 404);
    }

    throw error;
  }
}

export async function getTeamMembers(id: string): Promise<GetTeamMembersResult> {
  if (!id) {
    throw new AppError("MISSING_ID_TEAM_PARAMETER", 400);
  }

  try {
    const members = await prisma.teamMember.findMany({
      where: { teamId: id, user: { isActive: true } },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            isActive: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { members: members, count: members.length };
  } catch (error: any) {
    if (error.code === "P2025") {
      throw new AppError("TEAM_NOT_FOUND", 404);
    }

    throw error;
  }
}

export async function addTeamMember(teamId: string, memberId: string): Promise<TeamMember> {
  if (!teamId) {
    throw new AppError("MISSING_ID_TEAM_PARAMETER", 400);
  }
  if (!teamId) {
    throw new AppError("MISSING_ID_MEMBER_PARAMETER", 400);
  }

  try {
    const findMember = await prisma.user.findUnique({ where: { id: memberId } });

    if (!findMember) {
      throw new AppError("USER_NOT_FOUND", 404);
    }

    const addMember = await prisma.teamMember.create({
      data: {
        teamId: teamId,
        userId: memberId,
        role: findMember.role,
      },
    });

    return addMember;
  } catch (error: any) {
    if ((error.code = "P2002")) {
      throw new AppError("USER_ALREADY_IN_THIS_TEAM", 400);
    }
    throw error;
  }
}

async function getAllTeamsPaginate(
  limit: number,
  page: number
): Promise<{
  teams: Team[];
  count: number;
  page: number;
  limit: number;
  totalPage: number;
}> {
  const teams = await prisma.team.findMany({
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: "desc" },
  });

  const totalTeams = await prisma.team.count();

  const totalPage = Math.ceil(totalTeams / limit);

  return { teams: teams, count: totalTeams, page: page, limit: limit, totalPage: totalPage };
}
