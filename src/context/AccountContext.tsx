"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { UserType } from "@/model/UserType";
import { ClassListType } from "@/model/ClassListType";

export interface AccountContextType {
  account: UserType | null;
  classList: ClassListType | null;
}

const AccountContext = createContext<AccountContextType | undefined>(undefined);

interface AccountProviderProps {
  children: ReactNode;
}

export function useAccount() {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount must be used within an AccountProvider");
  }
  return context;
}

export function AccountProvider({ children }: AccountProviderProps) {
  const [account, setAccount] = useState<UserType | null>(null);
  const [classList, setClassList] = useState<ClassListType | null>(null);

  return (
    <AccountContext.Provider
      value={{ account, classList }}
    >
      {children}
    </AccountContext.Provider>
  );
}
