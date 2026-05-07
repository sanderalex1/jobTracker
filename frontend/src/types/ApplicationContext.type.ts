import type { Order, SortBy } from "./api.types";
import type { JobApplication, ScrapedJob, Stats } from "./types";

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
    sortBy: SortBy;
    order: Order;
    limit: number;
    selectedScrapedJob: ScrapedJob | null;
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
    handleSetSearch: (value: string) => void;
    handleSetStatus: (value: string) => void;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    handleSetSortBy: (value: SortBy) => void;
    setOrder: React.Dispatch<React.SetStateAction<Order>>;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    setSelectedScrapedJob: React.Dispatch<ScrapedJob | null>;
  };
};
