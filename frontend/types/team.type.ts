export interface Team {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTeamInput {
  name: string;
  description: string;
}

export interface TeamMemberWithUser {
  id: string;
  teamId: string;
  userId: string;
  role: string;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    email: string;
    role: string;
    isActive: boolean;
  };
}

export interface GetTeamMembersResult {
  members: TeamMemberWithUser[];
  count: number;
}

export type ActionMember = "ADD" | "REMOVE";
