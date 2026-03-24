import { createContext, useContext, useState, type ReactNode } from "react";
import type { ApplicationStatus, JobApplication } from "../types/types";
import type { AppContextType } from "../types/ApplicationContext.type";
import { useApplications } from "../hooks/useApplications";

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
  const {
    applications,
    isLoading,
    error,
    addApplication,
    removeApplication,
    editApplication,
  } = useApplications();

  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);

  const [filteredApplication, setFilteredApplication] = useState<
    JobApplication[] | null
  >(null);

  const [activeStatus, setActiveStatus] = useState<
    ApplicationStatus | null | ""
  >(null);

  const [open, setOpen] = useState(false);

  const statusFilter = (status?: ApplicationStatus) => {
    if (!status) {
      // All Statuses selected → reset filter
      setFilteredApplication(null);
      setActiveStatus(""); // track active status as "" for Select
      return;
    }
    if (status === activeStatus) {
      // same status clicked again → reset
      setFilteredApplication(null);
      setActiveStatus("");
    } else {
      const result = applications.filter((app) => app.status === status);
      setFilteredApplication(result);
      setActiveStatus(status);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedApplication(null);
  };

  const statusCounter = applications.reduce<Record<ApplicationStatus, number>>(
    (acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    },
    {} as Record<ApplicationStatus, number>,
  );

  const value: AppContextType = {
    static: {
      statusCounter,
      applications,
      open,
      selectedApplication,
      filteredApplication,
      activeStatus,
    },
    action: {
      addApplication,
      removeApplication,
      editApplication,
      handleOpen,
      handleClose,
      setSelectedApplication,
      statusFilter,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
