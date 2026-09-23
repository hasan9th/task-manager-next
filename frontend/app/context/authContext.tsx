'use client'
import { useState, createContext, useEffect, Dispatch, SetStateAction } from "react";

import { AuthUser, getMe, removeToken } from "../utils/auth";

export interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  logout:()=>void;
  setUser: Dispatch<SetStateAction<AuthUser | null>>;   // add this
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function checkAuth() {
      try {
        const { user } = await getMe();
        setUser(user);
      } catch (error) {
        console.log(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);
  function logout(){
    removeToken();
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user,setUser, loading,logout}}>
      {children}
    </AuthContext.Provider>
  );
}
