'use client'

import { useAuth } from "@/app/hooks/useAuth";
import { Power } from "lucide-react";
import { useRouter } from "next/navigation";

export function User() {
  const {user,loading}=useAuth()
    if (loading) {
    return <span>Loading...</span>;
  }
    if (!user) {
    return <span>Guest</span>;
  }
  return <span>{user.name}</span>;
}
export function LogOut() {
  const { logout } = useAuth();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <Power
      onClick={handleLogout}
      className="cursor-pointer"
    />
  );
}