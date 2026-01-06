"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import { createTeam } from "@/app/lib/api/teams.api";

export default function CreateTeamForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onCancel = () => {
    setName("");
    setDescription("");
    setError(null);
  };

  const handleSubmit = async (e: any) => {
    setIsLoading(true);
    setError(null);
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required.");
      setIsLoading(false);
      return;
    }
    if (!description.trim()) {
      setError("Description is required.");
      setIsLoading(false);
      return;
    }

    try {
      await createTeam(name, description);
      toast.success("Team created successfully!");
      onCancel();
    } catch (err: any) {
      if (err.status === 409) {
        setError("A team with this name already exists.");
      } else {
        setError(err.message || "An unexpected error occurred.");
      }
      toast.error("Failed to create team.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-white">Create New Team</h1>
        <p className="text-sm text-steel-sf mt-1">Add a new team to the system</p>
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
              required
              className="w-full bg-charcoal-sf border border-[#2A2F36] rounded-md px-3 py-2.5 text-sm
                         text-white placeholder:text-steel-sf
                         focus:outline-none focus:ring-2 focus:ring-green-300/40
                         disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
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

          <div className="flex items-center gap-3 pt-2">
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
              {isLoading ? <LoaderCircle className="animate-spin" /> : "Create Team"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
