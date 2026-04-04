import { useState, useEffect } from "react";
import * as api from "../api/jobTrackerAPI";
import type { JobApplication } from "../types/types";

export const useApplications = () => {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchApplicationsData = async () => {
      setError(null);
      setIsLoading(true);
      try {
        const { rows, total } = await api.getApplications({
          search,
          status,
          page,
          limit: 10,
        });
        setApplications(rows);
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
    fetchApplicationsData();
  }, [search, status, page]);

  const addApplication = async (data: JobApplication) => {
    setError(null);
    setIsLoading(true);
    if (!data) return "Please provide application data";
    try {
      const created = await api.createApplication(data);
      setApplications((prev) => [...prev, created]);
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

  const removeApplication = async (id: string) => {
    setError(null);
    setIsLoading(true);
    if (!id) return "Please provide application id";
    try {
      await api.deleteApplication(id);
      setApplications((prev) => prev.filter((app) => app.id !== id));
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

  const editApplication = async (id: string, data: JobApplication) => {
    setError(null);
    setIsLoading(true);
    if (!data) return "Please provide application data";
    try {
      const updated = await api.updateApplication(id, data);
      setApplications((prev) =>
        prev.map((app) => (app.id === updated.id ? updated : app)),
      );
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

  const value = {
    applications,
    isLoading,
    error,
    total,
    page,
    setSearch,
    setStatus,
    setPage,
    addApplication,
    removeApplication,
    editApplication,
  };

  return value;
};
