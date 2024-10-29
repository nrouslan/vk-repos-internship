import { z } from "zod";

export const RepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  created_at: z.string().datetime(),
  html_url: z.string(),
});

export type Repo = z.infer<typeof RepoSchema>;
