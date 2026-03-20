"use client";

import { useState } from "react";

import { Button, Typography, Space } from "antd";
import { Copy, Plus } from "lucide-react";
const { Title, Text } = Typography;

import CreateGoalModal from "../modals/CreateGoalModal";

const GoalsHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <Title level={2} className="!m-0 !leading-tight">
          Objetivos semanales
        </Title>
        <Text type="secondary" className="text-sm text-gray-500 block max-w-lg">
          Organizá tus metas de la semana y marcá cada una como completada.
        </Text>
      </div>

      <Space size="middle" className="flex-wrap">
        <Button
          icon={<Copy size={16} />}
          className="border-gray-200 hover:border-primary/50 text-gray-700 bg-white shadow-sm h-10 px-5 rounded-layout"
        >
          Repetir los objetivos de la semana pasada
        </Button>
        <Button
          type="primary"
          icon={<Plus size={18} />}
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:!bg-primary/90 h-10 px-6 shadow-md rounded-layout font-medium"
        >
          Crear nuevo objetivo
        </Button>
      </Space>

      <CreateGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        // onCreate={handleCreateGoal}
      />
    </div>
  );
};

export default GoalsHeader;
