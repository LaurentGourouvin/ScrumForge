import { Role, Team } from "../../../prisma/generated/prisma/client";

export interface TeamsResult {
  teams: Team[];
  count: number;
}

export interface TeamResult {
  team: Team;
}

export interface TeamCreationPayload {
  name: string;
  description?: string;
}

export interface TeamUpdatePayload {
  id: string;
  name?: string;
  description?: string;
}

export interface TeamMemberWithUser {
  id: string;
  teamId: string;
  userId: string;
  role: Role;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
    role: Role;
    isActive: boolean;
  };
}

export interface GetTeamMembersResult {
  members: TeamMemberWithUser[];
  count: number;
}
