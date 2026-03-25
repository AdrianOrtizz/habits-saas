"use client";
import { Form } from "antd";

import { useCreateGoalMutation } from "./useGoalMutations";

export const useCreateGoalForm = (onClose: () => void) => {
  const [form] = Form.useForm();

  const { mutateAsync, isPending } = useCreateGoalMutation();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const finalGoal = {
        name: values.name,
        icon: values.icon,
      };

      await mutateAsync(finalGoal);
      form.resetFields();
      onClose();
    } catch (error) {
      console.log("Validación fallida:", error);
    }
  };

  return {
    form,
    handleSubmit,
    isPending,
  };
};
