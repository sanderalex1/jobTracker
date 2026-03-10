import type { ApplicationStatus, JobApplication } from "./types";

export type AppContextType = {
  static: {
    statusCounter: Record<ApplicationStatus, number>;
    applications: JobApplication[];
    open: boolean;
    selectedApplication: JobApplication | null;
    filteredApplication: JobApplication[] | null;
    activeStatus: ApplicationStatus | null | "";
  };
  action: {
    addApplication: (data: JobApplication) => void;
    removeApplication: (idToRemove: string) => void;
    editApplication: (updatedApp: JobApplication) => void;
    handleOpen: () => void;
    handleClose: () => void;
    setSelectedApplication: React.Dispatch<
      React.SetStateAction<JobApplication | null>
    >;
    statusFilter: (status?: ApplicationStatus) => void;
  };
};
