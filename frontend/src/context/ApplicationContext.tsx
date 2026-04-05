import { createContext, useContext, useState, type ReactNode } from "react";
import type { JobApplication } from "../types/types";
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
    page,
    total,
    search,
    stats,
    sortBy,
    order,
    addApplication,
    removeApplication,
    editApplication,
    setSearch,
    setStatus,
    setPage,
    setOrder,
    setSortBy,
  } = useApplications();

  const [selectedApplication, setSelectedApplication] =
    useState<JobApplication | null>(null);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedApplication(null);
  };

  const value: AppContextType = {
    static: {
      applications,
      open,
      selectedApplication,
      isLoading,
      error,
      page,
      total,
      search,
      stats,
      sortBy,
      order,
    },
    action: {
      addApplication,
      removeApplication,
      editApplication,
      handleOpen,
      handleClose,
      setSelectedApplication,
      setSearch,
      setStatus,
      setPage,
      setOrder,
      setSortBy,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
