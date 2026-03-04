export const ApplicationStatusEnum = {
  Applied: 0,
  Interview: 0,
  Offer: 0,
  Rejected: 0,
} as const;

export type ApplicationStatus = keyof typeof ApplicationStatusEnum;

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  status: ApplicationStatus;
  appliedDate: string;
  followUpDate: string;
  notes?: string;
}
