"use client";
import { Flex, Typography } from "antd";
import GoalItem from "./GoalsItem";
import * as LucideIcons from "lucide-react";

const { Title, Text } = Typography;

const GOALS_MOCK = [
  {
    id: 1,
    name: "Tomar agua todos los días",
    icon: "Droplets",
    completed: true,
  },
  { id: 2, name: "Ir al gimnasio 3 veces", icon: "Dumbbell", completed: false },
  { id: 3, name: "Leer 100 páginas", icon: "BookOpen", completed: false },
  { id: 4, name: "Dormir antes de las 23:30", icon: "Moon", completed: true },
  {
    id: 5,
    name: "Preparar 4 comidas caseras",
    icon: "CookingPot",
    completed: false,
  },
  {
    id: 6,
    name: "Reducir redes sociales a 1 hora por día",
    icon: "Smartphone",
    completed: true,
  },
];

const GoalList = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-layout shadow-sm overflow-hidden p-6 md:p-8">
      <Flex
        justify="space-between"
        align="center"
        className="mb-6 flex-wrap gap-2"
      >
        <Title
          level={4}
          className="!m-0 !leading-tight font-bold text-gray-800"
        >
          Lista de objetivos
        </Title>
        <Text
          type="secondary"
          className="text-xs text-gray-400 flex items-center gap-1.5"
        >
          <LucideIcons.CheckCircle2 size={14} className="text-emerald-400" />
          Los completados aparecen mezclados con la lista
        </Text>
      </Flex>

      <div className="space-y-4">
        {GOALS_MOCK.map((goal) => (
          <GoalItem key={goal.id} goal={goal} />
        ))}
      </div>
    </div>
  );
};

export default GoalList;
