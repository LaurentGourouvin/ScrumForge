"use client";
import ProtectedRoute from "@/app/component/auth/ProtectedRoute";
import DefaultLayout from "@/app/component/layout/DefaultLayout";
import ManageUserCard from "@/app/component/user/ManageUserCard";
import ManageUserFormFilter from "@/app/component/user/ManageUserFormFilter";
import { LoaderCircleIcon, CircleX } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { getAllUsers } from "@/app/lib/api/users.api";
import type { UpdateUserInput, User } from "@/types/user.type";
import ManageUserDeleteModal from "@/app/component/user/ManageUserDeleteModal";
import { deleteUser, updateUser } from "@/app/lib/api/users.api";
import toast from "react-hot-toast";
import UpdateUserFormModal from "@/app/component/user/UpdateUserFormModal";

export default function UserManagePage() {
  const { user, logout } = useAuth();
  const [usersList, setUsersList] = useState<{ users: User[] }>({ users: [] });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDeleteAction = async () => {
    if (!selectedUser) {
      throw new Error("USER_ID_MISSING");
    }
    try {
      const res = await deleteUser(selectedUser?.id);
      toast.success(`User ${selectedUser.email} has been deleted.`);
      setUsersList((prev) => ({
        users: prev.users.filter((u) => u.id !== selectedUser.id),
      }));
    } catch (error: any) {
      toast.error("An error occured.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleUpdateAction = async (user: UpdateUserInput) => {
    if (!selectedUser) {
      throw new Error("USER_ID_MISSING");
    }
    try {
      await updateUser(selectedUser.id, { ...user });
      toast.success("User successfully updated.");

      const users = await getAllUsers();
      setUsersList(users);
    } catch (err: any) {
      toast.error("An error occured.");
    } finally {
      setShowEditModal(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const loadUsers = async () => {
      try {
        const users = await getAllUsers(10);
        setUsersList(users);
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    loadUsers();
  }, []);

  return (
    <ProtectedRoute>
      <DefaultLayout
        topbarTitle="Dashboard"
        topbarSubtitle="Users"
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
        <ManageUserFormFilter />
        <div className="flex flex-wrap mt-10 gap-5">
          {isLoading ? (
            <LoaderCircleIcon size={46} className="animate-spin text-white mx-auto" />
          ) : (
            usersList.users.map((u) => {
              return (
                <ManageUserCard
                  key={u.id}
                  user={u}
                  onShowEditModal={setShowEditModal}
                  onSelect={setSelectedUser}
                  onShowDeleteModal={setShowDeleteModal}
                />
              );
            })
          )}
        </div>

        {/* Delete modal */}
        {showDeleteModal && (
          <ManageUserDeleteModal onShowModal={setShowDeleteModal} user={selectedUser} onDelete={handleDeleteAction} />
        )}
        {/* Update modal */}
        {showEditModal && (
          <UpdateUserFormModal onShowModal={setShowEditModal} user={selectedUser} onUpdate={handleUpdateAction} />
        )}
      </DefaultLayout>
    </ProtectedRoute>
  );
}
