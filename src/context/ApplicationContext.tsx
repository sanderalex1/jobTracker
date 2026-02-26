import { mockApplications } from "../data/mockData";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { ApplicationStatus } from "../data/types";

type AppContextType = {
  uniqueStatus: ApplicationStatus[];
};

type ApplicationProviderProps = {
  children: ReactNode;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an ApplicationProvider");
  }
  return context;
};

export const ApplicationProvider = ({ children }: ApplicationProviderProps) => {
  const statusList = mockApplications.map((e) => e.status);
  const uniqueStatus = [...new Set(statusList)];

  const value = {
    uniqueStatus,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
