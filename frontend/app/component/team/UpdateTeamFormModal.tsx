"use client";

import { CircleX, LoaderCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { CreateTeamInput, Team } from "@/types/team.type";

export default function UpdateTeamFormModal({
  team,
  onShowModal,
  onUpdate,
}: {
  team: Team | null;
  onShowModal: (v: boolean) => void;
  onUpdate: (team: CreateTeamInput) => void;
}) {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setIsLoading(true);

    onUpdate({ name, description });

    setIsLoading(false);
  };

  const onCancel = () => {
    setName("");
    setDescription("");
    setError(null);
    onShowModal(false);
  };

  useEffect(() => {
    if (!team) return;

    setName(team.name || "");
    setDescription(team.description || "");
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/80">
      <div className="min-w-xl max-2xl">
        <div className="mb-6">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold text-white">Update Team</h1>
            <CircleX size={24} className="text-steel-sf hover:cursor-pointer" onClick={() => onShowModal(false)} />
          </div>

          <p className="text-sm text-steel-sf mt-1">Update a team to the system</p>
        </div>

        <div className="bg-slate-sf border border-[#2A2F36] rounded-lg p-6">
          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-white">
                Name *
              </label>
              <input
                id="name"
                type="text"
                className="w-full bg-charcoal-sf border border-[#2A2F36] rounded-md px-3 py-2.5 text-sm
                         text-white placeholder:text-steel-sf
                         focus:outline-none focus:ring-2 focus:ring-green-300/40
                         disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-sm font-medium text-white">
                Description *
              </label>
              <input
                id="description"
                type="text"
                required
                className="w-full bg-charcoal-sf border border-[#2A2F36] rounded-md px-3 py-2.5 text-sm
                         text-white placeholder:text-steel-sf
                         focus:outline-none focus:ring-2 focus:ring-green-300/40
                         disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Team description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-md p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="flex justify-center items-center gap-3 pt-2">
              <button
                type="button"
                onClick={onCancel}
                disabled={isLoading}
                className="px-4 py-2 text-sm text-steel-sf hover:text-white
                         border border-[#2A2F36] rounded-md
                         transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="px-4 py-2 text-sm font-medium text-black
                         bg-[#40E66F] hover:bg-[#29C957] rounded-md
                         transition-colors
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? <LoaderCircle className="animate-spin" /> : "Update User"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
