"use client";
import { ActionMember, Team } from "@/types/team.type";
import MemberDisplaySearchBar from "./memberDisplaySearchBar";
import { getAllUsers } from "@/app/lib/api/users.api";
import { useEffect, useState } from "react";
import { User } from "@/types/user.type";

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
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();
        setUsers(data.users);
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
