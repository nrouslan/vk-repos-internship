import { z } from "zod";
import { RepoSchema } from "./getRepoSchema";

export const GetReposResponseSchema = z.object({
  total_count: z.number(),
  items: z.array(RepoSchema),
});

export type GetReposResponseDto = z.infer<typeof GetReposResponseSchema>;
