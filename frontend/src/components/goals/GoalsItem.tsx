"use client";
import { Flex, Typography, Card, Popconfirm } from "antd";
import { Check } from "lucide-react";
const { Text } = Typography;

import IconDisplay from "../common/IconDisplay";

import { Goal } from "@/types/goals.types";

import { useCompleteGoalMutation } from "@/hooks/useGoalMutations";

const GoalItem = ({ goal }: { goal: Goal }) => {
  const { mutate: completeGoal, isPending } = useCompleteGoalMutation();

  return (
    <Card
      className={`border-gray-100 rounded-layout shadow-sm mb-4 transition-all ${
        goal.completed ? "bg-emerald-50/30" : "bg-white hover:border-primary/20"
      }`}
      styles={{ body: { padding: "16px" } }}
    >
      <Flex
        justify="space-between"
        align="center"
        gap={16}
        className="flex-wrap"
      >
        <Flex align="center" gap={16} className="min-w-0">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
              goal.completed
                ? "bg-emerald-100 text-primary"
                : "bg-gray-100 text-gray-500"
            }`}
          >
            <IconDisplay iconName={goal.icon} size={24} />
          </div>

          <Text strong className="truncate text-sm md:text-base text-gray-800">
            {goal.name}
          </Text>
        </Flex>

        <Popconfirm
          title="¿Completar objetivo?"
          description="¿Seguro que querés marcar este objetivo como completado?"
          onConfirm={() => completeGoal(goal.id)}
          okText="Sí, completar"
          cancelText="Cancelar"
          okButtonProps={{ loading: isPending }}
        >
          <button
            disabled={goal.completed}
            className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all text-white scale-110  ${goal.completed ? "bg-primary" : "bg-gray-400 hover:bg-primary/70 hover:cursor-pointer"}`}
          >
            <Check size={16} strokeWidth={3} className="block text-gray-200" />
          </button>
        </Popconfirm>
      </Flex>
    </Card>
  );
};

export default GoalItem;
