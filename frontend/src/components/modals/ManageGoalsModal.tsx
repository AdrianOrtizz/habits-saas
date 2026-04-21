import { useState } from "react";
import { Modal, Input, Button, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseOutlined,
} from "@ant-design/icons";

import {
  useUpdateGoalNameMutation,
  useDeleteGoalMutation,
} from "@/hooks/useGoalMutations";

import EmptyState from "../common/EmptyState";

import { Goal } from "@/types/goals.types";

interface ManageGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  goals: Goal[];
}

const ManageGoalsModal = ({
  isOpen,
  onClose,
  goals,
}: ManageGoalsModalProps) => {
  const { mutate: updateGoalName, isPending: isUpdating } =
    useUpdateGoalNameMutation();
  const { mutate: deleteGoal, isPending: isDeleting } = useDeleteGoalMutation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  const startEditing = (goal: Goal) => {
    setEditingId(goal.id);
    setEditName(goal.name);
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditName("");
  };

  const handleSave = (goalId: string) => {
    updateGoalName(
      { goalId, newName: editName },
      { onSuccess: () => cancelEditing() },
    );
  };

  return (
    <Modal
      title="Administrar mis Objetivos"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={650}
      destroyOnHidden
    >
      {goals?.length === 0 ? (
        <EmptyState title="¡No tenés objetivos para editar!" description="" />
      ) : (
        <div className="flex flex-col">
          {goals?.map((goal) => {
            const currentGoalId = goal.id;
            const isEditing = editingId === currentGoalId;

            return (
              <div
                key={currentGoalId}
                className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
              >
                <div className="flex-1 overflow-hidden pr-4">
                  {isEditing ? (
                    <div className="w-full">
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Nombre del objetivo"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="font-medium text-lg">{goal.name}</span>
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
                        onClick={() => handleSave(currentGoalId)}
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
                        icon={<EditOutlined />}
                        onClick={() => startEditing(goal)}
                      />
                      <Popconfirm
                        title="¿Borrar objetivo?"
                        description="Perderás este objetivo. ¿Estás seguro?"
                        onConfirm={() => deleteGoal(currentGoalId)}
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
      )}
    </Modal>
  );
};

export default ManageGoalsModal;
