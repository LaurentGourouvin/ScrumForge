"use client";
import ProtectedRoute from "@/app/component/auth/ProtectedRoute";
import DefaultLayout from "@/app/component/layout/DefaultLayout";
import ManageUserFormFilter from "@/app/component/user/ManageUserFormFilter";
import { LoaderCircleIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import toast from "react-hot-toast";
import { CreateTeamInput, Team } from "@/types/team.type";
import { deleteTeam, getAllTeams, updateTeam } from "@/app/lib/api/teams.api";
import ManageTeamCard from "@/app/component/team/ManageTeamCard";
import ManageTeamDeleteModal from "@/app/component/team/ManageTeamDeleteModal";
import UpdateTeamFormModal from "@/app/component/team/UpdateTeamFormModal";

export default function TeamManagePage() {
  const { user, logout } = useAuth();
  const [teamsList, setTeamsList] = useState<{ teams: Team[] }>({ teams: [] });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleDeleteAction = async () => {
    if (!selectedTeam) {
      throw new Error("TEAM_ID_MISSING");
    }
    try {
      const res = await deleteTeam(selectedTeam?.id);
      toast.success(`Team ${selectedTeam.name} has been deleted.`);
      setTeamsList((prev) => ({
        teams: prev.teams.filter((team) => team.id !== selectedTeam.id),
      }));
    } catch (error: any) {
      toast.error("An error occured.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleUpdateAction = async (team: CreateTeamInput) => {
    if (!selectedTeam) {
      throw new Error("TEAM_ID_MISSING");
    }
    try {
      await updateTeam(selectedTeam.id, { ...team });
      toast.success("Team successfully updated.");

      const teams = await getAllTeams();
      setTeamsList(teams);
    } catch (err: any) {
      toast.error("An error occured.");
    } finally {
      setShowEditModal(false);
    }
  };

  const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const nextPage = () => setCurrentPage((prev) => (prev < totalPage ? prev + 1 : prev));

  useEffect(() => {
    setIsLoading(true);
    const loadUsers = async () => {
      try {
        const teams = await getAllTeams();
        setTeamsList(teams);
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, [currentPage]);

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
        <ManageUserFormFilter prevPage={prevPage} nextPage={nextPage} />
        <div className="flex flex-wrap mt-10 gap-5">
          {isLoading ? (
            <LoaderCircleIcon size={46} className="animate-spin text-white mx-auto" />
          ) : (
            teamsList.teams.map((team) => {
              return (
                <ManageTeamCard
                  key={team.id}
                  team={team}
                  onShowEditModal={setShowEditModal}
                  onSelect={setSelectedTeam}
                  onShowDeleteModal={setShowDeleteModal}
                />
              );
            })
          )}
        </div>

        {/* Delete modal */}
        {showDeleteModal && (
          <ManageTeamDeleteModal onShowModal={setShowDeleteModal} team={selectedTeam} onDelete={handleDeleteAction} />
        )}
        {/* Update modal */}
        {showEditModal && (
          <UpdateTeamFormModal onShowModal={setShowEditModal} team={selectedTeam} onUpdate={handleUpdateAction} />
        )}
      </DefaultLayout>
    </ProtectedRoute>
  );
}
