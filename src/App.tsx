import { useCallback, useState } from "react";
import { GetReposResponseDto } from "./schemas/getReposResponseSchema";
import { getNumericParameter } from "./helpers/getNumericParameter";
import { getRepos } from "./API/getRepos";
import { useFetch } from "./hooks/useFetch";
import { getParameter } from "./helpers/getParameter";
import { useSearchParams } from "./hooks/useSearchParams";

// TODO: Разобраться, почему не подходит интерфейс

type GetReposSearchParams = {
  query: string;
  page: number;
  per_page: number;
};

function App() {
  const [repos, setRepos] = useState<GetReposResponseDto | null>(null);

  const searchParams = new URLSearchParams(window.location.search);

  const [{ query, page, per_page }] = useSearchParams<GetReposSearchParams>({
    query: getParameter(searchParams, "q", "javascript"),
    page: getNumericParameter(searchParams, "page", 1),
    per_page: getNumericParameter(searchParams, "per_page", 10),
  });

  useFetch(
    useCallback(async () => {
      const repos = await getRepos(query, page, per_page);
      setRepos(repos);
    }, [query, page, per_page])
  );

  return repos ? (
    <>
      {repos.items.map((repo) => (
        <div key={repo.id}>
          <h1>{repo.name}</h1>
          <p>Created At: {repo.created_at}</p>
          <p>{repo.description}</p>
        </div>
      ))}
    </>
  ) : (
    "Loading!"
  );
}

export default App;
