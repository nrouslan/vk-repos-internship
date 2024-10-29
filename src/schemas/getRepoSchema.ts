import { z } from "zod";

export const GetRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  created_at: z.string().datetime(),
  html_url: z.string(),
});

export type GetRepoDto = z.infer<typeof GetRepoSchema>;
