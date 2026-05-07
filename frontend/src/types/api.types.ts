export type SortBy = "company" | "applied_date";
export type Order = "asc" | "desc";

export interface AppParams {
  search: string;
  status: string;
  page: number;
  limit: number;
  sortBy: SortBy;
  order: Order;
}

export interface ScrapedJobsParams {
  page: number;
  limit: number;
}
