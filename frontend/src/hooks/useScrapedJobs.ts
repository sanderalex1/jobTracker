import { useState, useEffect } from "react";
import * as api from "../api/jobTrackerAPI";
import type { ScrapedJob } from "../types/types";

export const useScrapedJobs = () => {
  const [scrapedJobs, setScrapedJobs] = useState<ScrapedJob[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchScrapedJobsData = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const { rows, total } = await api.getScrapedJobs({ page, limit });
        setScrapedJobs(rows);
        setTotal(total);
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchScrapedJobsData();
  }, [page, limit]);

  const value = {
    scrapedJobs,
    total,
    page,
    limit,
    error,
    isLoading,
    setPage,
    setLimit,
  };

  return value;
};
