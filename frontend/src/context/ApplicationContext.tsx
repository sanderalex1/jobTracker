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
    limit,
    setLimit,
    addApplication,
    removeApplication,
    editApplication,
    handleSetSearch,
    handleSetStatus,
    setPage,
    setOrder,
    handleSetSortBy,
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
      limit,
    },
    action: {
      addApplication,
      removeApplication,
      editApplication,
      handleOpen,
      handleClose,
      setSelectedApplication,
      handleSetSearch,
      handleSetStatus,
      setPage,
      setOrder,
      handleSetSortBy,
      setLimit,
    },
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
