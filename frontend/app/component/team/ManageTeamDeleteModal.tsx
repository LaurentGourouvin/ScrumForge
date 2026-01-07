import { Team } from "@/types/team.type";
import { CircleX } from "lucide-react";

export default function ManageTeamDeleteModal({
  team,
  onShowModal,
  onDelete,
}: {
  team: Team | null;
  onShowModal: (v: boolean) => void;
  onDelete: () => void;
}) {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/80">
      <section className="bg-slate-sf p-4 min-w-fit flex flex-col gap-10 rounded-md border border-[#2A2F36]">
        <div className="flex gap-3 justify-end">
          <CircleX size={24} className="text-steel-sf hover:cursor-pointer" onClick={() => onShowModal(false)} />
        </div>
        <p className="text-steel-sf">Do you want to delete ?</p>
        <p className="text-lg text-red-600">{team?.name}</p>
        <div className="flex justify-around gap-2">
          <button
            className="px-4 py-2 bg-gray-500/20 border border-gray-500/20 text-steel-sf rounded-md text-sm"
            onClick={() => onShowModal(false)}
          >
            No
          </button>
          <button
            className="px-4 py-2 bg-red-500/20 border border-red-500/40 
                           text-red-300 rounded-md hover:bg-red-500/30 text-sm"
            onClick={onDelete}
          >
            Confirm Delete
          </button>
        </div>
      </section>
    </div>
  );
}
