import { Form } from "antd";

export const createHabitHandler = (onClose: () => void) => {
  const [form] = Form.useForm();

  const frequencyType = Form.useWatch(["frequency", "type"], form);

  const daysOptions = [
    { label: "Lun", value: 0 },
    { label: "Mar", value: 1 },
    { label: "Mié", value: 2 },
    { label: "Jue", value: 3 },
    { label: "Vie", value: 4 },
    { label: "Sáb", value: 5 },
    { label: "Dom", value: 6 },
  ];

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      let finalHabit = {
        name: values.name,
        frequency: {
          type: values.frequency.type,
          timesPerWeek: 0,
          daysOfWeek: [],
        },
      };

      if (values.frequency.type === "daily") {
        finalHabit.frequency.timesPerWeek = 7;
      } else if (values.frequency.type === "weekly_specific_days") {
        finalHabit.frequency = {
          ...finalHabit.frequency,
          daysOfWeek: values.frequency.daysOfWeek,
          timesPerWeek: values.frequency.daysOfWeek.length,
        };
      } else if (values.frequency.type === "weekly_times") {
        finalHabit.frequency.timesPerWeek = values.frequency.timesPerWeek;
      }

      console.log("Hábito creado:", finalHabit);
      //   onCreate(finalHabit);
      form.resetFields();
      onClose();
    } catch (error) {
      console.log("Validación fallida:", error);
    }
  };

  return {
    frequencyType,
    daysOptions,
    form,
    handleSubmit,
  };
};
