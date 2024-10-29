import { useCallback, useEffect, useState } from "react";
import { RepoList } from "../RepoList";
import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll";
import { observer } from "mobx-react-lite";
import classes from "./App.module.css";
import { repoStore } from "../../stores/reposStore";
import { Skeleton } from "antd";

export const App = observer(() => {
  const { repos, getRepos, isLoading } = repoStore;

  const [page, setPage] = useState(1);

  const handleNext = useCallback(() => setPage(page + 1), [page]);

  useEffect(() => {
    getRepos("JavaScript", page, 10);
  }, [getRepos, page]);

  return (
    <main className={classes.app}>
      <InfiniteScroll
        className={classes.infiniteScroll}
        next={handleNext}
        isLoading={isLoading}
        loader={<Skeleton paragraph={{ rows: 1 }} active />}
      >
        <RepoList repos={repos} />
      </InfiniteScroll>
    </main>
  );
});
