"use client";

import { Modal, Form, Input, Typography, Divider } from "antd";
const { Text } = Typography;
import { Target } from "lucide-react";

import IconPicker from "@/components/common/IconPicker";

import { useCreateGoalForm } from "@/hooks/createGoal";

interface CreateGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateGoalModal = ({ isOpen, onClose }: CreateGoalModalProps) => {
  const { form, handleSubmit, isPending } = useCreateGoalForm(onClose);

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 pt-2">
          <Target className="text-primary" size={20} />
          <span>Nuevo Objetivo Semanal</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Establecer objetivo"
      confirmLoading={isPending}
      cancelText="Cancelar"
      okButtonProps={{ className: "bg-primary h-10 px-6" }}
      destroyOnHidden
      width={500}
    >
      <div className="mb-6 mt-2">
        <Text type="secondary" className="text-sm">
          Definí una meta clara para esta semana. Los objetivos te ayudan a
          mantener el enfoque en lo importante.
        </Text>
      </div>

      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          name="name"
          label="¿Cuál es tu objetivo?"
          rules={[{ required: true, message: "Escribí el nombre de tu meta" }]}
        >
          <Input
            placeholder="Ej: Leer 100 páginas, Ir al gym 3 veces..."
            className="rounded-layout h-11"
          />
        </Form.Item>

        <Divider className="my-6" />

        <Form.Item
          name="icon"
          label="Elegí un icono para identificarlo"
          rules={[{ required: true, message: "Seleccioná un icono" }]}
        >
          <IconPicker />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateGoalModal;
