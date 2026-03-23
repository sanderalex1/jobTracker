export const ApplicationStatusEnum = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
] as const;
export type ApplicationStatus = (typeof ApplicationStatusEnum)[number];

export interface JobApplication {
  id: `${string}-${string}-${string}-${string}-${string}`;
  company: string;
  role: string;
  location: string;
  status: ApplicationStatus;
  appliedDate: Date;
  followUpDate?: Date;
  notes?: string;
  link?: string;
}
