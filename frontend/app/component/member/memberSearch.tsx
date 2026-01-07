"use client";
import { ActionMember, Team } from "@/types/team.type";
import MemberDisplaySearchBar from "./memberDisplaySearchBar";
import { getAllUsers } from "@/app/lib/api/users.api";
import { useEffect, useState } from "react";
import { User, UserPublic } from "@/types/user.type";
import { getTeamMember } from "@/app/lib/api/teams.api";

export default function MemberSearch({
  teamId,
  action,
  onClose,
  onSuccess,
}: {
  teamId: string;
  action: ActionMember;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}) {
  const [users, setUsers] = useState<User[] | UserPublic[]>();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        if (action === "ADD") {
          const data = await getAllUsers();
          setUsers(data.users);
        } else {
          const data = await getTeamMember(teamId);
          const user: UserPublic[] = data.members.map((u) => u.user);
          setUsers(user);
        }
      } catch (error: any) {
        console.error("Erreur lors du chargement des users:", error);
      }
    };

    loadUsers();
  }, []);

  return (
    <MemberDisplaySearchBar
      teamId={teamId}
      users={users || []}
      action={action}
      onClose={onClose}
      onSuccess={onSuccess}
    />
  );
}
