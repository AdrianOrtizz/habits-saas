"use client";
import { useState } from "react";

import { Button, Typography, Space, Skeleton } from "antd";
import { SlidersHorizontal, Plus } from "lucide-react";
const { Title, Text } = Typography;

import CreateHabitModal from "../modals/CreateHabitModal";

import { useAuth } from "@/providers/AuthProvider";

const DashboardHeader = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isLoading } = useAuth();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      {isLoading ? (
        <Skeleton active />
      ) : (
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Hola, {user?.name} 👋
          </Title>
          <Text type="secondary" className="text-sm">
            Estás en una racha de 5 días. ¡Sigue así!
          </Text>
        </div>
      )}

      <Space size="middle">
        <Button className="flex items-center gap-2 !p-5 border-none bg-white shadow-sm hover:text-primary">
          <SlidersHorizontal size={16} />
          Filtrar hábitos
        </Button>
        <Button
          type="primary"
          className="flex items-center gap-1 h-10 !p-5 !font-bold shadow-md shadow-emerald-100"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} />
          Crear nuevo hábito
        </Button>
      </Space>

      <CreateHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DashboardHeader;
