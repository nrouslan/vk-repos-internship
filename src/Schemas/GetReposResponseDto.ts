import { z } from "zod";
import { GetRepoSchema } from "./GetRepoDto";

export const GetReposResponseSchema = z.object({
  total_count: z.number(),
  items: z.array(GetRepoSchema),
});

export type GetReposResponseDto = z.infer<typeof GetReposResponseSchema>;
