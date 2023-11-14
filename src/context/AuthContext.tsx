"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export interface User {
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
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
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState("");


  const login = async (userData: User) => {
    console.log("Login", userData)
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

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthModalOpen }}>
      {children}
    </AuthContext.Provider>
  );
}
