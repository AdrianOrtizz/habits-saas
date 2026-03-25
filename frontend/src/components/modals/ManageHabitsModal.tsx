import { useState } from "react";

import { Modal, List, Input, Button, Popconfirm } from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import {
  useUpdateHabitMutation,
  useDeleteHabitMutation,
} from "@/hooks/useHabitMutations";

import IconDisplay from "../common/IconDisplay";
import IconPicker from "../common/IconPicker";

interface ManageHabitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  habits: any[];
}
const ManageHabitsModal = ({
  isOpen,
  onClose,
  habits,
}: ManageHabitsModalProps) => {
  const { mutate: updateHabit, isPending: isUpdating } =
    useUpdateHabitMutation();
  const { mutate: deleteHabit, isPending: isDeleting } =
    useDeleteHabitMutation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editIcon, setEditIcon] = useState("");

  const startEditing = (habit: any) => {
    setEditingId(habit.id);
    setEditName(habit.name);
    setEditIcon(habit.icon);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
    setEditIcon("");
  };

  const handleSave = (id: string) => {
    updateHabit(
      { id, data: { name: editName, icon: editIcon } },
      { onSuccess: () => cancelEditing() },
    );
  };

  return (
    <Modal
      title="Administrar mis Hábitos"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={650}
      destroyOnHidden
    >
      <List
        dataSource={habits}
        renderItem={(habit) => {
          const isEditing = editingId === habit.id;

          return (
            <List.Item
              actions={
                isEditing
                  ? [
                      <Button
                        key="save"
                        type="text"
                        className="text-green-500"
                        icon={<SaveOutlined />}
                        loading={isUpdating}
                        onClick={() => handleSave(habit.id)}
                      />,
                      <Button
                        key="cancel"
                        type="text"
                        className="text-gray-500"
                        icon={<CloseOutlined />}
                        onClick={cancelEditing}
                      />,
                    ]
                  : [
                      <Button
                        key="edit"
                        type="text"
                        className="text-blue-500"
                        icon={<EditOutlined />}
                        onClick={() => startEditing(habit)}
                      />,
                      <Popconfirm
                        key="delete"
                        title="¿Borrar hábito?"
                        description="Perderás todo el progreso. ¿Estás seguro?"
                        onConfirm={() => deleteHabit(habit.id)}
                        okButtonProps={{ loading: isDeleting, danger: true }}
                      >
                        <Button type="text" danger icon={<DeleteOutlined />} />
                      </Popconfirm>,
                    ]
              }
            >
              {isEditing ? (
                <div className="flex flex-col gap-3 items-center w-full pr-4">
                  <div className="flex-shrink-0">
                    <IconPicker
                      value={editIcon}
                      onChange={(newIcon) => setEditIcon(newIcon)}
                    />
                  </div>
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1"
                  />
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    <IconDisplay iconName={habit.icon} size={24} />
                  </span>
                  <span className="font-medium">{habit.name}</span>
                </div>
              )}
            </List.Item>
          );
        }}
      />
    </Modal>
  );
};

export default ManageHabitsModal;
