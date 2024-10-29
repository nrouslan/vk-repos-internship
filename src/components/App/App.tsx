import { useCallback, useState } from "react";
import { GetReposResponseDto } from "../../schemas/getReposResponseSchema";
import { getReposData } from "../../API/getRepos";
import { useFetch } from "../../hooks/useFetch";
import { RepoList } from "../RepoList";
import classes from "./App.module.css";
import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll";

function App() {
  const [reposData, setReposData] = useState<GetReposResponseDto | null>(null);

  const [page, setPage] = useState(1);

  const handleNext = useCallback(() => setPage(page + 1), [page]);

  const handleFetch = useCallback(async () => {
    const newReposData = await getReposData("JavaScript", page, 10);

    setReposData({
      ...newReposData,
      items: [...(reposData?.items ?? []), ...newReposData.items],
    });
  }, [page]);

  useFetch(handleFetch);

  return (
    <main className={classes.app}>
      <InfiniteScroll className={classes.infiniteScroll} next={handleNext}>
        <RepoList repos={reposData?.items ?? []} />
      </InfiniteScroll>
    </main>
  );
}

export default App;
