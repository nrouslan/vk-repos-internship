import { useEffect, useState } from "react";
import {
  GetReposResponseDto,
  GetReposResponseSchema,
} from "./Schemas/GetReposResponseDto";

function App() {
  const [repos, setRepos] = useState<GetReposResponseDto | null>(null);

  useEffect(() => {
    fetch(
      "https://api.github.com/search/repositories?q=javascript&sort=stars&page=1&per_page=10"
    )
      .then((response) => response.json())
      .then((json) => {
        const { data, error } = GetReposResponseSchema.safeParse(json);

        if (error) {
          console.log(error);
        } else {
          setRepos(data);
        }
      });
  }, []);

  console.log(repos);

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
