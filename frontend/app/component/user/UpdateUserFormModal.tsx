"use client";

import { CircleX, LoaderCircle } from "lucide-react";
import { useState, useEffect } from "react";
import * as RolesService from "@/app/lib/api/roles.api";
import { mapRolesToOptions } from "@/app/utils/roles.utils";
import { UpdateUserInput, User } from "@/types/user.type";
import { isValidPassword } from "@/app/lib/password/PasswordValidator";
import { updateUser } from "@/app/lib/api/users.api";
import toast from "react-hot-toast";
import { on } from "events";

export default function UpdateUserFormModal({
  user,
  onShowModal,
  onUpdate,
}: {
  user: User | null;
  onShowModal: (v: boolean) => void;
  onUpdate: (user: UpdateUserInput) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("DEVELOPER");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roleList, setRoleList] = useState<{ label: string; value: string }[]>([]);

  const handleSubmit = async () => {
    setIsLoading(true);

    if (password && !isValidPassword(password)) {
      setError(
        "Password must be at least 12 characters long and include uppercase, lowercase, and a special character."
      );

      setIsLoading(false);
      return;
    }

    onUpdate({ email, name, newPassword: password, role });

    setIsLoading(false);
  };

  const onCancel = () => {
    setEmail("");
    setPassword("");
    setName("");
    setRole("DEVELOPER");
    setError(null);
    onShowModal(false);
  };

  useEffect(() => {
    const loadRole = async () => {
      try {
        const roles = await RolesService.getRoles();
        setRoleList(mapRolesToOptions(roles));
      } catch (error: any) {
        console.error(error);
      }
    };
    loadRole();
  }, []);

  useEffect(() => {
    if (!user) return;

    setEmail(user.email);
    setName(user.name || "");
    setPassword("");
    setRole(user.role);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-black/80">
      <div className="max-2xl">
        <div className="mb-6">
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold text-white">Update User</h1>
            <CircleX size={24} className="text-steel-sf hover:cursor-pointer" onClick={() => onShowModal(false)} />
          </div>

          <p className="text-sm text-steel-sf mt-1">Update a team member to the system</p>
        </div>

        <div className="bg-slate-sf border border-[#2A2F36] rounded-lg p-6">
          <div className="space-y-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-sm font-medium text-white">
                Email <span className="text-red-400">*</span>
              </label>
              <input
                id="email"
                type="email"
                className="w-full bg-charcoal-sf border border-[#2A2F36] rounded-md px-3 py-2.5 text-sm
                         text-white placeholder:text-steel-sf
                         focus:outline-none focus:ring-2 focus:ring-green-300/40
                         disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-sm font-medium text-white">
                Name
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

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-sm font-medium text-white">
                Password <span className="text-red-400">*</span>
              </label>
              <input
                id="password"
                type="password"
                className="w-full bg-charcoal-sf border border-[#2A2F36] rounded-md px-3 py-2.5 text-sm
                         text-white placeholder:text-steel-sf
                         focus:outline-none focus:ring-2 focus:ring-green-300/40
                         disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Min. 12 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
              <p className="text-xs text-steel-sf">
                Minimum 12 characters, must include uppercase, lowercase, and special character
              </p>
            </div>

            {/* Role */}
            <div className="flex flex-col gap-2">
              <label htmlFor="role" className="text-sm font-medium text-white">
                Role <span className="text-red-400">*</span>
              </label>
              <select
                id="role"
                className="w-full bg-charcoal-sf border border-[#2A2F36] rounded-md px-3 py-2.5 text-sm
                         text-white
                         focus:outline-none focus:ring-2 focus:ring-green-300/40
                         disabled:opacity-50 disabled:cursor-not-allowed"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                disabled={isLoading}
              >
                {roleList.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
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
