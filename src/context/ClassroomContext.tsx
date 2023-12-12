"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { UserType } from "@/model/UserType";
import { ClassType } from "@/model/ClassType";

export interface ClassroomContextType {
  classroom: ClassType | null;
  host: UserType | null;
//   total?: number
}

const ClassroomContext = createContext<ClassroomContextType | undefined>(undefined);

interface ClassroomProviderProps {
  children: ReactNode;
}

export function useClassroom() {
  const context = useContext(ClassroomContext);
  if (!context) {
    throw new Error("useClassroom must be used within an ClassroomProvider");
  }
  return context;
}

export function ClassroomProvider({ children }: ClassroomProviderProps) {
  const [classroom, setClassroom] = useState<ClassType | null>(null);
  const [host, setHost] = useState<UserType | null>(null);

  return (
    <ClassroomContext.Provider
      value={{ classroom, host }}
    >
      {children}
    </ClassroomContext.Provider>
  );
}
