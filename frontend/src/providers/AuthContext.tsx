"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { User } from "@/types/auth.types";

interface AuthContextType {
  user: User | null;
  login: (data: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("habitzz_token");
    if (token) {
      const savedUser = localStorage.getItem("habitzz_user");
      if (savedUser) setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (authData: any) => {
    localStorage.setItem("habitzz_token", authData.access_token);
    localStorage.setItem("habitzz_user", JSON.stringify(authData.user));
    setUser(authData.user);
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem("habitzz_token");
    localStorage.removeItem("habitzz_user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
