import { useCallback, useState } from "react";
import { GetReposResponseDto } from "../schemas/getReposResponseSchema";
import { getReposData } from "../API/getRepos";
import { useFetch } from "../hooks/useFetch";
import { RepoList } from "./RepoList";
import classes from "./App.module.css";

function App() {
  const [reposData, setReposData] = useState<GetReposResponseDto | null>(null);

  const [page] = useState(1);

  useFetch(
    useCallback(async () => {
      const newReposData = await getReposData("JavaScript", page, 10);

      setReposData({
        ...newReposData,
        items: [...(reposData?.items ?? []), ...newReposData.items],
      });
    }, [page])
  );

  return (
    <main className={classes.app}>
      <RepoList className={classes.repoList} repos={reposData?.items ?? []} />
    </main>
  );
}

export default App;
