"use client";

import { Button, Typography, Space, Skeleton } from "antd";
import { Plus } from "lucide-react";
const { Title, Text } = Typography;

import { useAuth } from "@/providers/AuthProvider";

const DashboardHeader = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (isOpen: boolean) => void;
}) => {
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
        <Button
          type="primary"
          className="flex items-center gap-1 h-10 !p-5 !font-bold shadow-md shadow-emerald-100"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus size={18} />
          Crear nuevo hábito
        </Button>
      </Space>
    </div>
  );
};

export default DashboardHeader;
