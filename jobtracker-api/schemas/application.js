import { z } from "zod";

export const schema = z.object({
  company: z.string(),
  notes: z.string().optional(),
  status: z.enum(["Applied", "Interview", "Offer", "Rejected"]),
  appliedDate: z.string(),
  role: z.string(),
  location: z.string(),
  followUpDate: z.string().optional(),
  link: z.string().optional(),
});
