"use client";
import ProtectedRoute from "@/app/component/auth/ProtectedRoute";
import DefaultLayout from "@/app/component/layout/DefaultLayout";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import toast from "react-hot-toast";
import { Team } from "@/types/team.type";
import { getTeamById } from "@/app/lib/api/teams.api";
import { useParams } from "next/navigation";
import { UserRoundPlus, UserRoundMinus } from "lucide-react";

export default function TeamManagePage() {
  const { user, logout } = useAuth();
  const [team, setTeam] = useState<Team>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const params = useParams();

  useEffect(() => {
    setIsLoading(true);
    const id = params.id as string;

    if (!id) {
      setIsLoading(false);
      return;
    }
    const loadTeam = async () => {
      try {
        const team = await getTeamById(id);
        setTeam(team);
      } catch (err: any) {
        console.error("Failed to load team", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeam();
  }, [params?.id]);

  return (
    <ProtectedRoute>
      <DefaultLayout
        topbarTitle="Dashboard"
        topbarSubtitle="Teams"
        topbarActions={
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500/20 border border-red-500/40 
                           text-red-300 rounded-md hover:bg-red-500/30 text-sm"
          >
            Logout
          </button>
        }
      >
        <h1 className="text-2xl font-semibold text-white p-3">Manage team member</h1>
        <div className="m-5 flex gap-4 justify-center">
          <button
            className="px-4 py-2 text-sm font-medium flex gap-1
               rounded-md
               bg-[#40E66F] text-black
               hover:bg-[#2fd65e]
                hover:cursor-pointer
               transition-colors"
          >
            <UserRoundPlus size={20} />
            Add member
          </button>

          <button
            className="px-4 py-2 text-sm font-medium flex gap-1
               rounded-md
               border border-[#2A2F36]
               bg-transparent text-gray-200
               hover:bg-[#1f2329]
               hover:cursor-pointer
               transition-colors"
          >
            <UserRoundMinus size={20} />
            Remove member
          </button>
        </div>
        <div className="bg-slate-sf border border-[#2A2F36] rounded-lg p-6 text-steel-sf">
          <h2 className="text-xl text-gray-300">{team?.name}</h2>
          <h3 className="p-2 text-gray-200">{team?.description}</h3>
        </div>
      </DefaultLayout>
    </ProtectedRoute>
  );
}
