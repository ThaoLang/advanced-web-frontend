"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { UserType } from "@/model/UserType";

export interface AuthContextType {
  user: UserType | null;
  login: (userData: UserType) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  updateUser: (
    username: string | undefined,
    avatarUrl: string | undefined,
    studentId: string | undefined
  ) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const login = async (userData: UserType) => {
    console.log("Login", userData);
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };
  // const login = async (userData: User) => {
  //   console.log("Login", userData)
  //   setUser(userData);
  // };

  // const logout = () => {
  //   setUser(null);
  // };

  const updateUser = (
    username: string | undefined,
    avatarUrl: string | undefined,
    studentId: string | undefined
  ) => {
    if (user) {
      setUser({
        ...user,
        username: username ?? user.username,
        avatarUrl: avatarUrl ?? user.avatarUrl,
        studentId: studentId ?? user.studentId,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, updateUser, isAuthModalOpen }}
    >
      {children}
    </AuthContext.Provider>
  );
}
