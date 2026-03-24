"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import { User } from "@/types/auth.types";

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

  useEffect(() => {
    const token = localStorage.getItem("habitzz_token");
    const savedUser = localStorage.getItem("habitzz_user");

    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
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
