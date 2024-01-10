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
  admin: UserType | null;
  login: (userData: UserType) => void;
  logout: (role: string) => void;
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
  const [admin, setAdmin] = useState<UserType | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const login = async (userData: UserType) => {
    // console.log("Login", userData);
    if (userData.role === "admin") {
      setAdmin(userData);
    } else { setUser(userData); }
  };

  const logout = (role: string) => {
    if (role === "admin") {
      setAdmin(null);
      localStorage.setItem('admin', null as any);
    }
    else {
      setUser(null);
      localStorage.setItem('user', null as any);
    }
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
    console.log("IN CALLED UPDATE PROFILE", username, avatarUrl, studentId);

    if (user) {
      setUser((prevUser) => {
        if (prevUser)
          return {
            ...prevUser,
            username: username || prevUser.username,
            avatarUrl: avatarUrl || prevUser.avatarUrl,
            studentId: studentId || prevUser.studentId,
          }
        else return null;
      });
      
      const savedUser = localStorage.getItem("user");
      if (savedUser !== null) {
        // Assuming UserType has a structure like { email: string }
        let storageUserAsJSON = JSON.parse(savedUser);
        console.log('storageUserAsJSON', storageUserAsJSON);
        let storageUserChanges = JSON.stringify(
          {
            ...storageUserAsJSON, username: username,
            avatarUrl: avatarUrl,
            studentId: studentId,
          })
          console.log('currentUserChanges', user);
          console.log('storageUserChanges', storageUserChanges);
          localStorage.setItem('user', storageUserChanges);
      }
    };
  }

  return (
    <AuthContext.Provider
      value={{ user, admin, login, logout, updateUser, isAuthModalOpen }}
    >
      {children}
    </AuthContext.Provider>
  );
}