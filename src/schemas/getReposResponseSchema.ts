import { z } from "zod";
import { GetRepoSchema } from "./getRepoSchema";

export const GetReposResponseSchema = z.object({
  total_count: z.number(),
  items: z.array(GetRepoSchema),
});

export type GetReposResponseDto = z.infer<typeof GetReposResponseSchema>;
