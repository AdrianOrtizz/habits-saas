"use client";
import { Flex, Typography } from "antd";
const { Title } = Typography;

import GoalItem from "./GoalsItem";
import Loading from "../common/Spinner";

import { Goal } from "@/types/goals.types";

import { useGoals } from "@/hooks/useGoals";

const GoalList = () => {
  const { data, isLoading } = useGoals();

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
      </Flex>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          {data.map((goal: Goal) => (
            <GoalItem key={goal.id} goal={goal} />
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalList;
