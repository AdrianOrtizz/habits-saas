"use client";
import { Form } from "antd";

export const createGoalHandler = (
  onClose: () => void,
  //   onCreate: (goal: any) => void,
) => {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const finalGoal = {
        name: values.name,
        icon: values.icon,
      };

      console.log("Objetivo para el backend:", finalGoal);
      //   onCreate(finalGoal);
      form.resetFields();
      onClose();
    } catch (error) {
      console.log("Validación fallida:", error);
    }
  };

  return {
    form,
    handleSubmit,
  };
};
