"use client";
import { Modal, Form, Input, Select, Checkbox } from "antd";

import { createHabitHandler } from "@/hooks/createHabit";

interface CreateHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  //   onCreate: (habit: any) => void;
}

const CreateHabitModal = ({
  isOpen,
  onClose,
  //   onCreate,
}: CreateHabitModalProps) => {
  const { form, frequencyType, daysOptions, handleSubmit } =
    createHabitHandler(onClose);

  return (
    <Modal
      title="Crear nuevo hábito"
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      okText="Crear hábito"
      cancelText="Cancelar"
      okButtonProps={{ className: "bg-primary" }}
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ frequency: { type: "daily" } }}
        className="mt-4"
      >
        <Form.Item
          name="name"
          label="¿Qué hábito querés empezar?"
          rules={[{ required: true, message: "Ponéle un nombre a tu hábito" }]}
        >
          <Input placeholder="Ej: Entrenar, Meditar, Leer..." />
        </Form.Item>

        <Form.Item name={["frequency", "type"]} label="Frecuencia">
          <Select
            options={[
              { label: "Diario", value: "daily" },
              {
                label: "Semanal (Días específicos)",
                value: "weekly_specific_days",
              },
              { label: "Semanal (Cantidad de días)", value: "weekly_times" },
            ]}
          />
        </Form.Item>

        {frequencyType === "weekly_specific_days" && (
          <Form.Item
            name={["frequency", "daysOfWeek"]}
            label="¿Qué días vas a hacerlo?"
            rules={[{ required: true, message: "Seleccioná al menos un día" }]}
          >
            <Checkbox.Group
              options={daysOptions}
              className="flex flex-wrap gap-2"
            />
          </Form.Item>
        )}

        {frequencyType === "weekly_times" && (
          <Form.Item
            name={["frequency", "timesPerWeek"]}
            label="¿Cuántas veces por semana?"
            rules={[{ required: true, message: "Elegí la cantidad" }]}
          >
            <Select
              placeholder="Elegí del 1 al 7"
              options={Array.from({ length: 7 }, (_, i) => ({
                label: `${i + 1} veces`,
                value: i + 1,
              }))}
            />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default CreateHabitModal;
