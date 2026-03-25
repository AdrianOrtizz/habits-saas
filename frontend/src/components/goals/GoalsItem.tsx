"use client";
import { Flex, Typography, Button, Card } from "antd";
import { CheckCircle2, Circle } from "lucide-react";
const { Text } = Typography;

import IconDisplay from "../common/IconDisplay";

import { Goal } from "@/types/goals.types";

const GoalItem = ({ goal }: { goal: Goal }) => {
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

        <Button
          type={goal.completed ? "primary" : "default"}
          icon={
            goal.completed ? <CheckCircle2 size={18} /> : <Circle size={18} />
          }
          className={`flex items-center gap-2 h-10 px-5 rounded-full text-xs font-semibold ${
            goal.completed
              ? "bg-primary hover:!bg-primary/90 border-none"
              : "border-gray-200 text-gray-600 hover:border-primary hover:text-primary"
          }`}
        >
          {goal.completed ? "Completado" : "Marcar como completado"}
        </Button>
      </Flex>
    </Card>
  );
};

export default GoalItem;
