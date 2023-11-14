"use client";
import { UserType } from "@/model/UserType";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface UserContextProps {
  user: UserType | null;
  loginUser: (userData: UserType) => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType | null>(null);

  const loginUser = (userData: UserType) => {
    console.log("LTTT login");
    setUser(userData);
  };

  const logoutUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
