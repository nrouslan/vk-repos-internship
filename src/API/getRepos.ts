import {
  GetReposResponseDto,
  GetReposResponseSchema,
} from "../schemas/getReposResponseSchema";

export async function getReposData(
  query: string,
  page: number,
  per_page: number
): Promise<GetReposResponseDto> {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${query}&page=${page}&per_page=${per_page}`
  );

  const json = await response.json();

  if (!response.ok) {
    throw new Error(
      `An error occured while fetching the resource: ${json.status} ${json.message}`
    );
  }

  return GetReposResponseSchema.parse(json);
}
