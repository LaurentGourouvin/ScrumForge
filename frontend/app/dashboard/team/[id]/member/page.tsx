"use client";
import ProtectedRoute from "@/app/component/auth/ProtectedRoute";
import DefaultLayout from "@/app/component/layout/DefaultLayout";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { ActionMember, GetTeamMembersResult, Team } from "@/types/team.type";
import { getTeamById, getTeamMember } from "@/app/lib/api/teams.api";
import { useParams } from "next/navigation";
import { UserRoundPlus, UserRoundMinus } from "lucide-react";
import MemberSearch from "@/app/component/member/memberSearch";

export default function TeamManagePage() {
  const { user, logout } = useAuth();
  const [team, setTeam] = useState<Team>();
  const [members, setMembers] = useState<GetTeamMembersResult>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [action, setAction] = useState<ActionMember>("ADD");
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
        const members = await getTeamMember(id);
        setTeam(team);
        setMembers(members);
      } catch (err: any) {
        console.error("Failed to load team", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadTeam();
  }, [params?.id]);

  const addMemberProcess = () => {
    setIsOpenModal(true);
    setAction("ADD");
  };

  const removeMemberProcess = () => {
    setIsOpenModal(true);
    setAction("REMOVE");
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const refreshMembers = async () => {
    try {
      const updatedMembers = await getTeamMember(params.id as string);
      setMembers(updatedMembers);
    } catch (err) {
      console.error("Failed to refresh members", err);
    }
  };

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
            onClick={addMemberProcess}
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
            onClick={removeMemberProcess}
          >
            <UserRoundMinus size={20} />
            Remove member
          </button>
        </div>
        <div className="bg-slate-sf border border-[#2A2F36] rounded-lg p-6 text-steel-sf">
          <h2 className="text-xl text-gray-300">{team?.name}</h2>
          <h3 className="p-2 text-gray-200">{team?.description}</h3>
          <hr className="border-b border-[#2A2F36] my-2" />

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-300">Product Owner</h3>
              <div className="flex flex-wrap gap-2">
                {members?.members
                  .filter((m) => m.role === "PRODUCT_OWNER")
                  .map((m) => (
                    <span
                      key={m.id}
                      className="px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-medium shadow-sm hover:bg-emerald-600 transition-colors"
                    >
                      {m.user.name || m.user.email}
                    </span>
                  ))}
                {members?.members.filter((m) => m.role === "PRODUCT_OWNER").length === 0 && (
                  <span className="text-gray-400 italic">No Product Owner</span>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-300">Scrum Master</h3>
              <div className="flex flex-wrap gap-2">
                {members?.members
                  .filter((m) => m.role === "SCRUM_MASTER")
                  .map((m) => (
                    <span
                      key={m.id}
                      className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium shadow-sm hover:bg-blue-600 transition-colors"
                    >
                      {m.user.name || m.user.email}
                    </span>
                  ))}
                {members?.members.filter((m) => m.role === "SCRUM_MASTER").length === 0 && (
                  <span className="text-gray-400 italic">No Scrum Master</span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-gray-300">Developers</h3>
              <div className="flex flex-wrap gap-2">
                {members?.members
                  .filter((m) => m.role === "DEVELOPER")
                  .map((m) => (
                    <span
                      key={m.id}
                      className="px-4 py-2 bg-purple-500 text-white rounded-full text-sm font-medium shadow-sm hover:bg-purple-600 transition-colors"
                    >
                      {m.user.name || m.user.email}
                    </span>
                  ))}
                {members?.members.filter((m) => m.role === "DEVELOPER").length === 0 && (
                  <span className="text-gray-400 italic">No Developers</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {isOpenModal && (
          <MemberSearch teamId={params.id as string} action={action} onClose={closeModal} onSuccess={refreshMembers} />
        )}
      </DefaultLayout>
    </ProtectedRoute>
  );
}
