"use client";
import { Flex, Typography } from "antd";
const { Title } = Typography;

import { useState } from "react";
import { Button } from "antd";

import GoalItem from "./GoalsItem";
import Loading from "../common/Spinner";
import EmptyState from "../common/EmptyState";
import ManageGoalsModal from "../modals/ManageGoalsModal";

import { Goal } from "@/types/goals.types";

const GoalList = ({
  data,
  isLoading,
}: {
  data: Goal[];
  isLoading: boolean;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="bg-white border border-gray-100 rounded-layout shadow-sm overflow-hidden p-6 md:p-8">
      <Flex
        justify="space-between"
        align="center"
        className="mb-6 flex-wrap gap-2"
      >
        <Title
          level={4}
          className="!my-8 !leading-tight font-bold text-gray-800"
        >
          Lista de objetivos
        </Title>
      </Flex>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="space-y-4">
          {data.length === 0 ? (
            <EmptyState
              title="No tenés objetivos activos"
              description="Ponete una meta y hacé que cada día cuente."
              buttonText="Definir un Objetivo"
              imageType="default"
            />
          ) : (
            <div>
              {data.map((goal: Goal) => (
                <GoalItem key={goal.id} goal={goal} />
              ))}

              <div className="bg-gray-50/50 p-3 text-center">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  type="link"
                  className="!text-primary"
                >
                  Gestionar objetivos
                </Button>
              </div>
            </div>
          )}

          <ManageGoalsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            goals={data}
          />
        </div>
      )}
    </div>
  );
};

export default GoalList;
