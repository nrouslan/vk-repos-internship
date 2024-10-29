import { useCallback, useEffect, useState } from "react";
import { RepoList } from "../RepoList";
import { InfiniteScroll } from "../InfiniteScroll/InfiniteScroll";
import { observer } from "mobx-react-lite";
import classes from "./App.module.css";
import { repoStore } from "../../stores/reposStore";
import { Skeleton } from "antd";
import { Repo } from "../../schemas/getRepoSchema";

export const App = observer(() => {
  const { repos, getRepos, removeRepo, editRepo, isLoading } = repoStore;

  const [page, setPage] = useState(1);

  useEffect(() => {
    getRepos("JavaScript", page, 10);
  }, [getRepos, page]);

  const handleNext = useCallback(() => setPage(page + 1), [page]);

  const handleRemove = (id: number) => removeRepo(id);

  const handleEdit = (repo: Repo) => editRepo(repo);

  return (
    <main className={classes.app}>
      <InfiniteScroll
        className={classes.infiniteScroll}
        next={handleNext}
        isLoading={isLoading}
        loader={<Skeleton paragraph={{ rows: 1 }} active />}
      >
        <RepoList repos={repos} onRemove={handleRemove} onEdit={handleEdit} />
      </InfiniteScroll>
    </main>
  );
});
