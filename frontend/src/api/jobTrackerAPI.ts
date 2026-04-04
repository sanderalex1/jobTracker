import type { JobApplication } from "../types/types";

const BASE_URL = "http://localhost:3000/api/v1";

async function request(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  if (!res.ok) throw new Error("Request failed");
  return res.json();
}

interface Params {
  search: string;
  status: string;
  page: number;
  limit: number;
}

export const getApplications = ({ search, status, page, limit }: Params) => {
  const params = new URLSearchParams();
  if (status) params.append("status", status);
  if (search) params.append("search", search);
  params.append("page", String(page));
  params.append("limit", String(limit));

  return request(`/applications?${params.toString()}`);
};

export const createApplication = (data: JobApplication) =>
  request("/applications", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const updateApplication = (id: string, data: JobApplication) =>
  request(`/applications/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const deleteApplication = (id: string) =>
  request(`/applications/${id}`, { method: "DELETE" });
