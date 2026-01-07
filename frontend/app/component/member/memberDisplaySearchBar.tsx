"use client";

import { useState } from "react";
import { ActionMember, Team } from "@/types/team.type";
import { X, Search } from "lucide-react";
import { User, UserPublic } from "@/types/user.type";
import { addTeamMember, removeTeamMember } from "@/app/lib/api/teams.api";
import toast from "react-hot-toast";

export default function MemberDisplaySearchBar({
  teamId,
  users,
  action,
  onClose,
  onSuccess,
}: {
  teamId: string;
  users: User[] | UserPublic[];
  action: ActionMember;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const filteredUsers = users.filter((user) => {
    const name = user.name?.toLowerCase() || "";
    const email = user.email.toLowerCase();
    const query = searchQuery.toLowerCase();

    return name.includes(query) || email.includes(query);
  });

  const processMember = async (id: string) => {
    if (!id) return;
    try {
      if (action === "ADD") {
        const resultAddMember = await addTeamMember(teamId, id);
      } else {
        const resultRemoveMember = await removeTeamMember(teamId, id);
      }
      toast.success("Team updated.");
      await onSuccess();
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      onClose();
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "SCRUM_MASTER":
        return "bg-blue-500 text-white";
      case "PRODUCT_OWNER":
        return "bg-emerald-500 text-white";
      case "DEVELOPER":
        return "bg-purple-500 text-white";
      case "ORGANIZATION_MANAGER":
        return "bg-orange-500 text-white";
      case "ADMIN":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-[#1A1D23] border border-[#2A2F36] rounded-lg shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-[#2A2F36]">
          <h2 className="text-2xl font-bold text-gray-200">
            {action === "ADD" ? "Add Team Member" : "Remove Team Member"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 border-b border-[#2A2F36]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#0F1117] border border-[#2A2F36] rounded-lg 
                       text-gray-200 placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-[#40E66F] focus:border-transparent
                       transition-all"
            />
          </div>
          <p className="mt-2 text-sm text-gray-400">{filteredUsers.length} user(s) found</p>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {filteredUsers.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2A2F36]">
                  <th className="text-left py-3 px-4 font-semibold text-gray-300 text-sm uppercase tracking-wider">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300 text-sm uppercase tracking-wider">
                    Email
                  </th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-300 text-sm uppercase tracking-wider">
                    Role
                  </th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-300 text-sm uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-[#2A2F36] hover:bg-[#0F1117] transition-colors">
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-200">{user.name || "—"}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{user.email}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                          user.role
                        )}`}
                      >
                        {user.role.replace("_", " ")}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={async () => {
                          processMember(user.id);
                        }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          action === "ADD"
                            ? "bg-[#40E66F] text-black hover:bg-[#2fd65e]"
                            : "bg-red-500/20 border border-red-500/40 text-red-300 hover:bg-red-500/30"
                        }`}
                      >
                        {action === "ADD" ? "Add" : "Remove"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg font-medium">No users found</p>
              <p className="text-gray-500 text-sm mt-2">Try adjusting your search query</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-[#2A2F36] bg-[#0F1117]">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[#2A2F36] rounded-lg 
                       bg-transparent text-gray-300 hover:bg-[#1f2329] 
                       transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
