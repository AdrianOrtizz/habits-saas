import { useState } from "react";

import { Modal, Input, Button, Popconfirm } from "antd";

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

import { DashboardHabit } from "@/types/habits.types";

interface ManageHabitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  habits: DashboardHabit[];
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
      <div className="flex flex-col">
        {habits.map((habit) => {
          const isEditing = editingId === habit.id;

          return (
            <div
              key={habit.id}
              className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
            >
              <div className="flex-1 overflow-hidden pr-4">
                {isEditing ? (
                  <div className="flex flex-col gap-y-6 w-full">
                    <IconPicker
                      value={editIcon}
                      onChange={(newIcon) => setEditIcon(newIcon)}
                    />
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Nombre del hábito"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <IconDisplay
                      className="text-2xl text-primary"
                      iconName={habit.icon}
                    />
                    <span className="font-medium text-lg">{habit.name}</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1">
                {isEditing ? (
                  <>
                    <Button
                      type="text"
                      className="text-green-500"
                      icon={<SaveOutlined />}
                      loading={isUpdating}
                      onClick={() => handleSave(habit.id)}
                    />
                    <Button
                      type="text"
                      className="text-gray-500"
                      icon={<CloseOutlined />}
                      onClick={cancelEditing}
                    />
                  </>
                ) : (
                  <>
                    <Button
                      type="text"
                      className="text-blue-500"
                      icon={<EditOutlined />}
                      onClick={() => startEditing(habit)}
                    />
                    <Popconfirm
                      title="¿Borrar hábito?"
                      description="Perderás todo el progreso. ¿Estás seguro?"
                      onConfirm={() => deleteHabit(habit.id)}
                      okButtonProps={{ loading: isDeleting, danger: true }}
                    >
                      <Button type="text" danger icon={<DeleteOutlined />} />
                    </Popconfirm>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default ManageHabitsModal;
