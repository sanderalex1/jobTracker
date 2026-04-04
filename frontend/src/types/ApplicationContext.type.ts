import type { ApplicationStatus, JobApplication, Stats } from "./types";

export type AppContextType = {
  static: {
    applications: JobApplication[];
    open: boolean;
    selectedApplication: JobApplication | null;
    isLoading: boolean;
    error: string | null;
    page: number;
    total: number;
    search: string;
    stats: Stats | undefined;
  };
  action: {
    addApplication: (data: JobApplication) => void;
    removeApplication: (idToRemove: string) => void;
    editApplication: (id: string, data: JobApplication) => void;
    handleOpen: () => void;
    handleClose: () => void;
    setSelectedApplication: React.Dispatch<
      React.SetStateAction<JobApplication | null>
    >;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
  };
};
