"use client";
import { Button, Typography, Space } from "antd";
import { SlidersHorizontal, Plus } from "lucide-react";

const { Title, Text } = Typography;

const DashboardHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <Title level={2} style={{ margin: 0 }}>
          Hola, Adrian 👋
        </Title>
        <Text type="secondary" className="text-sm">
          Estás en una racha de 5 días. ¡Sigue así!
        </Text>
      </div>

      <Space size="middle">
        <Button
          icon={<SlidersHorizontal size={16} />}
          className="flex items-center gap-2 border-none bg-white shadow-sm hover:text-primary"
        >
          Filtrar hábitos
        </Button>
        <Button
          type="primary"
          icon={<Plus size={18} />}
          className="flex items-center gap-1 h-10 px-6 shadow-md shadow-emerald-100"
        >
          Crear nuevo hábito
        </Button>
      </Space>
    </div>
  );
};

export default DashboardHeader;
