import { mockApplications } from "../data/mockData";
import { createContext, useContext, useState, type ReactNode } from "react";
import type { ApplicationStatus, JobApplication } from "../data/types";

type AppContextType = {
  uniqueStatus: ApplicationStatus[];
  statusCounter: Record<ApplicationStatus, number>;
  addApplication: (data: JobApplication) => void;
  removeApplication: (idToRemove: string) => void;
  editApplication: (updatedApp: JobApplication) => void;
  applications: JobApplication[];
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
  const [applications, setApplications] =
    useState<JobApplication[]>(mockApplications);
  const statusList = mockApplications.map((e) => e.status);
  const uniqueStatus = [...new Set(statusList)];

  const addApplication = (data: JobApplication) => {
    setApplications((prev) => [...prev, data]);
  };

  const removeApplication = (idToRemove: string) => {
    setApplications((prev) => prev.filter((app) => app.id !== idToRemove));
  };

  const editApplication = (updatedApp: JobApplication) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === updatedApp.id ? updatedApp : app)),
    );
  };

  const statusCounter = mockApplications.reduce<
    Record<ApplicationStatus, number>
  >(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    },
    {} as Record<ApplicationStatus, number>,
  );

  statusCounter["Applied"] = mockApplications.length;

  const value = {
    uniqueStatus,
    statusCounter,
    addApplication,
    removeApplication,
    editApplication,
    applications,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
