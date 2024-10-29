import { List, Tooltip } from "antd";
import { GetRepoDto } from "../schemas/getRepoSchema";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { forwardRef } from "react";

interface Props {
  className?: string;
  repos: GetRepoDto[];
}

const RepoList = forwardRef<HTMLDivElement, Props>(function (
  { className, repos },
  ref
) {
  const _className = classNames(className);

  return (
    <List
      className={_className}
      dataSource={repos}
      renderItem={(repo) => (
        <List.Item
          key={repo.id}
          actions={[
            <Tooltip title="Редактировать">
              <EditOutlined />
            </Tooltip>,
            <Tooltip title="Удалить">
              <DeleteOutlined />
            </Tooltip>,
          ]}
        >
          <List.Item.Meta
            title={<a href={repo.html_url}>{repo.name}</a>}
            description={repo.description}
          />
        </List.Item>
      )}
      ref={ref}
    />
  );
});

export { RepoList };
