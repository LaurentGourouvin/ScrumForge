"use client";
import ProtectedRoute from "@/app/component/auth/ProtectedRoute";
import DefaultLayout from "@/app/component/layout/DefaultLayout";
import CreateUserForm from "@/app/component/user/CreateUserForm";
import { useAuth } from "@/app/hooks/useAuth";
export default function UserCreatePage() {
  const { user, logout } = useAuth();

  const test = () => {};
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
        <CreateUserForm />
      </DefaultLayout>
    </ProtectedRoute>
  );
}
