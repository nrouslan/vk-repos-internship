import { z } from "zod";

export const GetRepoSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  created_at: z.string().datetime(),
});

export type GetRepoDto = z.infer<typeof GetRepoSchema>;
