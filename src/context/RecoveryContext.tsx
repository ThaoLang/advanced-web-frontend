"use client";
import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
  } from "react";

export interface RecoveryContextType {
    email: string | null;
    otp: number | undefined;
    password: string | undefined;
    page: string;    
}

const RecoveryContext = createContext<RecoveryContextType | undefined>(undefined);

interface RecoveryProviderProps {
    children: ReactNode;
}

export function useRecoveryContext() {
    const context = useContext(RecoveryContext);
    if (!context) {
      throw new Error("useRecoveryContext must be used within an RecoveryProvider");
    }
    return context;
  }
  
  export function RecoveryProvider({ children }: RecoveryProviderProps) {
    const [otp, setOtp] = useState<number | undefined>(undefined);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [page, setPage] = useState("forget-password");
    
    return (
      <RecoveryContext.Provider
        value={{ otp, email, password, page }}
      >
        {children}
      </RecoveryContext.Provider>
    );
  }
  