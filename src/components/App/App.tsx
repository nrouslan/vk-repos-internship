import { useCallback, useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { RepoList } from "../RepoList";
import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll";
import { observer } from "mobx-react-lite";
import classes from "./App.module.css";
import { repoStore } from "../../stores/reposStore";

export const App = observer(() => {
  const { repos, getRepos } = repoStore;

  const [page, setPage] = useState(1);

  const handleNext = useCallback(() => setPage(page + 1), [page]);

  const handleFetch = useCallback(async () => {
    await getRepos("JavaScript", page, 10);
  }, [getRepos, page]);

  useFetch(handleFetch);

  return (
    <main className={classes.app}>
      <InfiniteScroll className={classes.infiniteScroll} next={handleNext}>
        <RepoList repos={repos} />
      </InfiniteScroll>
    </main>
  );
});
