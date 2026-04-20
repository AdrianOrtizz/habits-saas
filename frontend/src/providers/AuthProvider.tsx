"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import api from "@/api/axios";

import { User } from "@/types/auth.types";

import { useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
  user: User | null;
  login: (authData: { user: any; access_token: string }) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("habitzz_token");
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const { data } = await api.get("/auth/me");
        setUser(data);
      } catch (error) {
        console.error("Token inválido o expirado");
        localStorage.removeItem("habitzz_token");
        localStorage.removeItem("habitzz_user");
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (authData: { user: any; access_token: string }) => {
    localStorage.setItem("habitzz_token", authData.access_token);
    localStorage.setItem("habitzz_user", JSON.stringify(authData.user));
    setUser(authData.user);
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem("habitzz_token");
    localStorage.removeItem("habitzz_user");
    setUser(null);
    queryClient.clear();
    router.push("/login");
  };

  const isAuthenticated = user?.id ? true : false;

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
