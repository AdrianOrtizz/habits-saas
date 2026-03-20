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
        <Button className="flex items-center gap-2 !p-5 border-none bg-white shadow-sm hover:text-primary">
          <Copy size={16} />
          Repetir los objetivos de la semana pasada
        </Button>
        <Button
          type="primary"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 h-10 !p-5 !font-bold shadow-md shadow-emerald-100"
        >
          <Plus size={18} />
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
