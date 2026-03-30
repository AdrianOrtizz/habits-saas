"use client";
import { useEffect, useState } from "react";

import { Check } from "lucide-react";
import { Typography, Popconfirm } from "antd";
const { Text } = Typography;

import IconDisplay from "@/components/common/IconDisplay";

import { DashboardHabit } from "@/types/habits.types";

import { useCompleteHabitMutation } from "@/hooks/useHabitMutations";

import { shouldBeDisabled } from "@/utils/shouldBeDisabled";

const HabitItem = ({ habit }: { habit: DashboardHabit }) => {
  const { mutate: completeHabit, isPending } = useCompleteHabitMutation();

  const [isDisabled, setIsDisabled] = useState({
    disabled: false,
    styles: "",
  });

  useEffect(() => {
    setIsDisabled(shouldBeDisabled(habit));
  }, [habit]);

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-12 h-12 rounded-lg flex items-center justify-center transition-colors bg-primary/30  text-primary">
          <IconDisplay iconName={habit.icon} size={26} strokeWidth={2} />
        </div>

        <div className="flex flex-col min-w-0">
          <Text strong className="truncate text-sm md:text-base text-gray-800">
            {habit.name}
          </Text>
          <div className="flex items-center gap-2">
            <Text
              type="secondary"
              className="text-[10px] md:text-xs flex items-center gap-1"
            >
              Progreso semanal: {habit.progress.completed} /{" "}
              {habit.progress.target}
            </Text>

            {habit.streak > 0 && (
              <Text
                type="secondary"
                className="text-[10px] md:text-xs flex items-center gap-1"
              >
                🔥 {habit.streak}{" "}
                {habit.frequency.type === "daily"
                  ? "días seguidos"
                  : "semanas seguidas"}
              </Text>
            )}
          </div>
        </div>
      </div>

      <Popconfirm
        title="¿Completar hábito?"
        description="¿Seguro que querés marcar este hábito como completado?"
        onConfirm={() => completeHabit(habit.id)}
        okText="Sí, completar"
        cancelText="Cancelar"
        okButtonProps={{ loading: isPending }}
      >
        <button
          disabled={isDisabled.disabled}
          className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all text-white scale-110 ${isDisabled.styles}`}
        >
          <Check size={16} strokeWidth={3} className="block text-gray-200" />
        </button>
      </Popconfirm>
    </div>
  );
};

export default HabitItem;
