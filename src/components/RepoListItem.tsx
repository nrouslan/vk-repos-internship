import { ChangeEvent, useState } from "react";
import { Input, List, Tooltip } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseOutlined as CancelOutlined,
} from "@ant-design/icons";
import { Repo } from "../schemas/getRepoSchema";

interface RepoFormData {
  name: string;
  description: string | null;
}

interface Props {
  repo: Repo;
  onEdit: (repo: Repo) => void;
  onRemove: (id: number) => void;
}

export function RepoListItem({ repo, onEdit, onRemove }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  const [repoFormData, setRepoFormData] = useState<RepoFormData>({
    name: repo.name,
    description: repo.description,
  });

  function handleEdit() {
    if (isEditing) {
      onEdit(repo);
    }
    setIsEditing(!isEditing);
  }

  const handleSave = () => {
    setIsEditing(false);
    onEdit({
      ...repo,
      ...repoFormData,
    });
  };

  const handleRepoFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRepoFormData({
      ...repoFormData,
      [e.target.name]: e.target.value,
    });
  };

  const actions = isEditing
    ? [
        <Tooltip title="Сохранить">
          <SaveOutlined onClick={handleSave} />
        </Tooltip>,
        <Tooltip title="Отменить">
          <CancelOutlined onClick={() => setIsEditing(false)} />
        </Tooltip>,
      ]
    : [
        <Tooltip title="Редактировать">
          <EditOutlined onClick={handleEdit} />
        </Tooltip>,
        <Tooltip title="Удалить">
          <DeleteOutlined onClick={() => onRemove(repo.id)} />
        </Tooltip>,
      ];

  return (
    <List.Item key={repo.id} actions={actions}>
      <List.Item.Meta
        title={
          isEditing ? (
            <Input
              value={repoFormData.name}
              onChange={handleRepoFormDataChange}
              name="name"
            />
          ) : (
            <a href={repo.html_url}>{repo.name}</a>
          )
        }
        description={
          isEditing ? (
            <Input
              value={repoFormData.description ?? ""}
              onChange={handleRepoFormDataChange}
              name="description"
            />
          ) : (
            repo.description
          )
        }
      />
    </List.Item>
  );
}
