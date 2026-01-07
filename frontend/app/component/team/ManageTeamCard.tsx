import { Team } from "@/types/team.type";
import { User } from "@/types/user.type";
import { Trash2 } from "lucide-react";
import { UserRoundPen } from "lucide-react";

export default function ManageTeamCard({
  team,
  onShowEditModal,
  onSelect,
  onShowDeleteModal,
}: {
  team: Team;
  onShowEditModal: (v: boolean) => void;
  onSelect: (team: Team) => void;
  onShowDeleteModal: (v: boolean) => void;
}) {
  return (
    <div className="border border-[#2A2F36] rounded-md p-2 bg-slate-sf text-steel-sf w-[300px] wrap-break-word">
      <p className="pb-2">{team?.name}</p>
      <hr className="border-b border-[#2A2F36] my-2" />
      <p className="pb-2">Name : {team?.description}</p>
      <p className="pb-2">
        Created at <span className="text-xs">{new Date(team?.createdAt).toLocaleString()}</span>
      </p>
      <p className="pb-2">
        Last update <span className="text-xs">{new Date(team?.updatedAt).toLocaleString()}</span>
      </p>
      <hr className="border-b border-[#2A2F36] my-2" />
      <div className="flex justify-end gap-3.5">
        <UserRoundPen
          size={20}
          className="text-amber-300 hover:text-amber-200 hover:cursor-pointer"
          onClick={() => {
            onSelect(team);
            onShowEditModal(true);
          }}
        />
        <Trash2
          size={20}
          className="text-red-500 hover:text-red-400 hover:cursor-pointer"
          onClick={() => {
            onSelect(team);
            onShowDeleteModal(true);
          }}
        />
      </div>
    </div>
  );
}
