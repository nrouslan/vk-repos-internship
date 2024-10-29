import { forwardRef } from "react";
import { List } from "antd";
import { Repo } from "../schemas/getRepoSchema";
import classNames from "classnames";
import { RepoListItem } from "./RepoListItem";

interface Props {
  className?: string;
  repos: Repo[];
  onRemove: (id: number) => void;
  onEdit: (repo: Repo) => void;
}

const RepoList = forwardRef<HTMLDivElement, Props>(function (
  { className, repos, onRemove, onEdit },
  ref
) {
  const _className = classNames(className);

  return (
    <List
      className={_className}
      dataSource={repos}
      renderItem={(repo) => (
        <RepoListItem repo={repo} onEdit={onEdit} onRemove={onRemove} />
      )}
      ref={ref}
    />
  );
});

export { RepoList };
