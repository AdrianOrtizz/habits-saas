"use client";

import { Button, Typography, Space } from "antd";
import { Plus } from "lucide-react";
const { Title, Text } = Typography;

const GoalsHeader = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (open: boolean) => void;
}) => {
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
          type="primary"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1 h-10 !p-5 !font-bold shadow-md shadow-emerald-100"
        >
          <Plus size={18} />
          Crear nuevo objetivo
        </Button>
      </Space>
    </div>
  );
};

export default GoalsHeader;
